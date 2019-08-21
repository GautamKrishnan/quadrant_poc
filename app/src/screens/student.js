import React,  {Component} from "react";
import {Button} from 'reactstrap';
import { withRouter } from 'react-router-dom';

class Student extends Component {

    emptyStudent = {
        name: '',
        physics: '',
        chemistry: '',
        mathematics: '',
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            student: this.emptyStudent,
            redirectHome : false,
        };
    }

    async componentDidMount() {
        const { id } = this.props.location.state;
        console.log(id);
        if(id!==null) {
            const response = await fetch('/api/student/'+id+'');
            const body = await response.json();
            console.log(body);
            this.setState({
                student: body,
                isLoading: false });
        } else {
            this.setState({isLoading:false});
        }
    }

    async postData() {
        const {student} = this.state;
        const response = await fetch((student.id) ? '/api/student/edit' : '/api/student/add', {
            method: (student.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student),
        });
        console.log(response);
        if(response.ok) {
            this.props.history.push('/students');
        }
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const { student } = this.state;
        let editStudent = student;
        editStudent[name] = value;
        this.setState({student:editStudent});
    };

    render (){
        const { student } = this.state;
        const header = <p>{student.id ? 'Please edit the details of the student:' : 'Enter the details and submit to create a new student:' }</p>
        return (
            <div>
                    {header}
                    <label>
                        Name:
                        <input type="text" value={student.name || ''} name="name" onChange={this.handleChange} />
                    </label>
                    <br/>
                    <label>
                        Physics:
                        <input type="text" value={student.physics || ''} name="physics" onChange={this.handleChange} />
                    </label>
                    <br/>
                    <label>
                        Chemistry:
                        <input type="text" value={student.chemistry || ''} name="chemistry" onChange={this.handleChange} />
                    </label>
                    <br/>
                    <label>
                        Mathematics:
                        <input type="text" value={student.mathematics || ''} name="mathematics" onChange={this.handleChange} />
                    </label>
                    <br/>
                    <Button size="lg" color="primary" onClick={async () =>{await this.postData()}}>Submit</Button>
            </div>
        )}
}

export default withRouter(Student);