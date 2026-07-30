import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import { store } from './app/store.js'
import {Provider} from "react-redux"
import { Toaster } from './components/ui/sonner'
import { setUpInterceptors } from './api/api.js'
import { resetCredentials } from "@/features/auth/authSlice.js";

setUpInterceptors(store, resetCredentials); //intercepts every response and check and renew tokens

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <App/>
      <Toaster />
    </Provider>
  </BrowserRouter>
)
