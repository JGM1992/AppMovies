import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import DetallePelicula from './detallePelicula';
import Home from './home'
import { logout } from '../redux/userSlice'
import { useDispatch } from "react-redux"

function MENU() {
    const usuario = localStorage.getItem("nombre")
    const apellidos = localStorage.getItem("apellidos")
    const dispatch = useDispatch()
    const cerrarS = (e) => {
        e.preventDefault()

        dispatch(logout())
    }

    return (
        <>
            <Router>
                <nav className="navbar navbar-dark bg-dark">
                    <Link className="nav-link" to="/">Home</Link>
                    <span className="text-white h4">bienvenido {usuario + " " + apellidos}</span>
                    <Link className="nav-link" onClick={(e) => cerrarS(e)}>Cerrar sesión</Link>
                </nav>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/detallePelicula/:id">
                        <DetallePelicula />
                    </Route>
                </Switch>
            </Router>
        </>
    )
}

export default MENU
