import { createSlice } from "@reduxjs/toolkit";

const VideoSlice = createSlice({
  name: "video",
  initialState: {
    value: true,
    query: "",
  },
  reducers: {
    toggleSubscribe: (state) => {
      state.value = !state.value;
    },
    videoHome: (state, action) => {
      state.allVideo = action.payload;
    },
    videoQuery: (state, action) => {
      state.query = action.payload;
    },
  },
});
export default VideoSlice.reducer;
export const { toggleSubscribe, videoQuery } = VideoSlice.actions;
