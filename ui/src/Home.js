import React, { Component } from 'react';
import { variables } from './Variables';
import * as Icon from "react-icons/bs";
import {Card, ListGroup} from 'react-bootstrap'

export class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            benefits:''
        }
    }

    componentDidMount(){
        this.refreshList();
    }

    refreshList = () => {
        fetch(variables.API_URL + 'benefits')
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
            this.setState({benefits:data})
        });
    }
    multiply = (a,b) => {
        return a*b;
    }
    render(){
        const {
            benefits
        } = this.state;
        return(
            <>
                <Card className="text-center">
                    <Card.Body>
                        <Card.Title>Employee Benefits Details</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Sign in to make changes</Card.Subtitle>
                    </Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item><div className="fw-bold">Employee Cost Per Year:</div>${benefits.employeeBenefitsYearlyCost}</ListGroup.Item>
                        <ListGroup.Item><div className="fw-bold">Dependents Cost Per Year:</div>${benefits.dependentBenefitsYearlyCost}</ListGroup.Item>
                        <ListGroup.Item><div className="fw-bold">Employee Salary:</div>${benefits.paycheck*benefits.payPeriodsPerYear}</ListGroup.Item>
                        <ListGroup.Item><div className="fw-bold">Percent Discount:</div>{benefits.percentDiscount}%</ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                        <Card.Link href="#">Sign In</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                </Card>
            </>
        )
    }
}