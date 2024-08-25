import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container as BootstrapContainer, Row, Col, Image } from "react-bootstrap";
import { Context } from "../store/appContext";

const SingleVehicle = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const [vehicle, setVehicle] = useState(null);
    const [propertiesToShow, setPropertiesToShow] = useState([]);

    useEffect(() => {
        const fetchVehicle = async () => {            
                const response = await fetch(`https://www.swapi.tech/api/vehicles/${params.theid}`);
                if (!response.ok) {
                    throw new Error(`Error obteniendo vehículo de API: ${response.statusText}`);
                }
                const data = await response.json();
                setVehicle(data.result.properties);

                const properties = Object.keys(data.result.properties);
                setPropertiesToShow(properties.filter(property => data.result.properties[property] !== ""));            
        };

        fetchVehicle();
    }, [params.theid]);

    const renderVehicleDetails = () => {
        if (!vehicle) {
            return null;
        }
    
        return Object.keys(vehicle).map((key, index) => {
            if (!propertiesToShow.includes(key)) {
                return (
                    <Col key={key}>
                        <div className="d-inline-block">
                            <strong>
                                ${key.replace(/_/g, " ").replace(/\b\w/g, match => match.toUpperCase())}:
                            </strong>
                        </div>
                        <div className="d-block">{vehicle[key]}</div>
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
                            src={vehicle ? `https://starwars-visualguide.com/assets/img/vehicles/${params.theid}.jpg` : ""}
                        />
                    </Col>
                    <Col>
                        {vehicle ? (
                            <>
                                <h1>{vehicle.name}</h1>
                                <p>
                                    <strong>Modelo:</strong> {vehicle.model}<br />
                                    <strong>Fabricante:</strong> {vehicle.manufacturer}<br />
                                    <strong>Clase:</strong> {vehicle.vehicle_class}<br />
                                    <strong>Precio:</strong> {vehicle.cost_in_credits} credits<br />
                                    <strong>Velocidad:</strong> {vehicle.max_atmosphering_speed}<br />
                                    <strong>Longitud:</strong> {vehicle.length}m<br />
                                    <strong>Peso:</strong> {vehicle.cargo_capacity}<br />
                                    <strong>Tripulación:</strong> {vehicle.crew}<br />
                                    <strong>Pasajeros:</strong> {vehicle.passengers}<br />
                                </p>
                            </>
                        ) : (
                            <p>Cargando...</p>
                        )}
                    </Col>
                </Row>
                <Row className="border-top mt-2 pt-3">{renderVehicleDetails()}</Row>
            </BootstrapContainer>

            <Link to="/">
                <span className="btn btn-primary btn-lg mt-5" href="/" role="button">
                    Atrás
                </span>
            </Link>
        </div>
    );
};

export default SingleVehicle;