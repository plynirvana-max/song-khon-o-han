#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""외부 링크 생존 검사 — 죽은 링크(404/DNS실패/타임아웃)를 찾아 보고.
정부·공식 사이트가 주 대상. 403은 봇차단이므로 '생존'으로 간주."""
import glob, re, sys, urllib.request, urllib.error, socket, json

socket.setdefaulttimeout(15)
UA={"User-Agent":"Mozilla/5.0 (compatible; SongKhonLinkCheck/1.0)"}

# collect external links
links={}
for f in glob.glob("**/*.html",recursive=True):
    for u in re.findall(r'href="(https?://[^"]+)"', open(f,encoding="utf-8").read()):
        u=u.split("#")[0]
        links.setdefault(u,set()).add(f)

# skip noisy/side domains that block bots aggressively or are per-user
SKIP=("facebook.com","m.me","goatcounter.com","cloudflareinsights.com","zalo.me","google.com/maps")

dead=[]
for u,files in sorted(links.items()):
    if any(s in u for s in SKIP): continue
    try:
        import urllib.parse as _up
        _p=_up.urlsplit(u)
        safe=_up.urlunsplit((_p.scheme,_p.netloc,_up.quote(_p.path,safe="/%"),_up.quote(_p.query,safe="=&%"),_p.fragment))
        req=urllib.request.Request(safe,headers=UA,method="HEAD")
        try:
            r=urllib.request.urlopen(req)
            code=r.getcode()
        except urllib.error.HTTPError as e:
            code=e.code
            if code in (405,403,400):  # HEAD blocked → try GET
                req=urllib.request.Request(u,headers=UA)
                try: code=urllib.request.urlopen(req).getcode()
                except urllib.error.HTTPError as e2: code=e2.code
        if code in (404,410):
            dead.append((u,code,sorted(files)))
    except Exception as e:
        dead.append((u,str(type(e).__name__),sorted(files)))

print(json.dumps({"checked":len(links),"dead":len(dead)},ensure_ascii=False))
if dead:
    print("\n## 죽었거나 접근 불가한 링크\n")
    for u,code,files in dead:
        print(f"- `{u}` → **{code}**")
        for f in files[:3]: print(f"  - {f}")
    sys.exit(1)
print("모든 외부 링크 정상 ✓")
