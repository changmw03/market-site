window.ShopCart = (() => {
  function add(productId) {
    const product = ShopStore.getProduct(productId);

    if (!product || product.stock === 0) {
      ShopRender.toast("현재 구매할 수 없는 상품입니다.");
      return;
    }

    const currentQuantity = ShopStore.state.cart[productId] || 0;
    ShopStore.state.cart[productId] = Math.min(currentQuantity + 1, product.stock);
    ShopStore.save();
    ShopRender.renderAll();
    ShopRender.toast("장바구니에 담았습니다.");
  }

  function setQuantity(productId, quantity) {
    const product = ShopStore.getProduct(productId);

    if (!product) {
      return;
    }

    if (quantity <= 0) {
      delete ShopStore.state.cart[productId];
    } else {
      ShopStore.state.cart[productId] = Math.min(quantity, product.stock);
    }

    ShopStore.save();
    ShopRender.renderAll();
  }

  function toggleWishlist(productId) {
    if (ShopStore.state.wishlist.has(productId)) {
      ShopStore.state.wishlist.delete(productId);
      ShopRender.toast("찜 목록에서 제거했습니다.");
    } else {
      ShopStore.state.wishlist.add(productId);
      ShopRender.toast("찜 목록에 추가했습니다.");
    }

    ShopStore.save();
    ShopRender.renderAll();
  }

  function toggleCompare(productId) {
    if (ShopStore.state.compare.has(productId)) {
      ShopStore.state.compare.delete(productId);
      ShopRender.toast("비교 목록에서 제거했습니다.");
    } else {
      if (ShopStore.state.compare.size >= 3) {
        ShopRender.toast("비교는 최대 3개까지 가능합니다.");
        return;
      }
      ShopStore.state.compare.add(productId);
      ShopRender.toast("비교 목록에 추가했습니다.");
    }

    ShopStore.save();
    ShopRender.renderAll();
  }

  function togglePriceAlert(productId) {
    if (ShopStore.state.priceAlerts.has(productId)) {
      ShopStore.state.priceAlerts.delete(productId);
      ShopRender.toast("가격 알림을 해제했습니다.");
    } else {
      ShopStore.state.priceAlerts.add(productId);
      ShopRender.toast("가격 알림을 설정했습니다.");
    }

    ShopStore.save();
    ShopRender.renderAll();
  }

  function getCartLines() {
    return Object.entries(ShopStore.state.cart)
      .map(([id, quantity]) => ({ product: ShopStore.getProduct(id), quantity }))
      .filter((line) => line.product);
  }

  function getSummary() {
    const originalSubtotal = getCartLines().reduce((sum, line) => sum + line.product.originalPrice * line.quantity, 0);
    const subtotal = getCartLines().reduce((sum, line) => sum + line.product.price * line.quantity, 0);
    const productDiscount = originalSubtotal - subtotal;
    const baseShipping = subtotal === 0 || subtotal >= 50000 ? 0 : 3000;
    const deliveryExtra = ShopStore.state.delivery === "express" && subtotal > 0 ? 3000 : 0;
    const shipping = ShopStore.state.delivery === "pickup" ? 0 : baseShipping + deliveryExtra;
    const couponDiscount = ShopStore.state.couponApplied ? Math.round(subtotal * 0.1) : 0;
    const discount = productDiscount + couponDiscount;
    const total = Math.max(0, subtotal + shipping - couponDiscount);

    return { originalSubtotal, subtotal, productDiscount, couponDiscount, shipping, discount, total };
  }

  function clearCart() {
    ShopStore.state.cart = {};
    ShopStore.save();
    ShopRender.renderAll();
    ShopRender.toast("장바구니를 비웠습니다.");
  }

  return { add, setQuantity, toggleWishlist, toggleCompare, togglePriceAlert, clearCart, getCartLines, getSummary };
})();
