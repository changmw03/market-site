const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");
const sortSelect = document.querySelector("#sortSelect");
const brandSelect = document.querySelector("#brandSelect");
const priceRange = document.querySelector("#priceRange");
const stockOnly = document.querySelector("#stockOnly");
const resetFilters = document.querySelector("#resetFilters");
const cartDrawer = document.querySelector("#cartDrawer");
const cartButton = document.querySelector("#cartButton");
const wishlistButton = document.querySelector("#wishlistButton");
const closeCart = document.querySelector("#closeCart");
const drawerBackdrop = document.querySelector("#drawerBackdrop");
const couponInput = document.querySelector("#couponInput");
const applyCoupon = document.querySelector("#applyCoupon");
const deliverySelect = document.querySelector("#deliverySelect");
const placeOrder = document.querySelector("#placeOrder");
const copyCoupon = document.querySelector("#copyCoupon");
const clearCart = document.querySelector("#clearCart");
const clearCompare = document.querySelector("#clearCompare");
const clearRecent = document.querySelector("#clearRecent");
const clearOrders = document.querySelector("#clearOrders");
const clearAlerts = document.querySelector("#clearAlerts");
let pendingRenderFrame = 0;

function scheduleRenderAll() {
  window.cancelAnimationFrame(pendingRenderFrame);
  pendingRenderFrame = window.requestAnimationFrame(() => {
    pendingRenderFrame = 0;
    ShopRender.renderAll();
  });
}

function openCart() {
  cartDrawer.classList.add("open");
  drawerBackdrop.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
  drawerBackdrop.setAttribute("aria-hidden", "false");
}

function closeCartDrawer() {
  cartDrawer.classList.remove("open");
  drawerBackdrop.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
  drawerBackdrop.setAttribute("aria-hidden", "true");
}

function setActiveView(view, options = {}) {
  document.querySelectorAll("[data-page]").forEach((page) => {
    page.classList.toggle("active", page.dataset.page === view);
  });

  document.querySelectorAll(".nav-link").forEach((button) => {
    button.classList.toggle("active", button.dataset.viewLink === view);
  });

  closeCartDrawer();
  if (options.scrollTarget) {
    document.querySelector(options.scrollTarget)?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  if (options.preserveScroll) {
    return;
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function resetAllFilters() {
  ShopStore.state.query = "";
  ShopStore.state.category = "all";
  ShopStore.state.brand = "all";
  ShopStore.state.sort = "featured";
  ShopStore.state.stockOnly = false;
  ShopStore.state.wishlistOnly = false;
  ShopStore.state.maxPrice = 600000;
  searchInput.value = "";
  sortSelect.value = "featured";
  brandSelect.value = "all";
  priceRange.value = "600000";
  stockOnly.checked = false;
  ShopRender.renderAll();
}

function clearFocusedFilters() {
  ShopStore.state.query = "";
  ShopStore.state.brand = "all";
  ShopStore.state.wishlistOnly = false;
  searchInput.value = "";
  brandSelect.value = "all";
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  ShopStore.state.query = searchInput.value;
  ShopRender.renderAll();
});

sortSelect.addEventListener("change", () => {
  ShopStore.state.sort = sortSelect.value;
  ShopRender.renderAll();
});

brandSelect.addEventListener("change", () => {
  ShopStore.state.brand = brandSelect.value;
  ShopRender.renderAll();
});

priceRange.addEventListener("input", () => {
  ShopStore.state.maxPrice = Number(priceRange.value);
  scheduleRenderAll();
});

stockOnly.addEventListener("change", () => {
  ShopStore.state.stockOnly = stockOnly.checked;
  ShopRender.renderAll();
});

resetFilters.addEventListener("click", resetAllFilters);

cartButton.addEventListener("click", openCart);
wishlistButton.addEventListener("click", () => {
  ShopStore.state.wishlistOnly = !ShopStore.state.wishlistOnly;
  ShopRender.renderAll();
  setActiveView("products");
  ShopRender.toast(ShopStore.state.wishlistOnly ? "찜한 상품만 표시합니다." : "전체 상품을 표시합니다.");
});
closeCart.addEventListener("click", closeCartDrawer);
drawerBackdrop.addEventListener("click", closeCartDrawer);

applyCoupon.addEventListener("click", () => {
  if (couponInput.value.trim().toUpperCase() !== "SAVE10") {
    ShopRender.toast("사용 가능한 쿠폰은 SAVE10입니다.");
    return;
  }

  ShopStore.state.couponApplied = true;
  ShopRender.renderAll();
  ShopRender.toast("10% 쿠폰이 적용되었습니다.");
});

deliverySelect.addEventListener("change", () => {
  ShopStore.state.delivery = deliverySelect.value;
  ShopRender.renderAll();
});

placeOrder.addEventListener("click", () => {
  if (ShopCart.getCartLines().length === 0) {
    ShopRender.toast("장바구니가 비어 있습니다.");
    return;
  }

  const summary = ShopCart.getSummary();
  const itemCount = ShopCart.getCartLines().reduce((sum, line) => sum + line.quantity, 0);
  ShopStore.state.orders = [
    {
      id: `TM-${Date.now().toString().slice(-6)}`,
      count: itemCount,
      total: summary.total,
      createdAt: new Date().toLocaleString("ko-KR")
    },
    ...ShopStore.state.orders
  ].slice(0, 5);
  ShopStore.state.cart = {};
  ShopStore.state.couponApplied = false;
  couponInput.value = "";
  ShopStore.save();
  ShopRender.renderAll();
  closeCartDrawer();
  ShopRender.toast("주문이 완료되었습니다.");
});

copyCoupon.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText("SAVE10");
    ShopRender.toast("쿠폰 코드가 복사되었습니다.");
  } catch {
    ShopRender.toast("쿠폰 코드는 SAVE10입니다.");
  }
});

