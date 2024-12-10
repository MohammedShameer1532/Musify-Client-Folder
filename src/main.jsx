import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react'
import RoutesComponent from './RoutesComponent.jsx'

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RoutesComponent />
    </React.StrictMode>

)
