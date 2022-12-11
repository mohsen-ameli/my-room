import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import App from './App.jsx'
import { ClimbingBoxLoader } from 'react-spinners'

const CallBack = () => {
  return <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
    <ClimbingBoxLoader
      size={30}
      color="#FFA500"
      cssOverride={{marginLeft: "1.5rem"}}
      speedMultiplier={1.5}
    />
    <h1 className="font-serif pt-2">Loading your experience!</h1>
  </div> 
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Suspense fallback={<CallBack />}>
    <App />
  </Suspense>
)