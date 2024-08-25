import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Container } from 'react-bootstrap';

function ResourceCard(props) {
    const { store, actions } = useContext(Context);

    const resourceImageUrls = {
        people: (uid) => `https://starwars-visualguide.com/assets/img/characters/${uid}.jpg`,
        planets: (uid) => `https://starwars-visualguide.com/assets/img/planets/${uid}.jpg`,
        planets: (uid) => `https://starwars-visualguide.com/assets/img/planets/${uid}.jpg`
    };

    const getImageUrl = resourceImageUrls[props.resource] || ((uid) => `https://starwars-visualguide.com/assets/img/${props.resource}/${uid}.jpg`);
    const imageUrl = getImageUrl(props.uid);

    return (
        <Card className="card" style={{ width: '18rem', marginBottom: '20px' }} key={props.id} bg="dark" data-bs-theme="dark" >
            <Card.Img variant="top" src={imageUrl} />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <div className="d-flex justify-content-between">
                    <Link className="btn btn-primary" to={`/${props.resource}/${props.uid}`} resource={props.resource}>Ver detalles</Link>
                    <Button variant="warning" onClick={(e) => actions.addFavorite(props.name, props.uid, props.resource)}><FontAwesomeIcon icon={faHeart} /></Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default ResourceCard;