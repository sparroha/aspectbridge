//import React from 'react';
//import ReactDOM from 'react-dom';
//import $ from 'jquery';
//import 'bootstrap/dist/js/bootstrap.min.js';
export default function Nav() {
    return (
        <>
            <nav className="navbar navbar-inverse cssmenu">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="components/nav#">Terra Forge</a>
                    </div>
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="nav navbar-nav">
                            <li className="active"><a href="components/nav#home">Home</a></li>
                            !--
                            <li className="dropdown">
                                <a className="dropdown-toggle" data-hover="dropdown" data-toggle="dropdown" href="components/nav#">Resources<span
                                    className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li><a href="components/nav#">Wiki</a></li>
                                    <li><a href="components/nav#">Mimicry Wiki</a></li>
                                    <li><a href="components/nav#">Other Wikis</a></li>
                                </ul>
                            </li>
                            --
                            <li><a href="components/nav#docs">Documents</a></li>
                            <li><a href="components/nav#irc">IRC</a></li>
                            <li><a href="components/nav#contact">Contact Us</a></li>
                            <li className="dropdown">
                                <a className="dropdown-toggle" data-hover="dropdown" data-toggle="dropdown" href="components/nav#">Child
                                    Sites<span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li><a href='/josh'>Josh</a></li>
                                </ul>
                            </li>
                            <li className="dropdown">
                                <a className="dropdown-toggle" data-hover="dropdown" data-toggle="dropdown" href="components/nav#">Projects<span
                                    className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li><a href='wasd'>Game</a></li>
                                    <li><a href='grid'>Grid</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}