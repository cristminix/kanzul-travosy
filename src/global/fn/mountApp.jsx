import React from "react"
import ReactDOM from "react-dom/client"
import { store } from '@/global/store'
import { Provider } from 'react-redux'
export const mountApp = (app)=>{
    ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        {app}
    </Provider>)
}