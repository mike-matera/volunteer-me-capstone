import withSession from '../lib/session'
import SiteNav from '../components/sitenav'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Profile = (props) => {
  return (
    <>
      <SiteNav user={props.user} />
      <div className="card-category" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(https://lendingusa.com/wp-content/themes/FoundationPress/src/assets/images/manage-account-banner.jpg)" }}>
        Account Information
      </div>

      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Card style={{ width: '18rem', boxShadow:"0 10px 35px rgb(50 50 93 / 10%), 0 2px 15px rgb(0 0 0 / 7%)"}}>
              <Card.Img variant="top" style={{ height: "130px", alignSelf: "center", width: "50%" }} src="https://support.logmeinrescue.com/assets/images/care/topnav/default-user-avatar.jpg" />
              <Card.Body>
                <Card.Title>Name</Card.Title>
                <Card.Text>
                  {props.user.name}
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem><div style={{ color: "#6851ff" }}>User Id:</div> {props.user.id}</ListGroupItem>
                <ListGroupItem><div style={{ color: "#6851ff" }}>Email:</div>  {props.user.email} </ListGroupItem>
              </ListGroup>
            </Card>

          </Col>
        </Row>
      </Container>
      <style jsx>{`
        .label {
          font-size: 12px;
          color: #6851ff;
          margin: 30px 0 5px;
        }
        .center-image{
          margin: auto;
          // width: 100%;
          padding: 20px;
      }
        .profile-info {
          font-size: 17px;
          word-wrap: break-word;
        }

        .card-category {
          background-size: cover;
          background-position: center;
          height: 180px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-size: 24px;
          font-weight: bold;
          text-shadow: 1px 1px 3px rgba(0,0,0,0.2);
          box-shadow: 0 0 15px rgba(0,0,0,0.2);
        }

      `}</style>
    </>
  );
};

export default Profile;

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
