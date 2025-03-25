import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider as ChakraProvider} from './components/ui/provider'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './Redux/store'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <HashRouter>
    <ChakraProvider>
    <App />
    </ChakraProvider>
    </HashRouter>
    </Provider>
  </StrictMode>,
)
