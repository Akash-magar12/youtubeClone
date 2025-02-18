import { createSlice } from "@reduxjs/toolkit";

const VideoSlice = createSlice({
  name: "video",
  initialState: {
    value: true,
    query: "",
    searchResult: [],
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
    videoSearchResult: (state, action) => {
      state.searchResult = action.payload;
    },
  },
});
export default VideoSlice.reducer;
export const { toggleSubscribe, videoQuery, videoSearchResult } =
  VideoSlice.actions;
