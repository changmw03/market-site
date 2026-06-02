(() => {
  const product = (id, name, category, brand, price, originalPrice, rating, reviews, stock, image, description, tags) => ({
    id,
    name,
    category,
    brand,
    price,
    originalPrice,
    rating,
    reviews,
    stock,
    image,
    description,
    tags
  });

  window.ShopData = {
    categories: [
      { id: "all", name: "전체", icon: "▦", color: "green" },
      { id: "grocery", name: "식료품", icon: "♧", color: "green" },
      { id: "appliance", name: "가전", icon: "▤", color: "blue" },
      { id: "fashion", name: "패션", icon: "◇", color: "pink" },
      { id: "beauty", name: "뷰티", icon: "✦", color: "purple" },
      { id: "digital", name: "디지털", icon: "▣", color: "blue" },
      { id: "home", name: "리빙", icon: "⌂", color: "orange" }
    ],
    trends: ["베스트", "인기딜", "신상", "LG", "딸기", "운동화", "뷰티", "리빙", "커피", "청소기"],
    products: [
      product("strawberries", "프리미엄 딸기", "grocery", "Fresh Farm", 10900, 12900, 4.8, 243, 18, "assets/strawberries.svg", "당도 높은 제철 딸기를 특수 포장해 신선하게 배송합니다.", ["식료품", "신선", "베스트"]),
      product("chips", "크리스피 포테이토 칩", "grocery", "Snack Lab", 4900, 5900, 4.6, 188, 36, "assets/chips.svg", "가볍게 즐기기 좋은 바삭한 감자칩 세트입니다.", ["간식", "인기딜", "베스트"]),
      product("coffee", "콜드브루 원두 세트", "grocery", "Daily Roast", 18900, 24000, 4.6, 134, 31, "assets/chips.svg", "향미가 깊고 고소한 콜드브루용 원두 구성입니다.", ["식료품", "커피", "신상"]),
      product("granola", "허니 그래놀라", "grocery", "Fresh Farm", 8900, 11900, 4.5, 96, 42, "assets/chips.svg", "요거트와 잘 어울리는 고소한 아침용 그래놀라입니다.", ["식료품", "베스트", "아침"]),
      product("olive-oil", "엑스트라 버진 올리브오일", "grocery", "Fresh Farm", 15900, 21000, 4.7, 178, 24, "assets/strawberries.svg", "샐러드와 파스타에 어울리는 데일리 올리브오일입니다.", ["식료품", "요리", "신상"]),
      product("protein-bar", "단백질 바 12개입", "grocery", "Snack Lab", 21900, 28000, 4.4, 83, 19, "assets/chips.svg", "운동 전후 간편하게 먹기 좋은 단백질 바 세트입니다.", ["간식", "운동", "인기딜"]),

      product("washer", "LG 드럼 세탁기", "appliance", "LG", 459900, 529900, 4.8, 94, 5, "assets/washer.svg", "대용량 세탁과 저소음 모드를 지원하는 드럼 세탁기입니다.", ["가전", "세탁기", "인기딜"]),
      product("vacuum", "핸디 무선 청소기", "appliance", "Clean Pro", 129000, 169000, 4.5, 143, 7, "assets/washer.svg", "차량과 작은 공간 청소에 적합한 무선 핸디 청소기입니다.", ["가전", "리빙", "인기딜"]),
      product("air-purifier", "스마트 공기청정기", "appliance", "Clean Pro", 199000, 249000, 4.7, 201, 11, "assets/washer.svg", "실내 공기 상태를 감지해 자동으로 풍량을 조절합니다.", ["가전", "리빙", "베스트"]),
      product("rice-cooker", "미니 압력 밥솥", "appliance", "Kitchen One", 89900, 119000, 4.4, 64, 16, "assets/washer.svg", "1인 가구에 맞춘 작은 크기의 압력 밥솥입니다.", ["가전", "주방", "신상"]),
      product("air-fryer", "글라스 에어프라이어", "appliance", "Kitchen One", 109000, 149000, 4.6, 132, 8, "assets/washer.svg", "조리 과정을 볼 수 있는 투명 글라스 바스켓 타입입니다.", ["가전", "주방", "인기딜"]),
      product("dryer", "컴팩트 의류 건조기", "appliance", "LG", 389000, 469000, 4.5, 57, 4, "assets/washer.svg", "작은 세탁실에도 배치하기 좋은 컴팩트 건조기입니다.", ["가전", "세탁", "베스트"]),

      product("headphones", "무선 헤드폰", "digital", "Soundly", 89900, 109000, 4.9, 312, 14, "assets/headphones.svg", "노이즈 캔슬링과 40시간 배터리를 갖춘 데일리 헤드폰입니다.", ["디지털", "신상", "베스트"]),
      product("speaker", "미니 블루투스 스피커", "digital", "Soundly", 54900, 69000, 4.4, 89, 20, "assets/headphones.svg", "작은 크기와 선명한 사운드를 갖춘 휴대용 스피커입니다.", ["디지털", "인기딜", "신상"]),
      product("keyboard", "저소음 무선 키보드", "digital", "Desk Mate", 64900, 82000, 4.5, 112, 15, "assets/headphones.svg", "사무실에서도 조용하게 사용할 수 있는 슬림 키보드입니다.", ["디지털", "업무", "베스트"]),
      product("mouse", "인체공학 무선 마우스", "digital", "Desk Mate", 39900, 52000, 4.3, 85, 27, "assets/headphones.svg", "손목 부담을 줄이는 세로형 인체공학 마우스입니다.", ["디지털", "업무", "인기딜"]),
      product("tablet-stand", "알루미늄 태블릿 스탠드", "digital", "Desk Mate", 29900, 39000, 4.6, 98, 33, "assets/headphones.svg", "책상 위 기기를 안정적으로 거치하는 접이식 스탠드입니다.", ["디지털", "리빙", "신상"]),
      product("charger", "65W 고속 충전기", "digital", "Power Go", 34900, 49000, 4.7, 220, 44, "assets/headphones.svg", "노트북과 스마트폰을 함께 충전할 수 있는 멀티 충전기입니다.", ["디지털", "인기딜", "베스트"]),

      product("sneakers", "데일리 러닝 스니커즈", "fashion", "Urban Fit", 69000, 79000, 4.5, 156, 0, "assets/sneakers.svg", "가벼운 착화감과 탄탄한 쿠션을 갖춘 데일리 스니커즈입니다.", ["패션", "운동화", "신상"]),
      product("jacket", "라이트 윈드 재킷", "fashion", "Urban Fit", 79000, 99000, 4.3, 76, 12, "assets/sneakers.svg", "가볍고 구김이 적어 데일리로 입기 좋은 바람막이입니다.", ["패션", "베스트", "신상"]),
      product("hoodie", "소프트 오버핏 후디", "fashion", "Urban Fit", 59000, 79000, 4.6, 173, 23, "assets/sneakers.svg", "부드러운 기모 안감으로 편하게 입는 오버핏 후디입니다.", ["패션", "베스트", "리빙"]),
      product("tote", "캔버스 데일리 토트백", "fashion", "Mode Studio", 42000, 59000, 4.4, 67, 18, "assets/sneakers.svg", "노트북과 소지품을 넉넉하게 담는 데일리 토트백입니다.", ["패션", "신상", "인기딜"]),
      product("watch", "미니멀 레더 시계", "fashion", "Mode Studio", 84000, 119000, 4.5, 101, 10, "assets/sneakers.svg", "깔끔한 디자인과 가죽 스트랩의 데일리 시계입니다.", ["패션", "신상", "베스트"]),
      product("cap", "워시드 볼캡", "fashion", "Mode Studio", 24900, 34000, 4.2, 54, 29, "assets/sneakers.svg", "자연스러운 컬러감의 사계절용 워시드 볼캡입니다.", ["패션", "데일리", "인기딜"]),

      product("skincare", "수분 케어 세트", "beauty", "Glow Kit", 32900, 42000, 4.7, 207, 22, "assets/skincare.svg", "토너와 크림을 묶은 데일리 수분 케어 루틴 세트입니다.", ["뷰티", "신상", "인기딜"]),
      product("cleanser", "마일드 젤 클렌저", "beauty", "Glow Kit", 17900, 24000, 4.5, 144, 35, "assets/skincare.svg", "당김 없이 부드럽게 세안하는 저자극 젤 클렌저입니다.", ["뷰티", "데일리", "베스트"]),
      product("serum", "비타 글로우 세럼", "beauty", "Pure Lab", 28900, 39000, 4.6, 167, 21, "assets/skincare.svg", "칙칙한 피부톤을 환하게 관리하는 비타민 세럼입니다.", ["뷰티", "신상", "인기딜"]),
      product("sunscreen", "데일리 선크림", "beauty", "Pure Lab", 19900, 26000, 4.4, 92, 30, "assets/skincare.svg", "백탁을 줄이고 산뜻하게 마무리되는 데일리 선크림입니다.", ["뷰티", "데일리", "베스트"]),
      product("body-lotion", "시어버터 바디로션", "beauty", "Pure Lab", 23900, 31000, 4.5, 88, 26, "assets/skincare.svg", "건조한 피부에 오래 남는 보습감을 주는 바디로션입니다.", ["뷰티", "리빙", "신상"]),
      product("lip-balm", "틴티드 립밤", "beauty", "Glow Kit", 12900, 18000, 4.3, 73, 38, "assets/skincare.svg", "자연스러운 생기와 보습을 동시에 주는 컬러 립밤입니다.", ["뷰티", "신상", "인기딜"]),

      product("chair", "모던 라운지 체어", "home", "Home Edit", 35900, 45900, 4.7, 121, 9, "assets/chair.svg", "거실과 작업 공간에 잘 어울리는 편안한 라운지 체어입니다.", ["리빙", "가구", "베스트"]),
      product("diffuser", "릴랙스 디퓨저", "home", "Home Edit", 25900, 33000, 4.6, 118, 28, "assets/skincare.svg", "침실과 작업 공간에 어울리는 은은한 향의 디퓨저입니다.", ["리빙", "신상", "인기딜"]),
      product("lamp", "무드 테이블 램프", "home", "Home Edit", 46900, 62000, 4.6, 139, 17, "assets/chair.svg", "침실과 거실 분위기를 따뜻하게 만드는 테이블 램프입니다.", ["리빙", "조명", "베스트"]),
      product("rug", "소프트 베이지 러그", "home", "Room Studio", 58900, 79000, 4.4, 81, 13, "assets/chair.svg", "공간을 차분하게 정리해주는 부드러운 촉감의 러그입니다.", ["리빙", "인테리어", "인기딜"]),
      product("storage-box", "모듈 수납 박스", "home", "Room Studio", 19900, 27000, 4.3, 63, 41, "assets/chair.svg", "옷장과 책상 주변을 정리하기 좋은 모듈형 수납 박스입니다.", ["리빙", "정리", "베스트"]),
      product("bedding", "워셔블 차렵이불", "home", "Room Studio", 69900, 92000, 4.7, 152, 11, "assets/chair.svg", "세탁이 쉬운 사계절용 차렵이불 세트입니다.", ["리빙", "침구", "신상"])
    ]
  };
})();
