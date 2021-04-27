import React, { useEffect, useState } from 'react'
import { APIURL } from '../services/apiUrl';
import Axios from 'axios';
import { Container, Row, Carousel, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'

export default function Home() {

    const token = localStorage.getItem("token")
    const [user, setUser] = useState([])
    const [didMount, setDidMount] = useState(false);
    const [estrenos, setEstrenos] = useState([])
    const [populares, setPopulares] = useState([])

    async function generateToken() {
        let url = APIURL + "auth/refresh";

        await Axios.post(url, {
            "refresh_token": token
        })
            .then(response => {
                console.log(response);
                if (response.status === 201) {
                    localStorage.setItem("type", response.data.data.payload.type)
                    localStorage.setItem("refresh_token", response.data.data.payload.token)
                } else {
                    console.log("Entre en else")
                }
            })
            .catch(error => {
                console.log("No es posible conectar a la API")
            })
    }
    let refresh_token = localStorage.getItem("refresh_token")
    let type = localStorage.getItem("type")
    //console.log(type + " " + refresh_token)

    async function getUsuario() {
        let url = APIURL + "user/me";

        try {
            await Axios.get(url, { headers: { Authorization: `bearer ${token}` } })
                .then(response => {
                    //console.log(response)
                    if (response.status === 200) {
                        setUser(response.data.data)
                    } else {
                        console.log("Entre en else")
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        } catch (error) {
            console.log(error)
        }
    }

    async function getEstrenos() {
        let url = APIURL + "movies/now_playing";

        try {
            await Axios.get(url, { headers: { Authorization: `bearer ${token}` } })
                .then(response => {
                    //console.log(response)
                    if (response.status === 200) {
                        setEstrenos(response.data.data)
                        localStorage.setItem("BaseUrl", response.data.imageBaseUrl)
                    } else {
                        console.log("Entre en else")
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        } catch (error) {
            console.log(error)
        }
    }

    async function getPopulares() {
        let url = APIURL + "movies/popular";

        try {
            await Axios.get(url, { headers: { Authorization: `bearer ${token}` } })
                .then(response => {
                    console.log(response)
                    if (response.status === 200) {
                        setPopulares(response.data.data)
                    } else {
                        console.log("Entre en else")
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        //generateToken()
        getUsuario()
        getEstrenos()
        getPopulares()
        setDidMount(true);
        return () => setDidMount(false);
    }, [])
    const BaseUrl = localStorage.getItem("BaseUrl")
    //console.log(BaseUrl)
    // const estrenos = []
    // estrenos.push(JSON.parse(localStorage.getItem("Estrenos")))
    console.log(populares)
    if (!didMount) {
        return null;
    }

    return (

        <>
            <Carousel>

                {
                    estrenos.map((item, index) =>

                        < Carousel.Item key={index} >
                            <img
                                className="d-block w-100"
                                src={`${BaseUrl}${item.backdrop_path}`}
                            />
                            <Carousel.Caption>
                                <h3>{item.original_title}</h3>
                                <p>{item.overview}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    )
                }
            </Carousel>
            <div className="container">
                <div className="row">
                    {
                        populares.map((item, index) =>
                            <div className="col-4">
                                <div className="card" style={{ width: "18rem" }} key={index}>
                                    <img className="card-img-top" src={`${BaseUrl}${item.backdrop_path}`} />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.original_title}</h5>
                                        <p className="card-text">{item.overview}</p>
                                        <Link className="btn btn-primary btn-block text-bold"
                                            to={`/detallePelicula/${item.id}`}>Ver detalles...</Link>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>

        </>
    )
}
