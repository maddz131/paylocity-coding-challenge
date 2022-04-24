import React, { Component } from 'react';
import { variables } from './Variables';
import * as Icon from "react-icons/bs";
import {Button, CloseButton, Modal} from 'react-bootstrap'


export class Employees extends Component{
    constructor(props){
        super(props);
        this.state={
            employees:[],
            dependents:[],
            EmployeeFirstName:'',
            EmployeeLastName: '',
            DependentFirstName:'',
            DependentLastName: '',
            DependentRelationship: '',
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
        console.log("Relationship Changed")
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

    handleViewDependentsShow = () => {
        this.setState({
            showViewDependents: true
        });
    }
    handleViewDependentsClose = () => {
        this.setState({
            showViewDependents: false
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

    viewDependentsClick = (id) => {
        this.setState({
            EmployeeId:id
        })
        fetch(variables.API_URL + 'dependent/' + id)
        .then(response=>response.json())
        .then(data=>{
            this.setState({dependents:data})
            this.handleViewDependentsShow()
            console.log(this.state.dependents)
        });
    }

    deleteDependentClick = (id) => {
        if(window.confirm('Are you sure?' +
        ' This action cannot be udnone.'))
        {
            fetch(variables.API_URL + 'dependent/' + id, {
                method:'DELETE',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(()=> {
                alert('Delete sucessful!')
                this.viewDependentsClick(this.state.EmployeeId)
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
            dependents,
            EmployeeFirstName,
            EmployeeLastName,
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
                <table className='table'>
                    <thead>
                        <tr>
                            <th>
                                Id
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
                                Total Discounts
                            </th>
                            <th>
                                Total Cost
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
                                <td>${employee.totalDiscount}</td>
                                <td>${employee.totalCost}</td>
                                <td><Icon.BsPersonPlusFill 
                                onClick={() => {this.addDependentClick(employee.employeeId)}}/></td>
                                <td><Icon.BsPeopleFill
                                onClick = {()=>{this.viewDependentsClick(employee.employeeId); }}/></td>
                                <td><Icon.BsTrash
                                onClick={() => {this.deleteEmployeeClick(employee.employeeId)}}/></td>
                            </tr>
                            )}
                    </tbody>
                </table>
            </div>
            <Modal show={this.state.showAddEmployee}>
                <Modal.Header>
                    Add Employee
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
                    <Button onClick={()=> {this.handleAddEmployeeClose(); this.createEmployeeClick()}}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={this.state.showAddDependent}>
                <Modal.Header>
                    Add Dependent
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
                        <select value={DependentRelationship} 
                        onChange={this.changeDependentRelationship}>
                            <option value="Spouse">Spouse</option>
                            <option value="Child">Child</option>
                        </select>
                    </span>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={()=> {this.handleAddDependentClose(); this.createDependentClick()}} >
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={this.state.showViewDependents}>
                <Modal.Header>
                    View Dependents
                    <CloseButton onClick={this.handleViewDependentsClose}/>
                </Modal.Header>
                <Modal.Body>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>
                                    Id
                                </th>
                                <th>
                                    First Name
                                </th>
                                <th>
                                    Last Name
                                </th> 
                                <th>
                                    Relationship
                                </th>
                                <th>
                                    Discount
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {dependents.map(dependent => 
                            <tr key={dependent.dependentId}>
                                <td>{dependent.dependentId}</td>
                                <td>{dependent.firstName}</td>
                                <td>{dependent.lastName}</td>
                                <td>{dependent.relationship}</td>
                                <td>${dependent.discount}</td>
                                <td><Icon.BsTrash onClick={() => {this.deleteDependentClick(dependent.dependentId)}}/></td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
            
            </>
        )
    }
}