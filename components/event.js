import React from 'react';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Router from 'next/router'

import {
    put_event,
    delete_event,
    create_role
} from '../lib/api'

class EventCard extends React.Component {

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
    doAdd() {
        create_role(this.props.item.id)
            .then(result => {
            Router.reload(window.location.pathname);
        })
            .catch(error => {
                Router.reload(window.location.pathname);
            console.log('ERROR:', error)
        })
        
    }

    doDelete() {
        console.log('WHATS IN EVENT',this.state.event.roles.length);
        if(this.state.event.roles.length == 0)
            console.log('Shifts empty');
        else{
                console.log('Shifts full');
            }
            

        delete_event(this.state.event)
            .then(result => {
                Router.push('/event')
            })
            .catch(error => {
                Router.reload(window.location.pathname);
                console.log('ERROR:', error)
            })
    }

    doEdit() {
        
        this.setState({
            mode: 'edit',
        })
    }

    doUpdate() {
        put_event(this.state.event)
            .then(result => {
                console.log('SUCCESS: ', result)
            })
            .catch(error => {
                Router.reload(window.location.pathname);
                console.log('ERROR!')
            })

        this.setState({
            mode: 'view',            
        })
    }

    handleChange(ev) {
        console.log(ev.target.id)
        let newevent = this.state.event
        newevent[ev.target.id] = ev.target.value
        this.setState({
            event: newevent,
        })
    }

    handleSubmit(ev) {
        this.doUpdate()
        ev.preventDefault()
    }

    render() {
        const eventcss ={
            textAlign: 'center',
        };
        var item = this.state.event
        var stuff;        
        if (this.state.mode == 'view') {
            stuff = (
                <div style = {eventcss}>
                <Card.Title style={{fontSize:"1.6rem"}}>
                    {item.title}
                </Card.Title>
                <Card.Text>
                {item.description}
                </Card.Text>
                <Button onClick={() => this.doEdit()} id="editButton" variant="outline-success">Edit</Button>
                <Button id="deleteButton" variant="outline-danger" onClick={() => {
                    if(this.state.event.roles.length == 0){
                    this.doDelete()}
                    else{
                    window.alert('Must delete all Roles under an Event to delete')}
                     }}>Delete</Button>
                <br/>
                <Button style={{color: "#fff",backgroundColor: "#21ba45",borderColor:"#21ba45",marginTop: "10px"}} onClick={() => this.doAdd()}>Add Role</Button>
                </div>
            )
        }
        else {
            stuff = (
                <div style = {eventcss}>
                <form onSubmit={this.handleSubmit}>
                <Card.Title>
                    <input type="text" id="title" value={item.title} onChange={this.handleChange}/>
                </Card.Title>
                <Card.Text>
                    <textarea cols="80" rows="5" id="description" placeholder="Enter event description here..." value={item.description} onChange={this.handleChange}/>
                </Card.Text>
                <input type="submit" value="Done" style={{ backgroundColor: "#21ba45",borderColor: "#21ba45"}} className="btn btn-success" variant="outline-success"/>
                </form>
                </div>
            )
        }
        return (
            <Card className="roleCard">
            <Card.Body style={{boxShadow:"0 10px 35px rgb(50 50 93 / 10%), 0 2px 15px rgb(0 0 0 / 7%)", paddingBottom: "75px"}}>
                {stuff}
                <br></br>
                {this.props.content}
            </Card.Body>
            </Card>        
        )
    }
}

export default EventCard