import Container from 'react-bootstrap/Container'
import React from 'react';
import SiteNav from 'components/sitenav'
import EditCard from 'components/editcard'
import ShiftList from 'components/shiftlist'

import { get_event } from '../../db/access'

export default class EventPage extends React.Component {

    constructor(props) {
        super(props)
    }

    update(item) {
        // FIXME: Implement this.
    }

    add(item) {
        // FIXME: Implement this.
    }

    delete(item) {
        // FIXME: Implement this.
    }

    render() {
        return (
            <>
            <SiteNav/>
            <Container fluid>
                <EditCard 
                    key={this.props.id}
                    item={this.props}
                    app={this}
                    content={
                        this.props.roles.map((role) => {
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
           </Container>
           </>
        )    
    }
}

export async function getServerSideProps(context) {
    const data = await get_event(context.query.id)
    if (data == null) {
        return {
            redirect: {
                destination: '/event',
                permanent: false,
            }
        }
    }
    return {
        props: data
    }
}
