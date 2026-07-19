# 지하철 실시간 도착 Worker 배포법 (10분, 무료)

1. dash.cloudflare.com 로그인 → 왼쪽 메뉴 **Workers & Pages** → **Create** → "Create Worker"
2. 이름: `subway` 등 아무거나 → **Deploy** (기본 코드로 일단 배포)
3. 배포 후 **Edit code** → 기본 코드를 전부 지우고 `subway-worker.js` 내용 붙여넣기 → **Save and deploy**
4. Worker 화면 → **Settings → Variables and Secrets** → **Add** →
   - Type: **Secret** / Name: `SEOUL_SUBWAY_KEY` / Value: 서울 열린데이터광장에서 받은 지하철 실시간 키
   → Save
5. Worker 주소 복사 (예: `https://subway.계정명.workers.dev`)
6. 사이트의 `ban-do-tau-dien.html` 과 `ko/ban-do-tau-dien.html` 파일 상단 스크립트의
   `const PROXY_URL = "";` 안에 그 주소를 붙여넣고 GitHub에 업로드
   (예: `const PROXY_URL = "https://subway.jay.workers.dev";`)

테스트: 브라우저에서 `Worker주소/?station=강남` 접속 → JSON이 보이면 성공.
