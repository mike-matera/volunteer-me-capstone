import React from 'react';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

class EventCard extends React.Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            mode: 'view',
            event: props.item,
        }
    }

    doEdit() {
        this.setState({
            mode: 'edit',
        })
    }

    doUpdate() {
        var newevent = {
            id: this.state.event.id,
            title: this.state.event.title,
            description: this.state.event.description,
        }
        fetch('http://localhost:3000/api/event/' + this.state.event.id, {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify(newevent)
        })
        .then(response => response.json())
        .then(result => {
            console.log('SUCCESS!')
        })
        .catch(error => {
            // TODO: Reload this page on error.
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
        var item = this.state.event
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
                <Button onClick={() => this.doEdit()} variant="outline-success">Edit</Button>
                </>
            )
        }
        else {
            stuff = (
                <form onSubmit={this.handleSubmit}>
                <Card.Title>
                    <input type="text" id="title" value={item.title} onChange={this.handleChange}/>
                </Card.Title>
                <Card.Text>
                    <textarea cols="80" rows="5" id="description" value={item.description} onChange={this.handleChange}/>
                </Card.Text>
                <input type="submit" value="Done" className="btn btn-success" variant="outline-success"/>
                </form>
            )
        }
        return (
            <Card className="roleCard">
            <Card.Body>
                {stuff}
                <br></br>
                {this.props.content}
            </Card.Body>
            </Card>        
        )
    }
}

export default EventCard