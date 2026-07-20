/* 관련 글 자동 추천 — related-data 기반. 새 글을 REG에 추가하면 전 페이지에 자동 반영 */
(function(){
  var REG=[{"id": "tmoney", "cat": "moi-den", "tags": ["giao-thong", "the", "first"], "p": "bai-viet/the-giao-thong-tmoney.html", "vt": "Thẻ giao thông T-money: mua & nạp", "kt": "T-money 교통카드: 구매·충전"}, {"id": "subway-guide", "cat": "moi-den", "tags": ["giao-thong", "first"], "p": "bai-viet/di-tau-dien-ngam.html", "vt": "Tàu điện & xe buýt A–Z (có hình)", "kt": "지하철·버스 A–Z (그림 설명)"}, {"id": "subway-map", "cat": "moi-den", "tags": ["giao-thong", "tool"], "p": "ban-do-tau-dien.html", "vt": "Bản đồ tuyến + tàu đến realtime", "kt": "노선 도식도 + 실시간 도착"}, {"id": "daiso", "cat": "moi-den", "tags": ["mua-sam", "tiet-kiem", "first"], "p": "bai-viet/mua-sam-daiso.html", "vt": "Daiso: checklist tuần đầu", "kt": "다이소: 첫 주 체크리스트"}, {"id": "hair", "cat": "moi-den", "tags": ["mua-sam", "doi-song"], "p": "bai-viet/cat-toc-o-han.html", "vt": "Cắt tóc: tìm kiểu qua ảnh sao", "kt": "미용실: 연예인 사진으로 스타일 찾기"}, {"id": "glasses", "cat": "moi-den", "tags": ["mua-sam", "tiet-kiem"], "p": "bai-viet/mua-kinh-o-han.html", "vt": "Mua kính: giải mã \"nén\" & giá", "kt": "안경: \"압축\" 정체와 가격"}, {"id": "house", "cat": "moi-den", "tags": ["nha-o", "tien", "first"], "p": "bai-viet/thue-phong-o-han.html", "vt": "Thuê phòng: giữ tiền cọc an toàn", "kt": "방 구하기: 보증금 지키기"}, {"id": "medical", "cat": "moi-den", "tags": ["y-te", "first"], "p": "bai-viet/kham-benh-o-han.html", "vt": "Ốm thì đi đâu? Nhà thuốc→119", "kt": "아프면 어디로? 약국→119"}, {"id": "dichoi", "cat": "moi-den", "tags": ["doi-song", "tiet-kiem", "tool"], "p": "di-choi.html", "vt": "Chỗ đi chơi Seoul: miễn phí/rẻ", "kt": "서울 가볼 만한 곳: 무료·저가"}, {"id": "wage", "cat": "di-lam", "tags": ["tien", "quyen", "work"], "p": "bai-viet/cong-ty-no-luong.html", "vt": "Công ty nợ lương: 5 bước đòi", "kt": "임금체불: 되찾는 5단계"}, {"id": "change-e9", "cat": "di-lam", "tags": ["visa", "work", "quyen"], "p": "bai-viet/doi-cho-lam-e9.html", "vt": "Đổi chỗ làm E-9: 2 con số quyết định", "kt": "E-9 사업장 변경: 두 숫자"}, {"id": "insurance", "cat": "di-lam", "tags": ["tien", "work"], "p": "bai-viet/bao-hiem-xuat-canh.html", "vt": "Bảo hiểm xuất cảnh: đòi phần chênh", "kt": "출국만기보험: 차액 청구"}, {"id": "remit", "cat": "di-lam", "tags": ["tien", "money"], "p": "bai-viet/gui-tien-ve-viet-nam.html", "vt": "Gửi tiền về VN: kênh nào lợi nhất", "kt": "베트남 송금: 유리한 채널"}, {"id": "bank", "cat": "di-lam", "tags": ["tien", "money"], "p": "bai-viet/ngan-hang-o-han.html", "vt": "Ngân hàng: bảo hiểm tiền gửi & hóa đơn", "kt": "은행: 예금자보호 & 고지서"}, {"id": "parttime", "cat": "du-hoc", "tags": ["visa", "work", "study"], "p": "bai-viet/lam-them-du-hoc-sinh.html", "vt": "Làm thêm du học sinh: giờ & tìm việc", "kt": "유학생 알바: 시간·자리 찾기"}, {"id": "visa", "cat": "du-hoc", "tags": ["visa"], "p": "bai-viet/visa-han-quoc-co-ban.html", "vt": "Visa cơ bản: 3 quy tắc vàng", "kt": "비자 기본: 황금률 3가지"}, {"id": "marriage", "cat": "ket-hon", "tags": ["quyen", "family"], "p": "bai-viet/khi-hon-nhan-kho-khan.html", "vt": "Khi hôn nhân khó khăn: nơi gọi trước", "kt": "결혼이 어려울 때: 먼저 연락할 곳"}, {"id": "savings", "cat": "di-lam", "tags": ["tien", "tool", "money"], "p": "cong-cu/tinh-tiet-kiem.html", "vt": "Máy tính mục tiêu tiết kiệm", "kt": "저축 목표 계산기"}, {"id": "severance", "cat": "di-lam", "tags": ["tien", "tool", "work"], "p": "cong-cu/tinh-toejikgeum.html", "vt": "Máy tính trợ cấp thôi việc (퇴직금)", "kt": "퇴직금 계산기"}, {"id": "leveltest", "cat": "moi-den", "tags": ["tool", "fun"], "p": "level-test.html", "vt": "Test trình độ sống ở Hàn", "kt": "한국살이 레벨테스트"}, {"id": "barter", "cat": "moi-den", "tags": ["tiet-kiem", "mua-sam", "tool", "doi-song"], "p": "cho-trao-doi.html", "vt": "Chợ trao đổi & tặng đồ cũ", "kt": "나눔·물물교환 게시판"}];
  // detect language + current id by matching path suffix
  var path=location.pathname.replace(/index\.html$/,'').replace(/\/$/,'');
  var isKo=/\/ko(\/|$)/.test(location.pathname);
  function norm(p){return p.replace(/^\/(ko\/)?/,'').replace(/^\//,'');}
  var here=norm(location.pathname);
  var cur=null;
  REG.forEach(function(r){ if(here.indexOf(r.p)!==-1) cur=r; });
  if(!cur) return; // unknown page → skip
  // score others: +3 same category, +1 per shared tag
  var scored=REG.filter(function(r){return r.id!==cur.id;}).map(function(r){
    var sc=(r.cat===cur.cat?3:0);
    r.tags.forEach(function(t){ if(cur.tags.indexOf(t)!==-1) sc++; });
    return {r:r,sc:sc};
  }).filter(function(x){return x.sc>0;}).sort(function(a,b){return b.sc-a.sc;});
  var pick=scored.slice(0,3).map(function(x){return x.r;});
  if(!pick.length) return;
  // compute link prefix: depth of current file within its language tree
  // pages at root (or ko/) → prefix "", pages in bai-viet/ or cong-cu/ or ko/bai-viet/ → "../"
  var rel=here; // e.g. bai-viet/xxx.html  or  di-choi.html
  var depth=(rel.split('/').length-1); // subdir depth
  var pre=''; for(var i=0;i<depth;i++) pre+='../';
  // if we're under ko/, the ko-tree root already handled by pre; links use same p but ko pages live under ko/
  var koPre=isKo?'':''; // p already root-relative within tree; for ko pages the tree root is ko/, so same relative math works because 'here' includes no leading ko/
  var box=document.createElement('div');
  box.className='related-box';
  var title=isKo?'이어서 읽으면 좋아요':'Đọc tiếp nhé';
  var html='<h3>'+title+'</h3><div class="related-grid">';
  pick.forEach(function(r){
    var t=isKo?r.kt:r.vt;
    html+='<a href="'+pre+r.p+'">'+t+' →</a>';
  });
  html+='</div>';
  box.innerHTML=html;
  var foot=document.querySelector('footer');
  if(foot&&foot.parentNode) foot.parentNode.insertBefore(box,foot);
})();
