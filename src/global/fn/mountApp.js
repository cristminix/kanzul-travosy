import React from "react"
import ReactDOM from "react-dom/client"
export const mountApp = (app)=>{
    ReactDOM.createRoot(document.getElementById("root")).render(app)
}