import React, { Suspense } from "react"
import ReactDOM from "react-dom/client"
import "./style.css"
import App from "./App.jsx"
import Loader from "./Loader"
import { Analytics } from "@vercel/analytics/react"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <>
    <Suspense fallback={<Loader />}>
      <App />
    </Suspense>
    <Analytics />
  </>
)
