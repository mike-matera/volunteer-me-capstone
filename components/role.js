import React from 'react';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Router from 'next/router'

import {
    delete_role,
} from '../lib/api'

class RoleCard extends React.Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            mode: 'view',
        }
    }

    doDelete() {
        delete_role(this.props.item)
            .then(result => {
                Router.reload(window.location.pathname);
            })
            .catch(error => {
                // TODO: Reload this page on error.
                console.log('ERROR:', error);
            })
    }

    doEdit() {
        this.setState({
            mode: 'edit',
        })
    }

    doUpdate() {
        // TODO: Use the API to update the role.
        this.setState({
            mode: 'view',
        })
    }

    handleChange(event) {
        const updated = this.props.item 
        updated[event.target.id] = event.target.value
    }

    handleSubmit(event) {
        this.doUpdate()
        event.preventDefault()
    }

    render() {
        
        var item = this.props.item
        var stuff;        
        if (this.state.mode == 'view') {
            stuff = (
                <>
                <Card.Title>
                    {item.title}
                </Card.Title>
                <Card.Text>
                {item.description}
                </Card.Text>
                <Button  onClick={() => this.doEdit()} variant="outline-success">Edit</Button>
                <Button  onClick={() => this.doDelete()} variant="outline-danger">Delete</Button>
                <hr></hr>
                </>
            )
        }
        else {
            stuff = (
                <form onSubmit={this.handleSubmit}>
                <Card.Title>
                    <input type="text" id="name" value={item.title} onChange={this.handleChange}/>
                </Card.Title>
                <Card.Text>
                    <textarea cols="80" rows="5" id="description" value={item.description} onChange={this.handleChange}/>
                </Card.Text>
                <input type="submit" value="Done" className="btn btn-success" variant="outline-success"/>
                </form>
            )
        }
        const RoleStyle ={
            'max-width': '800px',
            'min-width': '500px',
            backgroundColor: 'lightgrey',
            display: 'inline-block',
            borderWidth: 'thick',
            borderColor: 'black',
        };

        return (
            <Card style = {RoleStyle}>
            <Card.Body>
                {stuff}
                <br></br>
                {this.props.content}
            </Card.Body>
            </Card>        
        )
    }
}

export default RoleCard