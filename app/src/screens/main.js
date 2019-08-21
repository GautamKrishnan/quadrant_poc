import React, {Component} from 'react';
import { Link } from "react-router-dom";
import logo from '../logo.svg';
import '../styles/App.css'


class MainPage extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                       A front-end to interact the the CRUD spring boot implementation
                    </p>
                    <Link to="/students">Maintain Students</Link><text> - CRUD Spring boot </text>
                    <br/>
                    <br/>
                    <Link to="/reports">A Simple Report!</Link><text> - d3.js </text>
                </header>
            </div>
        );
    }
}

export default MainPage;