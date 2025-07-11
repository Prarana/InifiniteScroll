import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postsSlice';

const mystore = configureStore({
  reducer: {
    recipes: postsReducer,
  },
});

export default mystore;



// import { configureStore } from '@reduxjs/toolkit';
// import postsReducer from './postsSlice';

// const mystore = configureStore({
//   reducer: {
//     posts: postsReducer,
//   },
// });

// export default mystore;
