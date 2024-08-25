import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container as BootstrapContainer, Row, Col, Image } from 'react-bootstrap';
import { Context } from "../store/appContext";

import PropTypes from "prop-types";

const SingleCharacter = () => {
    
    const params = useParams();
    const [character, setCharacter] = useState(null);
    const [propertiesToShow, setPropertiesToShow] = useState([]);

    useEffect(() => {
        const fetchCharacter = async () => {            
                const response = await fetch(`https://www.swapi.tech/api/people/${params.theid}`);
                if (!response.ok) {
                    throw new Error(`Error obteniendo personaje de API: ${response.statusText}`);
                }
                const data = await response.json();
                setCharacter(data.result.properties);

                const properties = Object.keys(data.result.properties);
                setPropertiesToShow(properties.filter(property => data.result.properties[property] !== ""));            
        };

        fetchCharacter();
    }, [params.theid]);

    const renderCharacterDetails = () => {
        if (!character) {
            return null;
        }

        return Object.keys(character).map((key, index) => {
            if (!propertiesToShow.includes(key)) {
                return (
                    <Col key={key}>
                        <div className="d-inline-block">
                            <strong>
                                ${key.replace(/_/g, " ").replace(/\b\w/g, match => match.toUpperCase())}:
                            </strong>
                        </div>
                        <div className="d-block">{character[key]}</div>
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
    src={params.theid ? `https://starwars-visualguide.com/assets/img/characters/${params.theid}.jpg` : ""}
/>
                    </Col>
                    <Col>
                        {character ? (
                            <>
                                <h1>{character.name}</h1>
                                <p>
                                    <strong>Color de ojos:</strong> {character.eye_color}<br />
                                    <strong>Género:</strong> {character.gender}<br />
                                    <strong>Color de pelo:</strong> {character.hair_color}<br />
                                    <strong>Estatura:</strong> {character.height} cm<br />
                                    <strong>Peso:</strong> {character.mass} kg<br />
                                </p>
                            </>
                        ) : (
                            <p>Cargando...</p>
                        )}
                    </Col>
                </Row>
                <Row className="border-top mt-2 pt-3">{renderCharacterDetails()}</Row>
            </BootstrapContainer>

            <Link to="/">
                <span className="btn btn-primary btn-lg mt-5" href="/" role="button">
                    Atrás
                </span>
            </Link>
        </div>
    );
};

SingleCharacter.propTypes = {
    match: PropTypes.object,
};

export default SingleCharacter;