import React, { Suspense } from "react"
import ReactDOM from "react-dom/client"
import "./style.css"
import Loader from "./Loader"
import { Analytics } from "@vercel/analytics/react"
import Experience from "./Experience.jsx"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <>
    <Suspense fallback={<Loader />}>
      <Experience />
    </Suspense>
    <Analytics />
  </>
)
