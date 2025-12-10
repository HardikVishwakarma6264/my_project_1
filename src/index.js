


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer/indexx'; // ✅ Make sure the path is correct
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from "@react-oauth/google";

// Create Redux Store
const store = configureStore({
  reducer: rootReducer,
});

// ✅ Your Google OAuth Client ID (from Google Cloud Console)
const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        {/* ✅ Wrap App with GoogleOAuthProvider */}
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <App />
          <Toaster />
        </GoogleOAuthProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
