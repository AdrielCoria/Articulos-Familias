// imporst
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import AuthService from "../services/auth.service";

function Menu() {
    const [usuarioLogueado, setUsuarioLogueado] = useState(AuthService.getUsuarioLogueado());

    function CambioUsuarioLogueado(_usuarioLogueado) {
        setUsuarioLogueado(_usuarioLogueado);
    }

    useEffect(() => {
        AuthService.subscribeUsuarioLogueado(CambioUsuarioLogueado);

        return () => {
            AuthService.subscribeUsuarioLogueado(null);
        }
    }, [])


    return (
        <nav className='navbar navbar-dark bg-dark navbar-expand-md'>
            <a className='navbar-brand'>
                <i className='fa fa-industry'></i>
                &nbsp;<i>Pymes</i>
            </a>
            <button
                className='navbar-toggler'
                type='button'
                data-toggle='collapse'
                data-target='#navbarSupportedContent'
                aria-controls='navbarSupportedContent'
                aria-expanded='false'
                aria-label='Toggle navegation'
            >
                <span className='navbar-togler-icon'></span>
            </button>

            <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                <ul className='navbar-nav mr-auto'>

                    <li className='nav-item'>
                        <NavLink className='nav-link' to='/inicio'>
                            Inicio
                        </NavLink>
                    </li>

                    <li className='nav-item'>
                        <NavLink className='nav-link' to='/articulosfamilias'>
                            Articulos Familias
                        </NavLink>
                    </li>

                    <li className='nav-item'>
                        <NavLink className='nav-link' to='/articulos'>
                            Articulos
                        </NavLink>
                    </li>

                    <li className='nav-item'>
                        <NavLink className='nav-link' title="exclusivo para administradores" to='/articulos'>
                            Articulos JWT
                        </NavLink>
                    </li>

                    <li className="nav-item dropdown bg-dark">
                        <a
                            className="nav-link dropdown-toggle"
                            href="#!"
                            id="navbarDropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Informes
                        </a>
                        <ul
                            className="dropdown-menu"
                            aria-labelledby="navbarDropdown"
                        >
                            <li>
                                <a href="#!" className="dropdown-item">Ventas</a>
                            </li>

                            <li>
                                <a href="#!" className="dropdown-item">Compras</a>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <a href="#!" className="dropdown-item">
                                    Libro de IVA
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>

                <ul className="navbar-nav ms-auto">
                    {usuarioLogueado && (
                        <li className="nav-item">
                            <a className="nav-link" href="#!">Bienvenido:
                                {usuarioLogueado}</a>
                        </li>
                    )}
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login/Inicio">
                            <span
                                className={
                                    usuarioLogueado ? "text-warning" : "text-success"
                                }
                            >
                                <i
                                    className={
                                        usuarioLogueado ? "fa fa-sign-out" : "fafa-sign-in"}
                                ></i>
                            </span>
                            {usuarioLogueado ? " Logout" : " Login"}
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav >
    );
}

export default Menu;
