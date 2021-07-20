import React from 'react';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Router from 'next/router'
import CardGroup from 'react-bootstrap/CardGroup'

import {
    delete_role,
    put_role,
} from '../lib/api'

class RoleCard extends React.Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.doDelete = this.doDelete.bind(this);
        this.state = {
            mode: 'view',
            event: props.item,
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
        put_role(this.props.item)
            .then(result => {
                console.log('SUCCESS: ', result)
            })
            .catch(error => {
                // TODO: Reload this page on error.
                console.log('ERROR!')
            })
        this.setState({
            mode: 'view',
        })
    }

    handleChange(event) {
        console.log(event.target.id)
        let newevent = this.state.event
        newevent[event.target.id] = event.target.value
        this.setState({
            event: newevent,
        })
    }

    handleSubmit(event) {
        this.doUpdate()
        event.preventDefault()
    }

    render() {
        
        var item = this.props.item
        var stuff;
        
        const RoleStyle ={
            maxWidth: '800px',
            minWidth: '500px',
            borderRadius: '30px',
            margin: '10px',
            backgroundColor: 'lightgrey',
            display: 'inline-block',
            border: '5px solid '
        }
        const Cardheader ={
            textAlign: 'center',
        }
        const Buttons ={
            'float': 'right',
        }

        if (this.state.mode == 'view') {
            
            
            stuff = (
                <>
                <Card.Title style= {Cardheader}>
                    {item.title}
                </Card.Title>
                <Card.Text style= {Cardheader}>
                {item.description}
                </Card.Text>
                <Button style= {Cardheader} onClick={() => this.doEdit()} variant="outline-success">Edit</Button>
                <Button style= {Cardheader} onClick={() => this.doDelete()} variant="outline-danger">Delete</Button>
                </>
            )
        }
        else {
            stuff = (
                <form onSubmit={this.handleSubmit}>    
                <Card.Title style= {Cardheader}>
                    <input type="text" id="title" value={item.title} onChange={this.handleChange}/>
                </Card.Title>
                <Card.Text style= {Cardheader}>
                    <textarea cols="80" rows="5" id="description" value={item.description} onChange={this.handleChange}/>
                </Card.Text>
                <input type="submit" value="Done" className="btn btn-success" variant="outline-success"/>
                </form>
            )
        }
        
        // Styles
        
        

        return (
            <Card style = {RoleStyle}>
            <Card.Body>
                {stuff}
                <br></br>
                <hr></hr>
                {this.props.content}
            </Card.Body>
            </Card>        
        )
    }
}

export default RoleCard