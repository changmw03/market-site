window.ShopRender = (() => {
  const categoryGrid = document.querySelector("#categoryGrid");
  const trendChips = document.querySelector("#trendChips");
  const dealTrendChips = document.querySelector("#dealTrendChips");
  const productGrid = document.querySelector("#productGrid");
  const dealGrid = document.querySelector("#dealGrid");
  const homeFeaturedGrid = document.querySelector("#homeFeaturedGrid");
  const recentGrid = document.querySelector("#recentGrid");
  const compareGrid = document.querySelector("#compareGrid");
  const alertGrid = document.querySelector("#alertGrid");
  const orderHistory = document.querySelector("#orderHistory");
  const cartItems = document.querySelector("#cartItems");
  const checkoutItems = document.querySelector("#checkoutItems");
  const cartCount = document.querySelector("#cartCount");
  const catalogCount = document.querySelector("#catalogCount");
  const wishlistHeaderButton = document.querySelector("#wishlistButton");
  const drawerSummary = document.querySelector("#drawerSummary");
  const priceSummary = document.querySelector("#priceSummary");
  const brandSelect = document.querySelector("#brandSelect");
  const priceRangeValue = document.querySelector("#priceRangeValue");
  const detailModal = document.querySelector("#detailModal");
  const detailCard = document.querySelector("#detailCard");
  const toastNode = document.querySelector("#toast");
  let brandOptionsHtml = "";

  function setHtml(target, html) {
    if (target.innerHTML !== html) {
      target.innerHTML = html;
    }
  }

  function imageTag(product, loading = "lazy") {
    return `<img src="${product.image}" alt="${product.name}" loading="${loading}" decoding="async">`;
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function renderBrands() {
    if (!brandOptionsHtml) {
      const brands = [...new Set(ShopData.products.map((product) => product.brand))].sort();
      brandOptionsHtml = [
        `<option value="all">전체 브랜드</option>`,
        ...brands.map((brand) => `<option value="${brand}">${brand}</option>`)
      ].join("");
    }

    setHtml(brandSelect, brandOptionsHtml);
    if (brandSelect.value !== ShopStore.state.brand) {
      brandSelect.value = ShopStore.state.brand;
    }
  }

  function renderCategories() {
    setHtml(categoryGrid, ShopData.categories.map((category) => `
      <button class="category-card ${ShopStore.state.category === category.id ? "active" : ""}" type="button" data-category="${category.id}" data-color="${category.color}">
        <span>${category.icon}</span>
        <strong>${category.name}</strong>
      </button>
    `).join(""));
  }

  function renderTrends() {
    const chipHtml = ShopData.trends.map((trend) => `
      <button class="trend-chip ${ShopStore.state.query === trend ? "active" : ""}" type="button" data-trend="${trend}">#${trend}</button>
    `).join("");

    setHtml(trendChips, chipHtml);
    setHtml(dealTrendChips, chipHtml);
  }

  function productCard(product) {
    const discount = ShopFilters.getDiscount(product);
    const reviewStats = ShopReviews.getStats(product);
    const isWishlisted = ShopStore.state.wishlist.has(product.id);
    const inCart = Boolean(ShopStore.state.cart[product.id]);
    const isCompared = ShopStore.state.compare.has(product.id);
    const hasAlert = ShopStore.state.priceAlerts.has(product.id);

    return `
      <article class="product-card">
        <button class="product-media" type="button" data-detail="${product.id}" aria-label="${product.name} 상세 보기">
          ${imageTag(product)}
          <span class="discount-badge">${discount}% OFF</span>
          <span class="stock-badge">${product.stock > 0 ? `${product.stock}개` : "품절"}</span>
        </button>
        <div>
          <h3>${product.name}</h3>
          <p>${product.brand}</p>
        </div>
        <div class="product-meta">
          <span class="price-stack">
            <del>${ShopStore.formatCurrency(product.originalPrice)}</del>
            <strong>${ShopStore.formatCurrency(product.price)}</strong>
          </span>
          <button class="rating review-link" type="button" data-detail="${product.id}" data-open-reviews="true" aria-label="${product.name} 리뷰 보기">★ ${reviewStats.rating}</button>
        </div>
        <p>${product.description}</p>
        <div class="product-actions">
          <button class="small-button" type="button" data-wishlist="${product.id}" aria-label="${product.name} 찜">${isWishlisted ? "♥" : "♡"}</button>
          <button class="detail-button" type="button" data-detail="${product.id}">상세</button>
          <button class="add-button ${inCart ? "in-cart" : ""}" type="button" data-add="${product.id}" ${product.stock === 0 ? "disabled" : ""}>${inCart ? "담김" : "담기"}</button>
        </div>
        <div class="secondary-actions">
          <button class="${isCompared ? "active" : ""}" type="button" data-compare="${product.id}">${isCompared ? "비교중" : "비교"}</button>
          <button class="${hasAlert ? "active" : ""}" type="button" data-price-alert="${product.id}">${hasAlert ? "알림중" : "가격 알림"}</button>
        </div>
      </article>
    `;
  }

  function renderProductGrid(target, products, emptyText) {
    if (products.length === 0) {
      setHtml(target, `<div class="empty-state">${emptyText}</div>`);
      return;
    }

    setHtml(target, products.map(productCard).join(""));
  }

  function renderProducts() {
    const products = ShopFilters.getFilteredProducts();
    catalogCount.textContent = products.length;
    priceRangeValue.textContent = ShopStore.state.maxPrice >= 600000 ? "전체" : ShopStore.formatCurrency(ShopStore.state.maxPrice);
    renderProductGrid(productGrid, products, "조건에 맞는 상품이 없습니다. 검색어나 필터를 바꿔보세요.");
  }

  function renderHome() {
    const featured = [...ShopData.products]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
    renderProductGrid(homeFeaturedGrid, featured, "추천 상품을 불러오지 못했습니다.");
    const recentProducts = ShopStore.state.recent
      .map((id) => ShopStore.getProduct(id))
      .filter(Boolean);
    renderProductGrid(recentGrid, recentProducts, "아직 최근 본 상품이 없습니다. 상품 상세를 열면 여기에 표시됩니다.");
  }

  function renderDeals() {
    renderProductGrid(dealGrid, ShopFilters.getDealProducts(6), "현재 표시할 인기딜이 없습니다.");
  }

  function renderCartLines(target, compactEmptyText) {
    const lines = ShopCart.getCartLines();

    if (lines.length === 0) {
      setHtml(target, `<div class="empty-state">${compactEmptyText}</div>`);
      return;
    }

    setHtml(target, lines.map(({ product, quantity }) => `
      <article class="cart-line">
        ${imageTag(product)}
        <div>
          <h3>${product.name}</h3>
          <p>${ShopStore.formatCurrency(product.price)} · ${product.brand}</p>
          <div class="quantity-row">
            <button type="button" data-qty="${product.id}" data-delta="-1">-</button>
            <strong>${quantity}</strong>
            <button type="button" data-qty="${product.id}" data-delta="1">+</button>
            <button class="text-button" type="button" data-remove="${product.id}">삭제</button>
          </div>
        </div>
      </article>
    `).join(""));
  }

  function renderSummary(target) {
    const summary = ShopCart.getSummary();
    setHtml(target, `
      <div><dt>상품 원가</dt><dd>${ShopStore.formatCurrency(summary.originalSubtotal)}</dd></div>
      <div><dt>상품 할인</dt><dd>-${ShopStore.formatCurrency(summary.productDiscount)}</dd></div>
      <div><dt>할인가 합계</dt><dd>${ShopStore.formatCurrency(summary.subtotal)}</dd></div>
      <div><dt>배송비</dt><dd>${summary.shipping === 0 ? "무료" : ShopStore.formatCurrency(summary.shipping)}</dd></div>
      <div><dt>쿠폰 할인</dt><dd>-${ShopStore.formatCurrency(summary.couponDiscount)}</dd></div>
      <div class="total"><dt>총 결제 금액</dt><dd>${ShopStore.formatCurrency(summary.total)}</dd></div>
    `);
  }

  function renderCart() {
    const totalCount = ShopCart.getCartLines().reduce((sum, line) => sum + line.quantity, 0);
    cartCount.textContent = totalCount;
    wishlistHeaderButton.classList.toggle("active", ShopStore.state.wishlistOnly);
    wishlistHeaderButton.innerHTML = `<span>${ShopStore.state.wishlistOnly ? "♥" : "♡"}</span><strong>찜</strong>`;
    renderCartLines(cartItems, "장바구니가 비어 있습니다.");
    renderCartLines(checkoutItems, "결제할 상품이 없습니다.");
    renderSummary(drawerSummary);
    renderSummary(priceSummary);
  }

  function renderCompare() {
    const comparedProducts = [...ShopStore.state.compare]
      .map((id) => ShopStore.getProduct(id))
      .filter(Boolean);

    if (comparedProducts.length === 0) {
      setHtml(compareGrid, `<div class="empty-state">상품 카드에서 비교 버튼을 눌러 최대 3개까지 비교해보세요.</div>`);
      return;
    }

    setHtml(compareGrid, comparedProducts.map((product) => `
      <article class="compare-card">
        ${imageTag(product)}
        <h3>${product.name}</h3>
        <dl>
          <div><dt>브랜드</dt><dd>${product.brand}</dd></div>
          <div><dt>현재가</dt><dd>${ShopStore.formatCurrency(product.price)}</dd></div>
          <div><dt>평점</dt><dd>${product.rating}</dd></div>
          <div><dt>재고</dt><dd>${product.stock > 0 ? `${product.stock}개` : "품절"}</dd></div>
        </dl>
        <button class="text-button" type="button" data-compare="${product.id}">비교에서 제거</button>
      </article>
    `).join(""));
  }

  function renderPriceAlerts() {
    const alertProducts = [...ShopStore.state.priceAlerts]
      .map((id) => ShopStore.getProduct(id))
      .filter(Boolean);

    if (alertProducts.length === 0) {
      setHtml(alertGrid, `<div class="empty-state">상품 카드에서 가격 알림을 누르면 이곳에 표시됩니다.</div>`);
      return;
    }

    setHtml(alertGrid, alertProducts.map((product) => `
      <article class="compare-card alert-card">
        ${imageTag(product)}
        <h3>${product.name}</h3>
        <p>${product.brand}</p>
        <dl>
          <div><dt>원가</dt><dd><del>${ShopStore.formatCurrency(product.originalPrice)}</del></dd></div>
          <div><dt>현재가</dt><dd>${ShopStore.formatCurrency(product.price)}</dd></div>
          <div><dt>알림 조건</dt><dd>추가 할인 시</dd></div>
        </dl>
        <button class="text-button" type="button" data-price-alert="${product.id}">알림 해제</button>
      </article>
    `).join(""));
  }

  function renderOrders() {
    if (ShopStore.state.orders.length === 0) {
      setHtml(orderHistory, `<div class="empty-state">아직 주문 내역이 없습니다.</div>`);
      return;
    }

    setHtml(orderHistory, ShopStore.state.orders.map((order) => `
      <article class="order-card">
        <div>
          <strong>${order.id}</strong>
          <span>${order.createdAt}</span>
        </div>
        <p>${order.count}개 상품 · ${ShopStore.formatCurrency(order.total)}</p>
      </article>
    `).join(""));
  }

  function reviewStars(selectedRating = 5) {
    return [5, 4, 3, 2, 1].map((rating) => `
      <label>
        <input type="radio" name="reviewRating" value="${rating}" ${rating === selectedRating ? "checked" : ""}>
        <span>${"★".repeat(rating)}</span>
      </label>
    `).join("");
  }

  function renderReviewList(product) {
    const reviews = ShopReviews.getReviews(product.id);

    if (reviews.length === 0) {
      return `<div class="empty-state compact">아직 작성된 리뷰가 없습니다. 첫 리뷰를 남겨보세요.</div>`;
    }

    return reviews.map((review) => `
      <article class="review-item">
        <div>
          <strong>${escapeHtml(review.name)}</strong>
          <span>${"★".repeat(review.rating)} · ${review.createdAt}</span>
        </div>
        <p>${escapeHtml(review.body)}</p>
      </article>
    `).join("");
  }

  function openDetail(productId, options = {}) {
    const product = ShopStore.getProduct(productId);

    if (!product) {
      return;
    }

    const reviewStats = ShopReviews.getStats(product);
    ShopStore.rememberProduct(productId);

    setHtml(detailCard, `
      ${imageTag(product, "eager")}
      <div>
        <p class="eyebrow">${product.brand}</p>
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <div class="product-meta">
          <span class="price-stack">
            <del>${ShopStore.formatCurrency(product.originalPrice)}</del>
            <strong>${ShopStore.formatCurrency(product.price)}</strong>
          </span>
          <button class="rating review-link" type="button" data-open-reviews="true">★ ${reviewStats.rating} (${reviewStats.count})</button>
        </div>
        <div class="result-tags">
          ${product.tags.map((tag) => `<span>${tag}</span>`).join("")}
        </div>
        <div class="hero-actions">
          <button class="primary-button" type="button" data-add="${product.id}">장바구니 담기</button>
          <button class="secondary-button" type="button" data-close-detail>닫기</button>
        </div>
      </div>
      <section class="review-section" id="reviewSection" data-review-product="${product.id}" aria-labelledby="reviewTitle">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Reviews</p>
            <h2 id="reviewTitle">리뷰 모음</h2>
          </div>
          <strong class="review-score">★ ${reviewStats.rating} · ${reviewStats.count}개</strong>
        </div>
        <div class="review-list" id="reviewList">
          ${renderReviewList(product)}
        </div>
        <form class="review-form" id="reviewForm">
          <div class="star-input" aria-label="별점 선택">
            ${reviewStars()}
          </div>
          <label>
            <span>이름</span>
            <input type="text" id="reviewName" maxlength="16" placeholder="익명">
          </label>
          <label>
            <span>리뷰</span>
            <textarea id="reviewBody" rows="4" maxlength="180" placeholder="상품 사용 후기를 적어주세요."></textarea>
          </label>
          <button class="primary-button" type="submit">리뷰 등록</button>
        </form>
      </section>
    `);
    detailModal.classList.add("open");
    detailModal.setAttribute("aria-hidden", "false");

    if (options.openReviews) {
      scrollToReviews();
    }
  }

  function scrollToReviews() {
    document.querySelector("#reviewSection")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function closeDetail() {
    detailModal.classList.remove("open");
    detailModal.setAttribute("aria-hidden", "true");
  }

  function toast(message) {
    toastNode.textContent = message;
    toastNode.classList.add("show");
    window.clearTimeout(toastNode.hideTimer);
    toastNode.hideTimer = window.setTimeout(() => toastNode.classList.remove("show"), 1800);
  }

  function renderAll() {
    renderBrands();
    renderCategories();
    renderTrends();
    renderHome();
    renderProducts();
    renderDeals();
    renderCart();
    renderCompare();
    renderPriceAlerts();
    renderOrders();
  }

  return { renderAll, openDetail, closeDetail, scrollToReviews, toast };
})();
