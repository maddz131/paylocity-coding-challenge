import React, { Component } from 'react';
import { variables } from './Variables';
import * as Icon from "react-icons/bs";
import {Card, CloseButton, Modal} from 'react-bootstrap'

export class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            benefits:''
        }
    }

    refreshList = () => {
        fetch(variables.API_URL + 'benefits')
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
            this.setState({benefits:data})
        });
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
                        <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                        </Card.Text>
                        <Card.Link href="#">Sign In</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                </Card>
            </>
        )
    }
}