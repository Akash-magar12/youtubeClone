import { createSlice } from "@reduxjs/toolkit";

const MenuToggleSlice = createSlice({
  name: "menuToggle",
  initialState: {
    isMenuOpen: true,
    search: true,
  },
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    showSearchBar: (state) => {
      state.search = false;
    },
    hideSearchBar: (state) => {
      state.search = true;
    },
  },
});
export const { toggleMenu, hideSearchBar, showSearchBar } = MenuToggleSlice.actions;
export default MenuToggleSlice.reducer;
