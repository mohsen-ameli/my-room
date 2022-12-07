import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import App from './App.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Suspense fallback={<span>loading...</span>}>
    <App />
  </Suspense>
)