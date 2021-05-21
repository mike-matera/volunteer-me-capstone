import Container from 'react-bootstrap/Container'

import React from 'react';
import Button from 'react-bootstrap/Button'

import SiteNav from 'components/sitenav'
import EditCard from 'components/editcard'
import ShiftList from 'components/shiftlist'

import { query } from 'db/prisma_adapter'

export default class VolunteerApp extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            page: props.page,
            db: props.db,
            status: props.status,
        }
    }

    reset_db() {
        fetch('http://localhost:3000/api/reset')
        .then(r => r.json())
        .then(data => {
            this.setState(data)
        })
    }

    update(item) {
        /*
        var newstate = this.state 
        newstate.db[item.id] = item
        this.setState(newstate)
        fetch('http://localhost:3000/api/update', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
        */
    }

    add(item) {
        /*
        var newstate = this.state 
        newstate.db[item.id] = item 
        newstate.db[item.parent].children.push(item.id)
        this.setState(newstate)
        fetch('http://localhost:3000/api/insert', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
        */
    }

    delete(item) {
        /*
        var newstate = this.state 
        var parent = newstate.db[item.parent]
        var got = parent.children.findIndex(x => x == item.id)
        parent.children.splice(got,1)
        delete newstate.db[item]
        this.setState(newstate)
        fetch('http://localhost:3000/api/delete', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
        */
    }

    render() {
        if (this.state.status == 'error') {
            this.reset_db()
        }
        return (
            <>
            <SiteNav/>
            <Container fluid>
            <Button variant="danger" onClick={() => this.reset_db()}>Reset DB</Button>
            {
                this.state.db.map((event) => {
                    return (
                        <EditCard 
                            key={event.id}
                            item={event}
                            app={this}
                            content={
                                event.roles.map((role) => {
                                    return (
                                        <EditCard 
                                        key={role.id}
                                        item={role}
                                        app={this}
                                        content={
                                            <ShiftList 
                                                role={role} 
                                                app={this}
                                                shifts={role.shifts}/>
                                        }/>
                                    )
                                })
                            }
                        />
                    )
                })
            }
           </Container>
           </>
        )    
    }
}

export async function getServerSideProps() {
  return { props: await query() }
}
