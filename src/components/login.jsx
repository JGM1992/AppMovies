import React, { useState, useEffect } from 'react'
import { APIURL } from '../services/apiUrl';
import Axios from 'axios';
import { login } from '../redux/userSlice'
import { useDispatch } from "react-redux"

function Login() {
    const [usuario, setUsuario] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const dispatch = useDispatch();
    // useEffect(() => {
    //     localStorage.clear();
    // }, [])

    const evaluaSubmit = (e) => {
        e.preventDefault()
        setError(null)
        if (!usuario.trim()) {
            setError('El campo nombre no puede estar vacio')
            return
        }
        if (!password.trim()) {
            setError('El contraseña nombre no puede estar vacio')
            return
        }
    }

    const escribeNombre = (e) => {
        setError(null)
        setUsuario(e.target.value)
    }

    const escribePassword = (e) => {
        setError(null)
        setPassword(e.target.value)
    }

    function manejadorBoton() {
        let url = APIURL + "auth/login";

        Axios.post(url, {
            "username": usuario,
            "password": password
        })
            .then(response => {
                if (response.status === 201) {
                    localStorage.setItem("nombre", response.data.data.user.firstName)
                    localStorage.setItem("apellidos", response.data.data.user.lastName)
                    localStorage.setItem("email", response.data.data.user.email)
                    localStorage.setItem("token", response.data.data.payload.token)
                    dispatch(
                        login({
                            name: usuario,
                            password: password,
                            loggedIn: true,
                        })
                    )
                } else {
                    console.log("Usuario o contraseña incorrectos")
                }
            })
            .catch(error => {
                setError("Usuario o contraseña incorrectos")
            })
        setUsuario("")
        setPassword("")

    }

    return (
        <div className="container">
            <div className="rows-cols-2">
                <div className="col">
                    <h2>Login</h2>
                </div>
                <div className="col">
                    <div className="loguin">

                        <form className="form-group" onSubmit={evaluaSubmit}>
                            <input type="text" className="form-control"
                                placeholder="Usuario" name="usuario"
                                onChange={escribeNombre} value={usuario} />
                            <input type="password" className="form-control"
                                placeholder="Contraseña" name="password"
                                onChange={escribePassword} value={password} />
                            <button type="submit" className="btn btn-success btn-block" onClick={manejadorBoton} >Acceder</button>
                        </form>
                        {
                            error != null ? (
                                <span className="alert alert-danger">{error}</span>
                            ) : (
                                <></>
                            )
                        }
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Login
