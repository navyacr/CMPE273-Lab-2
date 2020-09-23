import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Main from './components/Main';

function App() {
  return (
    <Provider store={store}>
      <div>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </div>
    </Provider>
  );
}
// Export the App component so that it can be used in index.js
export default App;
