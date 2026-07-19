#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
서울 열린데이터광장 문화행사 API → events-auto.js 자동 생성
- 무료(IS_FREE=="무료") + 종료일이 오늘 이후인 행사만
- 실패 시 기존 파일을 건드리지 않고 종료 (안전 우선)
실행: SEOUL_API_KEY=... python3 scripts/update_events.py
"""
import os, sys, json, urllib.request, datetime

KEY = os.environ.get("SEOUL_API_KEY", "").strip()
if not KEY:
    print("::error::SEOUL_API_KEY 환경변수가 없습니다 (GitHub Secrets에 등록하세요)")
    sys.exit(1)

TODAY = datetime.date.today()
BASE = f"http://openapi.seoul.go.kr:8088/{KEY}/json/culturalEventInfo"
SKIP_TITLES = ["뚜벅뚜벅"]  # 수동 큐레이션과 중복 방지
MAX_EVENTS = 60

def fetch(start, end):
    url = f"{BASE}/{start}/{end}/"
    with urllib.request.urlopen(url, timeout=30) as r:
        return json.loads(r.read().decode("utf-8"))

def parse_date(s):
    try:
        return datetime.datetime.strptime(s.strip()[:10], "%Y-%m-%d").date()
    except Exception:
        return None

def main():
    rows = []
    # 페이지당 최대 1000건, 2회 시도(총 2000건이면 충분)
    for a, b in [(1, 1000), (1001, 2000)]:
        try:
            data = fetch(a, b)
        except Exception as e:
            if a == 1:
                print(f"::error::API 호출 실패: {e}")
                sys.exit(1)
            break
        svc = data.get("culturalEventInfo")
        if not svc:
            msg = data.get("RESULT", {}).get("MESSAGE", "unknown")
            if a == 1:
                print(f"::error::API 응답 이상: {msg}")
                sys.exit(1)
            break
        rows += svc.get("row", [])
        if svc.get("list_total_count", 0) <= b:
            break

    events = []
    for r in rows:
        if r.get("IS_FREE", "").strip() != "무료":
            continue
        s = parse_date(r.get("STRTDATE", ""))
        e = parse_date(r.get("END_DATE", ""))
        if not s or not e or e < TODAY:
            continue
        title = (r.get("TITLE") or "").strip()
        if not title or any(k in title for k in SKIP_TITLES):
            continue
        place = (r.get("PLACE") or "").strip()
        gu = (r.get("GUNAME") or "").strip()
        code = (r.get("CODENAME") or "행사").strip()
        trgt = (r.get("USE_TRGT") or "").strip()
        url = (r.get("ORG_LINK") or r.get("HMPG_ADDR") or "https://culture.seoul.go.kr").strip()
        events.append({
            "s": s.isoformat(), "e": e.isoformat(), "region": "seoul",
            "vi": {"t": title,
                   "place": (place + (" · " + gu if gu else "")) or "Seoul",
                   "d": f"Sự kiện miễn phí · {code}" + (f" · Đối tượng: {trgt}" if trgt else "") + " · Chi tiết xem link chính thức."},
            "ko": {"t": title,
                   "place": (place + (" · " + gu if gu else "")) or "서울",
                   "d": f"무료 · {code}" + (f" · 대상: {trgt}" if trgt else "") + " · 상세는 공식 링크 확인."},
            "url": url, "verified": TODAY.isoformat(),
        })

    # 시작일 순 정렬, 상한 적용
    events.sort(key=lambda x: x["s"])
    events = events[:MAX_EVENTS]

    if not events:
        print("::warning::무료 행사 0건 — 기존 파일 유지")
        sys.exit(0)

    out = ("/* 자동 생성 파일 — 직접 수정 금지 (scripts/update_events.py가 갱신) */\n"
           "window.SKEVENTS_AUTO = " + json.dumps(events, ensure_ascii=False, indent=1) + ";\n")
    with open("events-auto.js", "w", encoding="utf-8") as f:
        f.write(out)
    print(f"OK: {len(events)}건 저장 (오늘: {TODAY})")

if __name__ == "__main__":
    main()
