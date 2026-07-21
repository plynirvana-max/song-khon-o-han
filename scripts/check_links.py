#!/usr/bin/env python3
"""주간 외부 링크 생존 검사 — 죽은 링크(404/410/DNS실패/타임아웃)만 GitHub 이슈로 보고.
403/401/429 등은 '봇 차단'으로 간주해 정상 취급 (실제 브라우저에선 열림)."""
import glob, re, os, json, urllib.request, urllib.error, socket, ssl, sys

SKIP_DOMAINS = ("facebook.com","m.me","zalo.me","goatcounter.com","cloudflareinsights.com",
                "gc.zgo.at","instagram.com","tiktok.com")
ALIVE_CODES = set(range(200,400)) | {401,403,405,406,409,429,999}

def collect():
    urls=set()
    for f in glob.glob("**/*.html",recursive=True):
        s=open(f,encoding="utf-8",errors="ignore").read()
        for u in re.findall(r'href="(https?://[^"]+)"',s):
            u=u.split("#")[0]
            if any(d in u for d in SKIP_DOMAINS): continue
            urls.add(u)
    return sorted(urls)

def check(url, tries=2):
    ctx=ssl.create_default_context(); ctx.check_hostname=False; ctx.verify_mode=ssl.CERT_NONE
    req=urllib.request.Request(url, headers={"User-Agent":"Mozilla/5.0 (LinkCheck; songkhonohan.com)"})
    last="?"
    for _ in range(tries):
        try:
            with urllib.request.urlopen(req, timeout=15, context=ctx) as r:
                return ("ok", r.status)
        except urllib.error.HTTPError as e:
            last=e.code
            if e.code in ALIVE_CODES: return ("ok", e.code)
            if e.code in (404,410): return ("dead", e.code)
        except (urllib.error.URLError, socket.timeout, ssl.SSLError, ConnectionError) as e:
            last=str(getattr(e,"reason",e))[:60]
    return ("dead", last)

def main():
    urls=collect()
    print(f"checking {len(urls)} external urls")
    dead=[]
    for u in urls:
        st,info=check(u)
        print(("DEAD  " if st=="dead" else "ok    "), info, u)
        if st=="dead": dead.append((u,info))
    if not dead:
        print("all alive ✓"); return
    body="자동 링크 검사에서 죽은 링크 발견:\n\n"+"\n".join(f"- `{u}` → {i}" for u,i in dead)+ \
         "\n\n각 링크가 쓰인 페이지를 수정하거나 대체 출처로 바꿔주세요."
    tok=os.environ.get("GITHUB_TOKEN"); repo=os.environ.get("GITHUB_REPOSITORY")
    if tok and repo:
        req=urllib.request.Request(f"https://api.github.com/repos/{repo}/issues",
            data=json.dumps({"title":f"🔗 죽은 링크 {len(dead)}개 발견 (자동 검사)","body":body}).encode(),
            headers={"Authorization":f"Bearer {tok}","Accept":"application/vnd.github+json"})
        urllib.request.urlopen(req)
        print("issue created")
    else:
        print(body)
    sys.exit(0)

if __name__=="__main__": main()
