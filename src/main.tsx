import React from 'react'
import './index.css' 
import { createRoot } from 'react-dom/client'
import { router } from './Router/Router.tsx'
import { RouterProvider } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
