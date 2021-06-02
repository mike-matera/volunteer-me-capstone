import Container from 'react-bootstrap/Container'
import React from 'react';

import SiteNav from '../../components/sitenav'
import { list_events } from '../../db/access'

export default class AllEvents extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
            <SiteNav/>
            <Container fluid>
            <h1>List of Events:</h1>
            <ul>
            {
                this.props.events.map((event) => {
                    return (
                        <li key={event.id}>
                            <a href={"event/" + event.id}>{event.title}</a>
                        </li>
                    )
                })
            }
            </ul>
            </Container>
            </>
        )    
    }
}

export async function getServerSideProps() {
    const data = await list_events()
    return { 
        props: {
            events: data,
        },
    }
}
