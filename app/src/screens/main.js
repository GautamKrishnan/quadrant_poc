import React, {Component} from 'react';
import { Link } from "react-router-dom";
import logo from '../logo.svg';
import '../App.css'


class MainPage extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        A proof of Concept!
                    </p>
                    <Link to="/students">Create/Read/Update/Delete students!</Link>
                    <Link to="/reports">Test this!</Link>
                </header>
            </div>
        );
    }
}

export default MainPage;