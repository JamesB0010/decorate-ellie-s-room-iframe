import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import {HomePage} from './pages/HomePage.tsx'
import {Login} from './pages/Login.tsx'
import {SignUp} from './pages/SignUp.tsx'
import { GameUi } from './pages/GameUi.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/Login" element={< Login/>} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Game" element={<GameUi />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
