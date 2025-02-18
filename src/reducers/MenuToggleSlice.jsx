import { createSlice } from "@reduxjs/toolkit";

const MenuToggleSlice = createSlice({
  name: "menuToggle",
  initialState: {
    isMenuOpen: true,
  },
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
  },
});
export const { toggleMenu } = MenuToggleSlice.actions;
export default MenuToggleSlice.reducer;
