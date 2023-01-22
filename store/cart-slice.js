import { createSlice } from "@reduxjs/toolkit";

const proshopCart =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("proshop-cart"))
    : null;

const setLocalData = (data) => {
  localStorage.setItem("proshop-cart", JSON.stringify(data));
};

const removeLocalData = () => {
  localStorage.removeItem("proshop-cart");
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartOwner: proshopCart?.cartOwner || "",
    cartItems: proshopCart?.cartItems || [],
    shippingAddress: proshopCart?.shippingAddress || {
      address: "",
      city: "",
      postalCode: "",
      plaque: "",
      notes: "",
    },
    paymentMethod: proshopCart?.paymentMethod || "ZarinPal",
    cartTotalPrice: proshopCart?.cartTotalPrice || 0,
    cartDiscountPrice: proshopCart?.cartDiscountPrice || 0,
    shippingPrice: proshopCart?.shippingPrice || 0,
    orderPrice: proshopCart?.orderPrice || 0,
  },
  reducers: {
    resetCart: () => {
      const cart = {
        cartItems: [],
        cartOwner: "",
        paymentMethod: "ZarinPal",
        shippingAddress: {
          address: "",
          city: "",
          postalCode: "",
          plaque: "",
          notes: "",
        },
        cartDiscountPrice: 0,
        cartTotalPrice: 0,
        shippingPrice: 0,
        orderPrice: 0,
      };

      removeLocalData();
    },

    cleanCart: (state) => {
      const newState = {
        ...state,
        cartItems: [],
        cartTotalPrice: 0,
        cartDiscountPrice: 0,
        orderPrice: 0,
        shippingPrice: 0,
      };

      setLocalData(newState);

      return newState;
    },

    addItemToCart: (state, action) => {
      const item = action.payload;
      const itemInCart = state.cartItems.find((c) => c._id === item._id);

      let newState;

      if (itemInCart) {
        newState = {
          ...state,
          cartItems: state.cartItems.map((c) =>
            c._id === item._id ? item : c
          ),
        };
      } else {
        newState = { ...state, cartItems: [...state.cartItems, item] };
      }

      setLocalData(newState);

      return newState;
    },

    removeItemFromCart: (state, action) => {
      const itemId = action.payload;
      const newState = {
        ...state,
        cartItems: state.cartItems.filter((c) => c._id !== itemId),
      };
      setLocalData(newState);

      return newState;
    },

    updateCartItemQty: (state, action) => {
      const { qty, itemId } = action.payload;
      const item = state.cartItems.find((c) => c._id === itemId);

      if (item) {
        const newItem = { ...item, qty };

        const newState = {
          ...state,
          cartItems: state.cartItems.map((c) =>
            c._id === itemId ? newItem : c
          ),
        };

        setLocalData(newState);

        return newState;
      }

      return state;
    },

    setCartOwner: (state, action) => {
      const newState = { ...state, cartOwner: action.payload };
      setLocalData(newState);

      return newState;
    },

    saveShippingAddress: (state, action) => {
      const newState = {
        ...state,
        shippingAddress: action.payload,
      };
      setLocalData(newState);

      return newState;
    },

    savePaymentMethod: (state, action) => {
      const newState = {
        ...state,
        paymentMethod: action.payload,
      };
      setLocalData(newState);

      return newState;
    },

    saveCartPrices: (state, action) => {
      const newState = {
        ...state,
        cartTotalPrice: action.payload.cartTotalPrice ?? state.cartTotalPrice,
        cartDiscountPrice:
          action.payload.cartDiscountPrice ?? state.cartDiscountPrice,
        shippingPrice: action.payload.shippingPrice ?? state.shippingPrice,
        orderPrice: action.payload.orderPrice ?? state.orderPrice,
      };
      setLocalData(newState);

      return newState;
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  updateCartItemQty,
  saveCartInLocalStorage,
  removeCartFromLocalStorage,
  setCartOwner,
  saveShippingAddress,
  savePaymentMethod,
  resetCartDetails,
  saveCartPrices,
  cleanCart,
} = cartSlice.actions;

export default cartSlice;
