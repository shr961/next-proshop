import { createSlice } from "@reduxjs/toolkit";

const proshopUser =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("proshop-user"))
    : null;

const setLocalData = (data) => {
  localStorage.setItem("proshop-user", JSON.stringify(data));
};

const removeLocalData = () => {
  localStorage.removeItem("proshop-user");
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: proshopUser?.isLoggedIn || false,
    rememberMe: proshopUser?.rememberMe || false,
    userData: proshopUser?.userData || null,
  },
  reducers: {
    loginUser: (state, action) => {
      const newState = {
        isLoggedIn: true,
        rememberMe: action.payload.rememberMe,
        userData: action.payload.userData,
      };

      setLocalData(newState);

      return newState;
    },

    logoutUser: () => {
      removeLocalData();

      return {
        isLoggedIn: false,
        rememberMe: false,
        userData: null,
      };
    },

    updateAccessToken: (state, action) => {
      const newState = {
        ...state,
        userData: {
          ...state.userData,
          accessToken: action.payload.accessToken,
        },
      };

      setLocalData(newState);

      return newState;
    },

    updateUserData: (state, action) => {
      const newState = {
        ...state,
        userData: { ...state.userData, ...action.payload },
      };

      setLocalData(newState);

      return newState;
    },
  },
});

export const { loginUser, logoutUser, updateAccessToken, updateUserData } =
  userSlice.actions;

export default userSlice;
