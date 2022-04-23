import { tsContructorType } from '@babel/types';
import React, { Component } from 'react';
import { variables } from './Variables';
import * as Icon from "react-icons/bs";
import {Button, CloseButton, Modal} from 'react-bootstrap'
import ReactTooltip from "react-tooltip";


export class Employees extends Component{
    constructor(props){
        super(props);
        this.state={
            employees:[],
            modalTitle:'',
            EmployeeFirstName:'',
            EmployeeLastName: '',
            showAddEmployee: ''
        }
    }
    //probaly would be able to add employee id but for sake of time, just generate one
    componentDidMount(){
        this.refreshList();
    }

    changeEmployeeFirstName = (e) =>{
        this.setState({EmployeeFirstName: e.target.value})
    }
    changeEmployeeLastName = (e) =>{
        this.setState({EmployeeLastName: e.target.value})
    }

    handleAddEmployeeClose = () => {
        this.setState({
            showAddEmployee:false
        })
    }
    handleAddEmployeeShow = () => {
        this.setState({
            showAddEmployee:true
        })
    }

    addEmployeeClick = () => {
        this.setState({
            EmployeeFirstName: '',
            EmployeeLastName: '',
            showAddEmployee: true
        });
    }
    
    refreshList = () => {
        fetch(variables.API_URL + 'employee')
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
            this.setState({employees:data})
            console.log(this.state.employees)
        });
    }

    createEmployeeClick = () => {
        fetch(variables.API_URL + 'employee', {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                'FirstName':this.state.EmployeeFirstName,
                'LastName':this.state.EmployeeLastName
            })
        })
        .then(data=>{
            alert("Employee Added!");
            this.refreshList();
        }).catch((error)=>{console.log(error)});
    }
    deleteEmployeeClick = (id) => {
        if(window.confirm('Are you sure you want to delete this employee and their dependents?' +
        ' This action cannot be udnone.'))
        {
            fetch(variables.API_URL + 'employee/' + id, {
                method:'DELETE',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(()=> {
                alert('Delete successful!')
                this.refreshList();
            })
            .catch((error)=>{
                alert('Delete Failed')
            });
        }
    }
   
    render(){
        const {
            employees,
            EmployeeFirstName,
            EmployeeLastName
        } = this.state;
        return(
            <>
            <div>
                <Button type='button'
                className='btn btn-primary m-2 float-end'
                onClick={this.addEmployeeClick}>
                    Add Employee
                </Button>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>
                                EmployeeId
                            </th>
                            <th>
                                First Name
                            </th>
                            <th>
                                Last Name
                            </th>
                            <th>
                                Dependents
                            </th>
                            <th>
                                Benefits Cost
                            </th>
                            <th>
                                Discount
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee => 
                            <tr key={employee.employeeId}>
                                <td>{employee.employeeId}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.dependents}</td>
                                <td>{employee.benefitsCost}</td>
                                <td>{employee.discount}</td>
                                <td><Icon.BsPersonPlusFill/></td>
                                <td><Icon.BsPencilSquare/></td>
                                <td><Icon.BsTrash onClick={() => {this.deleteEmployeeClick(employee.employeeId)}}/></td>
                            </tr>
                            )}
                    </tbody>
                </table>
            </div>
            <Modal show={this.state.showAddEmployee}>
                            <Modal.Header>Modal Head Part
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
                                <Button onClick={()=> {this.handleAddEmployeeClose(); this.createEmployeeClick()}} >
                                    Add
                                </Button>
                            </Modal.Footer>
            </Modal>
            
            </>
        )
    }
}