clearCart.addEventListener("click", ShopCart.clearCart);

clearCompare.addEventListener("click", () => {
  ShopStore.state.compare.clear();
  ShopStore.save();
  ShopRender.renderAll();
  ShopRender.toast("비교 목록을 비웠습니다.");
});

clearAlerts.addEventListener("click", () => {
  ShopStore.state.priceAlerts.clear();
  ShopStore.save();
  ShopRender.renderAll();
  ShopRender.toast("가격 알림을 모두 비웠습니다.");
});

clearRecent.addEventListener("click", () => {
  ShopStore.state.recent = [];
  ShopStore.save();
  ShopRender.renderAll();
  ShopRender.toast("최근 본 상품 기록을 지웠습니다.");
});

clearOrders.addEventListener("click", () => {
  ShopStore.state.orders = [];
  ShopStore.save();
  ShopRender.renderAll();
  ShopRender.toast("주문 내역을 지웠습니다.");
});

document.addEventListener("click", (event) => {
  const categoryButton = event.target.closest("[data-category]");
  const trendButton = event.target.closest("[data-trend]");
  const addButton = event.target.closest("[data-add]");
  const wishlistProductButton = event.target.closest("[data-wishlist]");
  const compareButton = event.target.closest("[data-compare]");
  const priceAlertButton = event.target.closest("[data-price-alert]");
  const quantityButton = event.target.closest("[data-qty]");
  const removeButton = event.target.closest("[data-remove]");
  const detailButton = event.target.closest("[data-detail]");
  const detailClose = event.target.closest("[data-close-detail]");
  const reviewLink = event.target.closest("[data-open-reviews]");
  const viewLink = event.target.closest("[data-view-link]");

  if (categoryButton) {
    clearFocusedFilters();
    ShopStore.state.category = categoryButton.dataset.category;
    ShopRender.renderAll();
    setActiveView("products", { scrollTarget: ".catalog-section" });
    return;
  }

  if (trendButton) {
    ShopStore.state.category = "all";
    ShopStore.state.brand = "all";
    ShopStore.state.wishlistOnly = false;
    ShopStore.state.query = trendButton.dataset.trend;
    searchInput.value = trendButton.dataset.trend;
    brandSelect.value = "all";
    ShopRender.renderAll();
    setActiveView("products", { scrollTarget: ".catalog-section" });
    return;
  }

  if (addButton) {
    ShopCart.add(addButton.dataset.add);
    return;
  }

  if (wishlistProductButton) {
    ShopCart.toggleWishlist(wishlistProductButton.dataset.wishlist);
    return;
  }

  if (compareButton) {
    ShopCart.toggleCompare(compareButton.dataset.compare);
    setActiveView("products", { scrollTarget: ".compare-panel" });
    return;
  }

  if (priceAlertButton) {
    ShopCart.togglePriceAlert(priceAlertButton.dataset.priceAlert);
    setActiveView("products", { scrollTarget: ".alert-panel" });
    return;
  }

  if (quantityButton) {
    const current = ShopStore.state.cart[quantityButton.dataset.qty] || 0;
    ShopCart.setQuantity(quantityButton.dataset.qty, current + Number(quantityButton.dataset.delta));
    return;
  }

  if (removeButton) {
    ShopCart.setQuantity(removeButton.dataset.remove, 0);
    return;
  }

  if (detailButton) {
    ShopRender.openDetail(detailButton.dataset.detail, { openReviews: Boolean(detailButton.dataset.openReviews) });
    return;
  }

  if (reviewLink) {
    ShopRender.scrollToReviews();
    return;
  }

  if (detailClose || event.target.id === "detailModal") {
    ShopRender.closeDetail();
    return;
  }

  if (viewLink) {
    event.preventDefault();
    setActiveView(viewLink.dataset.viewLink);
  }
});

document.addEventListener("submit", (event) => {
  if (event.target.id !== "reviewForm") {
    return;
  }

  event.preventDefault();
  const reviewSection = document.querySelector("[data-review-product]");
  const reviewBody = document.querySelector("#reviewBody").value.trim();
  const reviewRating = document.querySelector("input[name='reviewRating']:checked")?.value || "5";
  const reviewName = document.querySelector("#reviewName").value;

  if (!reviewBody) {
    ShopRender.toast("리뷰 내용을 입력해주세요.");
    return;
  }

  ShopReviews.addReview(reviewSection.dataset.reviewProduct, {
    rating: reviewRating,
    name: reviewName,
    body: reviewBody
  });
  ShopRender.openDetail(reviewSection.dataset.reviewProduct, { openReviews: true });
  ShopRender.renderAll();
  ShopRender.toast("리뷰가 등록되었습니다.");
});

ShopRender.renderAll();
