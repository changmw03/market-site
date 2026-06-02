window.ShopFilters = (() => {
  function normalize(value) {
    return value.trim().toLowerCase();
  }

  function matchesQuery(product, query) {
    const cleanQuery = normalize(query);

    if (!cleanQuery) {
      return true;
    }

    const searchText = [
      product.name,
      product.brand,
      product.category,
      product.description,
      product.tags.join(" ")
    ].join(" ").toLowerCase();

    return searchText.includes(cleanQuery);
  }

  function getFilteredProducts() {
    const { state } = ShopStore;

    return ShopData.products
      .filter((product) => state.category === "all" || product.category === state.category)
      .filter((product) => state.brand === "all" || product.brand === state.brand)
      .filter((product) => product.price <= state.maxPrice)
      .filter((product) => !state.stockOnly || product.stock > 0)
      .filter((product) => !state.wishlistOnly || state.wishlist.has(product.id))
      .filter((product) => matchesQuery(product, state.query))
      .sort((a, b) => {
        if (state.sort === "price-low") return a.price - b.price;
        if (state.sort === "price-high") return b.price - a.price;
        if (state.sort === "rating") return b.rating - a.rating;
        if (state.sort === "discount") return getDiscount(b) - getDiscount(a);
        return (b.originalPrice - b.price) - (a.originalPrice - a.price);
      });
  }

  function getDiscount(product) {
    return Math.round((1 - product.price / product.originalPrice) * 100);
  }

  function getDealProducts(limit) {
    const deals = [...ShopData.products]
      .sort((a, b) => getDiscount(b) - getDiscount(a));

    return typeof limit === "number" ? deals.slice(0, limit) : deals;
  }

  return { getFilteredProducts, getDealProducts, getDiscount };
})();
