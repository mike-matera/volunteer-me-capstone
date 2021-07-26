import React from 'react';
import Container from 'react-bootstrap/Container'
import EventCard from '../../components/event'
import RoleCard from '../../components/role'
import ShiftList from '../../components/shiftlist'
import SiteNav from '../../components/sitenav'
import CardGroup from 'react-bootstrap/CardGroup'
import { 
    get_event, 
    event_can_view, 
} from '../../db/access'

import withSession from '../../lib/session'

export default class EventPage extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
            <SiteNav user={this.props.user}/>
            <Container fluid>
                <div id="eventHeader">Event Details</div>
                <hr id="eventDivider"></hr>
                <EventCard
                    key={this.props.event.id}
                    item={this.props.event}
                    content={(
                        <CardGroup>
                        {this.props.event.roles.map((role) => {
                            return (
                                <RoleCard 
                                key={role.id}
                                item={role}
                                event={this.props.event.id}
                                content={
                                    <ShiftList
                                        role={role} 
                                        shifts={role.shifts}
                                        event={this.props.event.id}/>
                                }/>
                                
                            )
                        })}
                        </CardGroup>
                    )}
                />
                <style jsx>{` 
                #eventHeader{
                    padding-top: 23px;
                    text-transform: uppercase;
                    margin: 0 0 20px 0;
                    font-weight: 700;
                    font-size: 25px;
                    color: #333;
                    text-align:center;
                }

                #eventDivider{
                    background: linear-gradient(to right, #5ca9fb 0%, #6372ff 100%);
                    height: 4px;
                    bottom: 0;
                    margin: auto;
                    width: 415px;
                }
                
                `}</style>
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
