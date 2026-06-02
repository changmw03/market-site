window.ShopReviews = (() => {
  const storageKey = "trendmart-reviews";
  const savedReviews = JSON.parse(localStorage.getItem(storageKey) || "{}");

  function save() {
    localStorage.setItem(storageKey, JSON.stringify(savedReviews));
  }

  function getReviews(productId) {
    return savedReviews[productId] || [];
  }

  function getStats(product) {
    const userReviews = getReviews(product.id);
    const totalCount = product.reviews + userReviews.length;
    const userRatingTotal = userReviews.reduce((sum, review) => sum + review.rating, 0);
    const rating = totalCount === 0
      ? product.rating
      : ((product.rating * product.reviews) + userRatingTotal) / totalCount;

    return {
      rating: Number(rating.toFixed(1)),
      count: totalCount,
      userCount: userReviews.length
    };
  }

  function addReview(productId, review) {
    const nextReview = {
      id: `RV-${Date.now()}`,
      rating: Number(review.rating),
      name: review.name.trim() || "익명",
      body: review.body.trim(),
      createdAt: new Date().toLocaleDateString("ko-KR")
    };

    savedReviews[productId] = [nextReview, ...getReviews(productId)].slice(0, 20);
    save();
    return nextReview;
  }

  return { getReviews, getStats, addReview };
})();
