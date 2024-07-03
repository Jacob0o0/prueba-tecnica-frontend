import {React} from 'react';
import {BrowserRouter, Route, Routes, Link} from "react-router-dom";

// =============== STYLE ==============
import './styles/index.css';

// 
import Navbar       from './components/Navbar';
import Home         from './components/Home';
import Admin        from './components/Admin';
import Form         from './components/Form';
import Update       from './components/Update';
import Publicacion  from './components/Publicacion';

// Componentes de la pantalla de juego
import HomeScreen   from './components/Game/HomeScreen';
import Game         from './components/Game/Game';

const App = () => {

    return(
        <BrowserRouter>
            <Navbar></Navbar>

            <Routes>
                <Route path="/"                 element={<Home/>}>          </Route>
                <Route path="/admin_contenidos" element={<Admin/>}>         </Route>
                <Route path="/contenido/:id"    element={<Admin/>}>         </Route>
                <Route path="/formulario/:id"   element={<Update/>}>        </Route>
                <Route path="/formulario"       element={<Form/>}>          </Route>
                <Route path="/publicacion/:id"  element={<Publicacion/>}>   </Route>

                <Route path="/videogame"        element={<HomeScreen/>}>    </Route>
                <Route path="/videogame/play"   element={<Game/>}>          </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App