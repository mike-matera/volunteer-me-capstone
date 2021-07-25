import React from 'react';
import withSession from '../lib/session'
import SiteNav from '../components/sitenav'
import Image from 'next/image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class About extends React.Component {

    render() {
        return (
            <div>
                <SiteNav user={this.props.user} />
                <div id="about" style={{ padding: '100px 0' }}>
                    <Container>
                        <Row>
                            <Col md={6}>
                                <Image className="laptop" src="/volunteer hands image.png" width="1000" height="700" />
                            </Col>
                            <Col md={6}>
                                <div className="about-text">
                                    <h2>About Us</h2>
                                    <hr></hr>
                                    <p id="aboutDescrip">VolunteerMe! provides organizations with a tool that puts them in control of important aspects of managing personnel and hours. There is a system for the volunteers to communicate concerns and comments to the organization. Each aspect of the site provides an organization with the tools to ensure proper tracking of their volunteer events.</p>
                                    <h3 id="why">Why Choose Us?</h3>
                                    <Row>
                                        <Col sm={6}>
                                            <ul className="sample">
                                                <li>Facilitates the volunteer process</li>
                                                <li>Verified Events</li>
                                                <li>Reliable Interface</li>
                                                <li>Add Roles</li>
                                            </ul>
                                        </Col>
                                        <Col sm={6}>
                                            <ul className="sample">
                                                <li>Make a difference</li>
                                                <li>Available online</li>
                                                <li>Update Volunteer Shift</li>
                                                <li>User authentication </li>
                                            </ul>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <style jsx>{
                    `
             h2{
                padding-top: 23px;
                text-transform: uppercase;
                margin: 0 0 20px 0;
                font-weight: 700;
                font-size: 33px;
                color: #333;
              }

              hr{
                background: linear-gradient(to right, #5ca9fb 0%, #6372ff 100%);
                height: 4px;
                width: 60px;
                bottom: 0;
                left: 0;
              }

              #aboutDescrip{
                line-height: 24px;
                margin: 30px 0;
              }
              #why{
                font-size: 22px;
                margin: 0 0 20px 0;
                font-size: 20px;
                font-weight: 600;
                color: #333;
            }

            li:before {
                content: "✔️";
                color:#0588d8;
              }
              ul {
                list-style: none;
             }
              `}</style>
            </div>

        )
    }
}
export default About
export const getServerSideProps = withSession(async function ({ req, res, ...context }) {

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

    // Render the event page.
    return {
        props: {
            user: req.session.get('user'),
        }
    }
})