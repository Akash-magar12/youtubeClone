import { configureStore } from "@reduxjs/toolkit";
import MenuSlice from "../reducers/MenuToggleSlice";
import VideoSlice from "../reducers/VideoSlice";
const store = configureStore({
  reducer: {
    menuToggle: MenuSlice,
    video: VideoSlice,
  },
});

export default store;
