import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container as BootstrapContainer, Row, Col, Image } from "react-bootstrap";
import { Context } from "../store/appContext";

const SinglePlanet = () => {
    const params = useParams();
    const [planet, setPlanet] = useState(null);
    const [propertiesToShow, setPropertiesToShow] = useState([]);

    useEffect(() => {
        const fetchPlanet = async () => {
            const response = await fetch(`https://www.swapi.tech/api/planets/${params.theid}`);
            if (!response.ok) {
                throw new Error(`Error obteniendo planeta de API: ${response.statusText}`);
            }
            const data = await response.json();
            setPlanet(data.result.properties);

            const properties = Object.keys(data.result.properties);
            setPropertiesToShow(properties.filter(property => data.result.properties[property] !== ""));

        };

        fetchPlanet();
    }, [params.theid]);

    const renderPlanetDetails = () => {
        if (!planet) {
            return null;
        }

        return Object.keys(planet).map((key, index) => {
            if (!propertiesToShow.includes(key)) {
                return (
                    <Col key={key}>
                        <div className="d-inline-block">
                            <strong>
                                ${key.replace(/_/g, " ").replace(/\b\w/g, match => match.toUpperCase())}:
                            </strong>
                        </div>
                        <div className="d-block">{planet[key]}</div>
                    </Col>
                );
            }
            return null;
        });
    };




    return (
        <div className="container mt-5">
            <BootstrapContainer>
                <Row>
                    <Col>
                        <Image
                            src={params.theid ? `https://starwars-visualguide.com/assets/img/planets/${params.theid}.jpg` : ""}
                        />
                    </Col>
                    <Col>
                        <h1>{planet.name}</h1>
                        {planet ? (
                            <>
                                <p>
                                    <strong>Población:</strong> {planet.population}<br />
                                    <strong>Periodo de rotación:</strong> {planet.rotation_period} dias<br />
                                    <strong>Periodo orbital:</strong> {planet.orbital_period} dias<br />
                                    <strong>Diametro:</strong> {planet.diameter}km<br />
                                    <strong>Gravedad:</strong> {planet.gravity}<br />
                                    <strong>Terreno:</strong> {planet.terrain}<br />
                                    <strong>Superficie de agua:</strong> {planet.surface_water}%<br />
                                    <strong>Clima:</strong> {planet.climate}<br />

                                </p>
                            </>
                        ) : (
                            <p>Cargando...</p>
                        )}
                    </Col>
                </Row>
                <Row className="border-top mt-2 pt-3">{renderPlanetDetails()}</Row>
            </BootstrapContainer>
            
            <Link to="/">
                <span className="btn btn-primary btn-lg mt-5" href="/" role="button">
                        Atrás
                </span>
            </Link>
        </div>
    );
};




export default SinglePlanet;