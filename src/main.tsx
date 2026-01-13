import React from 'react'
import './index.css' 
import { createRoot } from 'react-dom/client'
import { router } from './Router/Router.tsx'
import { RouterProvider } from 'react-router'
import { Provider } from 'react-redux'
import { store } from './redux/Store.ts'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
