"use client";
import { allProducts } from "@/data/products";
import React, { useEffect } from "react";
import { useContext, useState } from "react";
const dataContext = React.createContext();
export const useContextElement = () => {
  return useContext(dataContext);
};

export default function Context({ children }) {
  const defaultCartImage = "/assets/images/products/product_0.jpg";

  const getImageSrc = (product) => {
    if (!product) return defaultCartImage;
    if (typeof product.imgSrc === "string" && product.imgSrc) return product.imgSrc;
    if (Array.isArray(product.imgSrc) && product.imgSrc[0]) return product.imgSrc[0];
    if (typeof product.image === "string" && product.image) return product.image;
    if (typeof product.thumbnail === "string" && product.thumbnail) return product.thumbnail;
    if (typeof product.img === "string" && product.img) return product.img;
    if (product.other_images && typeof product.other_images === "object") {
      const firstOtherImage = Object.values(product.other_images)[0];
      if (typeof firstOtherImage === "string" && firstOtherImage) return firstOtherImage;
    }
    return defaultCartImage;
  };

  const normalizeCartItem = (item) => ({
    ...item,
    imgSrc: getImageSrc(item),
    price: Number(item?.price) || 0,
    quantity: Number(item?.quantity) > 0 ? Number(item.quantity) : 1,
  });

  const [cartProducts, setCartProducts] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [quickViewItem, setQuickViewItem] = useState(allProducts[0]);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const subtotal = cartProducts.reduce((accumulator, product) => {
      return accumulator + product.quantity * product.price;
    }, 0);
    setTotalPrice(subtotal);
  }, [cartProducts]);

  const addProductToCart = (productOrId) => {
    const incomingProduct =
      productOrId && typeof productOrId === "object" ? productOrId : null;
    const id = incomingProduct ? incomingProduct.id : productOrId;

    if (cartProducts.filter((elm) => elm.id == id)[0]) {
      return;
    }

    const fallbackProduct = allProducts.filter((elm) => elm.id == id)[0];
    const sourceProduct = incomingProduct || fallbackProduct;

    if (!sourceProduct) {
      return;
    }

    const item = normalizeCartItem({
      ...sourceProduct,
      quantity: 1,
    });

    setCartProducts((pre) => [...pre, item]);

    document
      .getElementById("cartDrawerOverlay")
      .classList.add("page-overlay_visible");
    document.getElementById("cartDrawer").classList.add("aside_visible");
  };
  const isAddedToCartProducts = (id) => {
    if (cartProducts.filter((elm) => elm.id == id)[0]) {
      return true;
    }
    return false;
  };

  const toggleWishlist = (id) => {
    if (wishList.includes(id)) {
      setWishList((pre) => [...pre.filter((elm) => elm != id)]);
    } else {
      setWishList((pre) => [...pre, id]);
    }
  };
  const isAddedtoWishlist = (id) => {
    if (wishList.includes(id)) {
      return true;
    }
    return false;
  };
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartList"));
    if (items?.length) {
      setCartProducts(items.map(normalizeCartItem));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cartProducts));
  }, [cartProducts]);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("wishlist"));
    if (items?.length) {
      setWishList(items);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishList));
  }, [wishList]);

  const contextElement = {
    cartProducts,
    setCartProducts,
    totalPrice,
    addProductToCart,
    isAddedToCartProducts,
    toggleWishlist,
    isAddedtoWishlist,
    quickViewItem,
    wishList,
    setQuickViewItem,
  };
  return (
    <dataContext.Provider value={contextElement}>
      {children}
    </dataContext.Provider>
  );
}
