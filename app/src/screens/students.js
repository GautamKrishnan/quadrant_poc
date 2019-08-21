import React, {Component} from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from "react-router-dom";
import '../App.css'

class StudentsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            students: []
        };
    }

    async componentDidMount() {
        const response = await fetch('/api/students');
        const body = await response.json();
        this.setState({ students: body, isLoading: false });
    }

    async remove(id) {
        await fetch(`/api/student/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(async () => {
            const response = await fetch('/api/students');
            const body = await response.json();
            this.setState({ students: body, isLoading: false });
        })
    }


    render() {
        const {students, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const studentList = students.map(student =>{
            return (
                <tr key={student.id} >
                    <td style={{whiteSpace: 'nowrap'}}>{student.name}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{student.physics}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{student.chemistry}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{student.mathematics}</td>
                    <td>
                        <ButtonGroup>
                            <Button size="sm" color="primary" tag={Link} to={{
                                pathname: "/student",
                                state: {
                                    id: student.id
                            }}}>Edit</Button>
                            <Button size="sm" color="danger" onClick={() => this.remove(student.id)}>Delete</Button>
                        </ButtonGroup>
                    </td>
                </tr>
        )});

        return (
            <div>
                <Container fluid>
                    <div className>
                        <Button color="success" tag={Link} to={{
                            pathname: "/student",
                            state: {
                                id: null
                            }}}>Add Student</Button>
                    </div>
                    <h3>The student list</h3>
                    <Table style={{border:2}}>
                        <thead>
                        <tr>
                            <th width="20%">Name</th>
                            <th width="20%">Physics</th>
                            <th width="20%">Chemistry</th>
                            <th width="20%">Mathematics</th>
                        </tr>
                        </thead>
                        <tbody>
                        {studentList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default StudentsPage;