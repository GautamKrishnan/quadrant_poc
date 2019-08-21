import React, { Component } from "react";
import "./styles/App.css";
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from "react-router-dom";
import MainPage from './screens/main';
import StudentsPage from './screens/students';
import ReportPage from "./screens/report";
import Student from "./screens/student"

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={MainPage} />
                    <Route path="/students" component={StudentsPage} />
                    <Route path="/reports" component={ReportPage} />
                    <Route path="/student" component={Student} />
                </Switch>
            </Router>
        );
    }
}
export default App;
