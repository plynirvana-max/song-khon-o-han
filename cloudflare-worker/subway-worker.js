// ============================================================
// 지하철 실시간 도착 중계 Worker (Cloudflare Workers 무료 플랜)
// 역할: API 키를 숨기고, CORS 허용 헤더를 붙여 사이트에서 호출 가능하게 함
// 배포법은 저장소의 cloudflare-worker/README.md 참고
// ============================================================
const CORS = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, OPTIONS",
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { headers: CORS });
    const url = new URL(request.url);
    const station = (url.searchParams.get("station") || "").trim();
    if (!station || station.length > 20) {
      return new Response(JSON.stringify({ error: "station required" }),
        { status: 400, headers: { ...CORS, "content-type": "application/json" } });
    }
    const api = `http://swopenapi.seoul.go.kr/api/subway/${env.SEOUL_SUBWAY_KEY}/json/realtimeStationArrival/0/20/${encodeURIComponent(station)}`;
    try {
      const r = await fetch(api, { cf: { cacheTtl: 15, cacheEverything: true } });
      const body = await r.text();
      return new Response(body, {
        headers: { ...CORS, "content-type": "application/json;charset=utf-8", "cache-control": "public, max-age=15" },
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: "upstream failed" }),
        { status: 502, headers: { ...CORS, "content-type": "application/json" } });
    }
  },
};
