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
            EmployeeFirstName:'',
            EmployeeLastName: '',
            DependentFirstName:'',
            DependentLastName: '',
            EmployeeId: '',
            showAddEmployee: '',
            showAddDependent: ''
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

    changeDependentFirstName = (e) =>{
        this.setState({DependentFirstName: e.target.value})
    }
    changeDependentLastName = (e) =>{
        this.setState({DependentLastName: e.target.value})
    }
    changeDependentRelationship = (e) =>{
        this.setState({DependentRelationship: e.target.value})
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

    handleAddDependentClose = () => {
        this.setState({
            showAddDependent:false
        })
    }
    handleAddDependentShow = () => {
        this.setState({
            showAddDependent:true
        })
    }

    addDependentClick = (employeeId) => {
        this.setState({
            DependentFirstName: '',
            DependentLastName: '',
            DependentRelationship: '',
            EmployeeId: employeeId,
            showAddDependent: true
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

    createDependentClick = () => {
        fetch(variables.API_URL + 'dependent', {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                'FirstName':this.state.DependentFirstName,
                'LastName':this.state.DependentLastName,
                'Relationship':this.state.DependentRelationship,
                'EmployeeId':this.state.EmployeeId
            })
        })
        .then(data=>{
            alert("Dependent Added!");
            this.refreshList();
        }).catch((error)=>{console.log(error)});
    }

    deleteDependentClick = (id) => {
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
            EmployeeLastName,
            EmployeeId,
            DependentFirstName,
            DependentLastName,
            DependentRelationship
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
                                <td><Icon.BsPersonPlusFill onClick={() => {this.addDependentClick(employee.employeeId)}}/></td>
                                <td><Icon.BsPencilSquare/></td>
                                <td><Icon.BsTrash onClick={() => {this.deleteEmployeeClick(employee.employeeId)}}/></td>
                            </tr>
                            )}
                    </tbody>
                </table>
            </div>
            <Modal show={this.state.showAddEmployee}>
                            <Modal.Header>Add Employee
                                <CloseButton onClick={this.handleAddEmployeeClose}/>
                            </Modal.Header>
                            <Modal.Body>
                                <span className='input-group-text'>
                                    First Name 
                                    <input type='text' className='form-control'
                                    value={EmployeeFirstName}
                                    onChange={this.changeEmployeeFirstName}/>
                                </span>
                                <span className='input-group-text'>
                                    Last Name 
                                    <input type='text' className='form-control'
                                    value={EmployeeLastName}
                                    onChange={this.changeEmployeeLastName}/>
                                </span>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={()=> {this.handleAddEmployeeClose(); this.createEmployeeClick()}} >
                                    Add
                                </Button>
                            </Modal.Footer>
            </Modal>
            <Modal show={this.state.showAddDependent}>
                            <Modal.Header>Add Dependent
                                <CloseButton onClick={this.handleAddDependentClose}/>
                            </Modal.Header>
                            <Modal.Body>
                                <span className='input-group-text'>
                                    First Name 
                                    <input type='text' className='form-control'
                                    value={DependentFirstName}
                                    onChange={this.changeDependentFirstName}/>
                                </span>
                                <span className='input-group-text'>
                                    Last Name 
                                    <input type='text' className='form-control'
                                    value={DependentLastName}
                                    onChange={this.changeDependentLastName}/>
                                </span>
                                <span className='input-group-text'>
                                    Relationship to Employee: 
                                    <select value={DependentRelationship} onChange={this.changeDependentRelationship}>
                                        <option value="spouse">Spouse</option>
                                        <option value="child">Child</option>
                                    </select>
                                </span>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={()=> {this.handleAddDependentClose(); this.createDependentClick()}} >
                                    Add
                                </Button>
                            </Modal.Footer>
            </Modal>
            
            </>
        )
    }
}