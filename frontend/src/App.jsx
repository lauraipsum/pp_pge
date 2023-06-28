import { Routes, Route } from 'react-router-dom'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './App.css';
import Usuario from './pages/Usuario';
import Processos from './pages/Processos';


function App() {

  return (

          <Routes>
              <Route path="/*" element={<Usuario />} />
              <Route path="/processos" element={<Processos />} />

              

          </Routes>

  )
}

export default App
