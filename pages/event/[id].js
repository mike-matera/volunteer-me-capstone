import React from 'react';
import Container from 'react-bootstrap/Container'
import SiteNav from '../../components/sitenav'
import EditCard from '../../components/editcard'
import ShiftList from '../../components/shiftlist'

import { 
    get_event, 
    event_can_view, 
} from '../../db/access'

import withSession from '../../lib/session'

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
            <SiteNav user={this.props.user}/>
            <Container fluid>
                <EditCard 
                    key={this.props.event.id}
                    item={this.props.event}
                    app={this}
                    content={
                        this.props.event.roles.map((role) => {
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

export const getServerSideProps = withSession(async function({req, res, ...context}) {  

    // Check if the user is logged in. If not redirect to login page.
    const user = req.session.get('user')
    if (user == null) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }
    }

    // Check if the event exists, if not redirect to the event list.
    const event = await get_event(context.query.id)
    if (event == null || !event_can_view(event, user)) {
        return {
            redirect: {
                destination: '/event',
                permanent: false,
            }
        }
    }

    // Render the event page. 
    return {
        props: {
            event: event,
            user: req.session.get('user'),
        }
    }
})
