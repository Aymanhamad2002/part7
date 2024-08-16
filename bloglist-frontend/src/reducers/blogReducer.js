import { createSlice } from "@reduxjs/toolkit";
import blogs from "../services/blogs";


const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    createBlogs(state, action) {
      return [...state, action.payload];
    },
    clearBlog(state, action) {
      const id = action.payload;
      return state.filter(  blog  => blog.id !== id );
    },
    updateBlog(state, action) {
      const id = action.payload.id;
      const updatedBlog = action.payload.updatedBlog;

      return state.map((blog) => (blog.id === id ? updatedBlog : blog));
    },
  },
});
export const { setBlogs,createBlogs, createReducer,updateBlog,clearBlog } = blogSlice.actions;
export default blogSlice.reducer;
export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogsList = await blogs.getAll();
    dispatch(setBlogs(blogsList));
  };
};
export const addBlogs = (Blog) => {
  return async (dispatch) => {
    const newBlog = await blogs.create(Blog);
    dispatch(createBlogs(newBlog));
  };
};
export const removeBlog = (BlogId) => {
  return async (dispatch) => {
    await blogs.removeBlogs(BlogId);
    dispatch(clearBlog(BlogId));
  };
};
export const likeBlog = (newBlog) => {
  return async (dispatch) => {
    const updatedBlog = await blogs.updateLikes(newBlog);
    dispatch(updateBlog({ updatedBlog, id: newBlog.id }));
  };

};
export const makeComment = (id,comment) => {
  return async (dispatch) => {
    const updatedBlog = await blogs.addComment(comment,id)
    dispatch(updateBlog({updatedBlog,id}))
  }
}
