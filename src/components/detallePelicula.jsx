import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { APIURL } from '../services/apiUrl';
import { useParams } from 'react-router-dom'
import { Jumbotron } from 'react-bootstrap'

export default function DetallePelicula() {
    const token = localStorage.getItem("token")
    const { id } = useParams()
    const [populares, setPopulares] = useState([])
    const [actors, setActors] = useState([])
    const BaseUrl = localStorage.getItem("BaseUrl")

    async function getPopulares() {
        let url = APIURL + "movies/popular";

        try {
            await Axios.get(url, { headers: { Authorization: `bearer ${token}` } })
                .then(response => {

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

    async function getActors() {
        let url = APIURL + `movies/${id}/actors`
        console.log(url)
        try {
            await Axios.get(url, { headers: { Authorization: `bearer ${token}` } })
                .then(function (response) {
                    if (response.status === 200) {
                        setActors(response.data.data)
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
        getPopulares()
        getActors()
    }, [])
    const popular = populares.filter(pop => pop.id == id)

    console.log(popular)
    console.log(actors)

    return (
        <>

            {
                popular.map((item, index) =>
                    <Jumbotron>
                        <img className="d-block w-100 h-20" src={`${BaseUrl}${item.backdrop_path}`} />
                        <h1>{item.original_title}</h1>
                        <p>{item.overview}</p>
                    </Jumbotron>

                )
            }

            <div className="container">
                <div className="row">
                    {
                        actors.map((item, index) =>
                            <div className="col-4">
                                <div className="card" style={{ width: "18rem" }} key={index}>
                                    <img className="card-img-top" src={`${BaseUrl}${item.profile_path}`} />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.original_name}</h5>
                                        <p className="card-text">Caracterización: {item.character}</p>
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
