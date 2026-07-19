/* ============================================================
   SỰ KIỆN MIỄN PHÍ / 무료 행사 데이터
   매달 이 파일만 교체하면 사이트의 행사 페이지가 갱신됩니다.
   규칙:
   - s / e : 시작일 / 종료일 (YYYY-MM-DD). 종료일이 지나면 자동 숨김.
   - region : seoul | gyeonggi | incheon | busan | daegu | other
   - url : 반드시 공식 출처(지자체·기관) 링크
   - verified : 날짜를 확인한 날
   - days : 선택 — "CN" 등 요일 안내 (베트남어)
   ============================================================ */
window.SKEVENTS = [
  {
    s: "2026-09-06", e: "2026-10-25", region: "seoul",
    vi: { t: "Lễ hội đi bộ cầu Jamsu (잠수교 뚜벅뚜벅 축제)", place: "Cầu Jamsu, sông Hàn, Seoul", d: "Mỗi Chủ nhật cầu Jamsu cấm xe — đi bộ giữa sông Hàn, chợ trời, biểu diễn đường phố. Hoàn toàn miễn phí." },
    ko: { t: "잠수교 뚜벅뚜벅 축제 (하반기)", place: "서울 한강 잠수교", d: "매주 일요일 차 없는 잠수교 — 한강 위 산책, 플리마켓, 거리공연. 전면 무료." },
    days: "Mỗi Chủ nhật / 매주 일요일",
    url: "https://festival.seoul.go.kr", verified: "2026-07-19"
  },
  {
    s: "2026-01-01", e: "2026-12-31", region: "seoul",
    vi: { t: "Bảo tàng Quốc gia Hàn Quốc — trưng bày thường trực miễn phí", place: "국립중앙박물관, Yongsan, Seoul (ga Ichon)", d: "Bảo tàng lớn nhất Hàn Quốc, khu trưng bày thường trực miễn phí quanh năm. Có máy lạnh — điểm trốn nóng/lạnh tuyệt vời. Đóng cửa một số ngày lễ." },
    ko: { t: "국립중앙박물관 상설전시 (무료)", place: "서울 용산 · 이촌역", d: "한국 최대 박물관, 상설전시 연중 무료. 냉난방 완비 — 더위·추위 피하기 좋은 곳. 일부 휴관일 확인." },
    days: "Quanh năm / 연중",
    url: "https://www.museum.go.kr", verified: "2026-07-19"
  },
  {
    s: "2026-01-01", e: "2026-12-31", region: "seoul",
    vi: { t: "Bảo tàng Lịch sử Seoul + các bảo tàng thành phố — miễn phí", place: "서울역사박물관, Gwanghwamun, Seoul", d: "Nhiều bảo tàng do thành phố Seoul vận hành mở cửa miễn phí, thỉnh thoảng có hòa nhạc cuối tuần miễn phí ở sảnh." },
    ko: { t: "서울역사박물관 등 시립 박물관 (무료)", place: "서울 광화문 일대", d: "서울시 운영 박물관 다수 무료 관람, 주말 로비 무료 음악회가 열리기도." },
    days: "Quanh năm / 연중",
    url: "https://museum.seoul.go.kr", verified: "2026-07-19"
  },
  {
    s: "2026-07-01", e: "2026-08-31", region: "seoul",
    vi: { t: "Chương trình hè sông Hàn (한강 여름 프로그램)", place: "Các công viên sông Hàn, Seoul", d: "Mùa hè sông Hàn có nhiều chương trình văn hóa, chiếu phim ngoài trời — phần lớn miễn phí. Lịch từng tuần xem trang chính thức (ngày cụ thể thay đổi theo tuần)." },
    ko: { t: "한강 여름 프로그램", place: "서울 한강공원 일대", d: "여름철 한강공원 문화행사·야외 상영 등 다수 무료. 주차별 일정은 공식 페이지에서 확인 (세부 일정 변동)." },
    days: "Tháng 7–8 / 7~8월",
    url: "https://hangang.seoul.go.kr", verified: "2026-07-19"
  }
];
