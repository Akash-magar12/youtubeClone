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
    videoRemoveResult: (state) => {
      state.searchResult = [];
    },
    emptyQuery: (state) => {
      state.query = "";
    },
  },
});
export default VideoSlice.reducer;
export const {
  toggleSubscribe,
  videoQuery,
  videoSearchResult,
  videoRemoveResult,
  emptyQuery,
} = VideoSlice.actions;
