import React from 'react';
import { Provider } from 'react-redux';
import mystore from './src/redux/mystore';
import PostList from './src/components/PostList';

const App = () => {
  return (
    <Provider store={mystore}>
      <PostList />
    </Provider>
  );
};

export default App;
