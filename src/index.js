import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import Dis from './App'
import {BrowserRouter} from 'react-router-dom'
import UserProvider from './context';

ReactDOM.createRoot(document.querySelector("#root")).render(
  <div>
    <BrowserRouter>
      <UserProvider>
        <Dis />
      </UserProvider>
    </BrowserRouter>
  </div>
)