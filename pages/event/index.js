import Container from 'react-bootstrap/Container'
import React from 'react';
import Button from 'react-bootstrap/Button'
import Header from '../../components/header'
import Details from '../../components/details'
import Divider from '../../components/divider'
import Footer from '../../components/footer'
import { list_events } from '../../db/access'
import withSession from '../../lib/session'
import Router from 'next/router'
import SiteNav from '../../components/sitenav'
import Card from 'react-bootstrap/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { config, dom } from "@fortawesome/fontawesome-svg-core";
import Row from 'react-bootstrap/Row'
import Head from "next/head";
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
                <Head><style>{dom.css()}</style></Head>
                <SiteNav user={this.props.user} />
                <Container fluid style={{ textAlign: 'center', padding: '0px' }}>
                    <Header />
                    <Card className="text-center">
                        <Card.Header>Featured</Card.Header>
                        <Card.Body style={{ padding: "2.5rem 1rem" }}>
                            <Card.Title>Post an event</Card.Title>
                            <Card.Text>
                                Provide volunteer opportunities and Engage your community.
                </Card.Text>
                            <div type="button" id="btn-custom" onClick={this.newEvent}> Create New Event</div>
                        </Card.Body>
                        <Card.Footer className="text-muted"><a href="#identifier"><FontAwesomeIcon icon={faArrowDown} size="lg" /></a></Card.Footer>
                    </Card>

                    {/* <SectionA/> */}
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
                    <div>
                        <div style={{ padding: "100px 0", background: "#f6f6f6" }}>
                            <h1 id="identifier">Get Involved - New Events Featured</h1>
                            <Divider />
                            <Row style={{ paddingLeft: "15%", }}>
                                {this.props.events.map((event) => {
                                    return ([
                                        'Light',
                                    ].map((variant, idx) => (
                                        <Card
                                            bg={variant.toLowerCase()}
                                            key={idx}
                                            text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
                                            style={{ width: '18rem', justifyContent: 'center', display: 'block', margin: "20px" }}
                                            className="mb-2">
                                            <Card.Header>Event Name</Card.Header>
                                            <Card.Body>
                                                <Card.Title><a href={"event/" + event.id}>{event.title}</a></Card.Title>
                                                <Card.Text>
                                                    <a id="btn-custom" href={"event/" + event.id}>Learn More</a>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>

                                    ))
                                    )
                                })}
                            </Row>
                        </div>
                        <div style={{ padding: "100px 0" }}>
                        <h1 id="identifier">Our Missions</h1>
                            <Divider />
                            <Details />
                        </div>
                    </div>
                    <Footer></Footer>
                    <style jsx>{
                        `#btn-custom {
                        display: inline-block;
                        font-family: 'Raleway', sans-serif;
                        text-transform: uppercase;
                        color: #fff;
                        background-color: #5ca9fb;
                        background-image: linear-gradient(to right, #5ca9fb 0%, #6372ff 100%);
                        padding: 14px 34px;
                        letter-spacing: 1px;
                        margin: 0;
                        font-size: 15px;
                        font-weight: 500;
                        border-radius: 25px;
                        transition: all 0.5s linear;
                        border: 0;
                    }
                    
                    #identifier{
                        text-transform: uppercase;
                        margin: 0 0 20px 0;
                        font-weight: 700;
                        font-size: 33px;
                        color: #333;
                    }`}
                    </style>
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
