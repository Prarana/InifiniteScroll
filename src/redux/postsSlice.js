import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const LIMIT = 10;

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (page) => {
    const skip = (page - 1) * LIMIT;
    const response = await fetch(`https://dummyjson.com/recipes?limit=${LIMIT}&skip=${skip}`);
    const data = await response.json();
    return { recipes: data.recipes, total: data.total }; 
  }
);

const postsSlice = createSlice({
  name: 'recipes',
  initialState: {
    items: [],
    page: 1,
    loading: false,
    hasMore: true,
    total: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        const { recipes, total } = action.payload;
        if (recipes.length === 0) {
          state.hasMore = false;
        } else {
          state.items.push(...recipes);
          state.page += 1;
          state.total = total;
          if (state.items.length >= total) {
            state.hasMore = false;
          }
        }
        state.loading = false;
      })
      .addCase(fetchRecipes.rejected, (state) => {
        state.loading = false;
        state.hasMore = false;
      });
  },
});

export default postsSlice.reducer;




// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (page) => {
//   const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
//   return response.data;
// });

// const postsSlice = createSlice({
//   name: 'posts',
//   initialState: {
//     data: [],
//     page: 1,
//     hasMore: true,
//     loading: false,
//   },
//   reducers: {
//     resetPosts: (state) => {
//       state.data = [];
//       state.page = 1;
//       state.hasMore = true;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchPosts.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchPosts.fulfilled, (state, action) => {
//         if (action.payload.length === 0) {
//           state.hasMore = false;
//         } else {
//           state.data.push(...action.payload);
//           state.page += 1;
//         }
//         state.loading = false;
//       })
//       .addCase(fetchPosts.rejected, (state) => {
//         state.loading = false;
//       });
//   },
// });

// export const { resetPosts } = postsSlice.actions;

// export default postsSlice.reducer;