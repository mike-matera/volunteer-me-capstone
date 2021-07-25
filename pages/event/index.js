import Container from 'react-bootstrap/Container'
import React from 'react';
import Button from 'react-bootstrap/Button'
import Header from '../../components/header'
import Details from '../../components/details'
import SectionA from '../../components/sectionA'
import { list_events } from '../../db/access'
import withSession from '../../lib/session'
import Router from 'next/router'
import SiteNav from '../../components/sitenav'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import {
    create_event
} from '../../lib/api'


export default class AllEvents extends React.Component {

    constructor(props) {
        super(props)
        this.newEvent = this.newEvent.bind(this);
    }

    newEvent(ev) {
        create_event()
            .then(result => {
                console.log(result)
                Router.push('/event/' + result.ok.id)
            })
            .catch(error => {
                // TODO: Reload this page on error.
                console.log('ERROR: ', error)
            })
        console.log("Eat me")
    }

    render() {
        return (
            <>
            <SiteNav user={this.props.user}/>
            <Container fluid style={{textAlign:'center', padding: '0px'}}>
            <Header/>
            {/* <SectionA/> */}
            {/* <SectionB/> */}
            {/* <SectionC title={"Developer Bot for Slack"} subtitle={"One article to one random person in your Slack group. Once a day."}/> */}
            <div>
            <h1>Get Involved</h1>
            {/* <ul style={{ justifyContent: 'center', display: 'block'}}>
            {
                this.props.events.map((event) => {
                    return (
                        <li key={event.id}>
                            <a href={"event/" + event.id}>{event.title}</a>
                            <br></br>
                        </li>
                    )
                })
            }
            </ul> */}
          <Row style={{paddingLeft:"10%"}}>
              { this.props.events.map((event) => {
                    return ( [
                            'Light',
                            ].map((variant, idx) => (
            <Card
                bg={variant.toLowerCase()}
                key={idx}
                text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
                style={{ width: '18rem', justifyContent: 'center', display: 'block', margin:"20px"}}
                className="mb-2">
                <Card.Header>Event Name</Card.Header>
                <Card.Body>
                <Card.Title><a href={"event/" + event.id}>{event.title}</a></Card.Title>
                <Card.Text>
                   <Button variant="primary" onClick={"event/" + event.id}>Learn More</Button>
                </Card.Text>
                </Card.Body>
            </Card>

                            ))
                    )})}
            </Row>   
            <Button variant="primary" onClick={this.newEvent}>New Event</Button>
            <Details style={{paddingTop:"10px"}}/>
            </div>
             {/* <Footer/> */}
            </Container>

            </>
        )    
    }
}




export const getServerSideProps = withSession(async function ({ req, res }) {  

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

    // Get the list of events and render them.
    const data = await list_events(user)
    return { 
        props: {
            events: data,
            user: req.session.get('user'),
        },
    }
})
