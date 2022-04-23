import { tsContructorType } from '@babel/types';
import React, { Component } from 'react';
import { variables } from './Variables';
import * as Icon from "react-icons/bs";
import {Button, CloseButton, Modal} from 'react-bootstrap'

export class EmployeeDetails extends Component{

    constructor(props){
        super(props);
        this.state={
            employees:[],
            modalTitle:'',
            EmployeeFirstName:'',
            EmployeeLastName: '',
            show: ''
        }
    }
    //probaly would be able to add employee id but for sake of time, just generate one
    componentDidMount(){//?
        this.refreshList();
    }

    changeEmployeeFirstName = (e) =>{
        this.setState({EmployeeFirstName: e.target.value})
    }
    changeEmployeeLastName = (e) =>{
        this.setState({EmployeeLastName: e.target.value})
    }

    handleClose = () => {
        this.setState({
            show:false
        })
    }
    handleShow = () => {
        this.setState({
            show:true
        })
    }

    addClick(){
        console.log("Here")
        this.setState({
            EmployeeFirstName: '',
            EmployeeLastName: '',
            show: true
        });
    }
    
    createClick = () => {
        /*fetch(variables.API_URL + 'employees', {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'appliction/json'
            },
            body:JSON.stringify({
                EmployeeFirstName:this.state.EmployeeFirstName,
                EmployeeLastName:this.state.EmployeeLastName
            })
        })
        .then(response=>response.json())
        .then(data=>{
            this.setState({employees:data}) //expecting employees list?
        });*/
        this.setState({employees: [
            {
                FirstName: this.state.EmployeeFirstName,
                LastName: this.state.EmployeeLastName,
                EmployeeId: 2
            }
        ]})
    }

    refreshList(){
        /*fetch(variables.API_URL + 'employees')
        .then(response=>response.json())
        .then(data=>{
            this.setState({employees:data})
        });*/
        this.setState({employees: [
            {
                FirstName: 'Alec',
                LastName: 'Blaire',
                EmployeeId: 1
            }
        ]})
    }
    render(){
        const {
            employees,
            modalTitle,
            EmployeeFirstName,
            EmployeeLastName
        } = this.state;
        return(
            <>
            <div>
                <Button type='button'
                className='btn btn-primary m-2 float-end'
                onClick={this.handleShow}>
                    Add Employee
                </Button>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>
                                EmployeeFirstName
                            </th>
                            <th>
                                EmployeeLastName
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee => 
                            <tr key={employee.EmployeeId}>
                                <td>{employee.FirstName}</td>
                                <td>{employee.LastName}</td>
                            </tr>
                            )}
                    </tbody>
                </table>
            </div>
            <Modal show={this.state.show}>
                            <Modal.Header>Modal Head PArt
                                <CloseButton onClick={this.handleClose}/>
                            </Modal.Header>
                            <Modal.Body>
                                <span className='input-group-text'>First Name 
                                <input type='text' className='form-control'
                                value={EmployeeFirstName}
                                onChange={this.changeEmployeeFirstName}/>
                                </span>
                                <span className='input-group-text'>Last Name 
                                <input type='text' className='form-control'
                                value={EmployeeLastName}
                                onChange={this.changeEmployeeLastName}/></span>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={()=> {this.handleClose(); this.createClick()}} >
                                    Add
                                </Button>
                            </Modal.Footer>
            </Modal>
            
            </>
        )
    }
}