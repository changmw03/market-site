window.ShopStore = (() => {
  const savedCart = JSON.parse(localStorage.getItem("trendmart-cart") || "{}");
  const savedWishlist = JSON.parse(localStorage.getItem("trendmart-wishlist") || "[]");
  const savedCompare = JSON.parse(localStorage.getItem("trendmart-compare") || "[]");
  const savedRecent = JSON.parse(localStorage.getItem("trendmart-recent") || "[]");
  const savedAlerts = JSON.parse(localStorage.getItem("trendmart-alerts") || "[]");
  const savedOrders = JSON.parse(localStorage.getItem("trendmart-orders") || "[]");

  const state = {
    query: "",
    category: "all",
    brand: "all",
    sort: "featured",
    stockOnly: false,
    wishlistOnly: false,
    maxPrice: 600000,
    delivery: "standard",
    cart: savedCart,
    wishlist: new Set(savedWishlist),
    compare: new Set(savedCompare),
    recent: savedRecent,
    priceAlerts: new Set(savedAlerts),
    orders: savedOrders,
    couponApplied: false
  };

  function save() {
    localStorage.setItem("trendmart-cart", JSON.stringify(state.cart));
    localStorage.setItem("trendmart-wishlist", JSON.stringify([...state.wishlist]));
    localStorage.setItem("trendmart-compare", JSON.stringify([...state.compare]));
    localStorage.setItem("trendmart-recent", JSON.stringify(state.recent));
    localStorage.setItem("trendmart-alerts", JSON.stringify([...state.priceAlerts]));
    localStorage.setItem("trendmart-orders", JSON.stringify(state.orders));
  }

  function getProduct(id) {
    return ShopData.products.find((product) => product.id === id);
  }

  function formatCurrency(value) {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      maximumFractionDigits: 0
    }).format(value);
  }

  function rememberProduct(id) {
    state.recent = [id, ...state.recent.filter((recentId) => recentId !== id)].slice(0, 6);
    save();
  }

  return { state, save, getProduct, formatCurrency, rememberProduct };
})();
