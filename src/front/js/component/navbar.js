import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from '@fortawesome/free-solid-svg-icons';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import Dropdown from 'react-bootstrap/Dropdown';
import { Button } from "react-bootstrap";

export const MainNavbar = () => {
    const { store, actions } = useContext(Context);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    useEffect(() => {

        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [token]);

    const handleLogout = () => {
        actions.logOut();
        setIsAuthenticated(false);
        navigate('/login');
    };

    return (
        <Navbar bg="blak" data-bs-theme="dark" collapseOnSelect expand="lg" className="bg-body-secondary border-bottom border-white">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src="https://lumiere-a.akamaihd.net/v1/images/sw_logo_stacked_2x-52b4f6d33087_7ef430af.png?region=0,0,586,254"
                        width="100"
                        height="40"
                        className="d-inline-block align-top"
                        alt="Logotipo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="d-flex justify-content-end">
                    <Nav>
                        {isAuthenticated && (
                            <Dropdown>
                                <Dropdown.Toggle variant="warning" id="dropdown-basic">
                                    Favoritos <Badge pill bg="light" text="dark">{store.favorites.length}</Badge>
                                </Dropdown.Toggle>
                                {store.favorites.length > 0 ? (
                                    <Dropdown.Menu>
                                        {store.favorites.map((favorite) => {
                                            console.log(favorite)
                                            return <Link key={favorite.uid} className="d-flex gap-2 w-100 justify-content-between py-1 px-3" to={favorite.url} resource={favorite.resource}>
                                                {favorite.name}
                                                <div className="delete-task text-danger" onClick={(e) => actions.deleteFavorite(favorite)}>
                                                    <FontAwesomeIcon icon={faX} />
                                                </div>
                                            </Link>
                                        }
                                        )}
                                    </Dropdown.Menu>
                                ) : (
                                    <Dropdown.Menu className="py-1 px-3 w-100">0 favoritos</Dropdown.Menu>
                                )}
                            </Dropdown>
                        )}

                        {isAuthenticated ? (
                            <>

                                <Button onClick={handleLogout} className="text-white">Cerrar Sesión</Button>
                            </>
                        ) : (
                            <>
                                <button className="btn btn-primary me-2" onClick={() => navigate("/login")}>Iniciar Sesión</button>
                                <button className="btn btn-secondary" onClick={() => navigate("/signup")}>Registrarse</button>
                                
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
