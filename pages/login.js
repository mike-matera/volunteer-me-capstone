import { useState, useEffect, useContext } from 'react';
import Router from 'next/router';
import createMagic from '../lib/magic';
import EmailForm from '../components/email-form';
import SocialLogins from '../components/social-logins';
import LandingSide from '../components/landing-side-display';
import withSession from '../lib/session'
import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Login = (props) => {
  const [disabled, setDisabled] = useState(false);
  async function handleLoginWithEmail(email) {
    const magic = createMagic(props.magic_key)
    try {
      setDisabled(true); // disable login button to prevent multiple emails from being triggered

      // Trigger Magic link to be sent to user
      let didToken = await magic.auth.loginWithMagicLink({
        email,
        redirectURI: new URL('/callback', window.location.origin).href, // optional redirect back to your app after magic link is clicked
      });

      // Validate didToken with server
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + didToken,
        },
      });

      if (res.status === 200) {
        Router.push('/profile');
      }
    } catch (error) {
      setDisabled(false); // re-enable login button - user may have requested to edit their email
      console.log(error);
    }
  }

  async function handleLoginWithSocial(provider) {
    await magic.oauth.loginWithRedirect({
      provider, // google, apple, etc
      redirectURI: new URL('/callback', window.location.origin).href, // required redirect to finish social login
    });  
  }

  async function handleDevLogin() {
    try {
      // Do dummy login with the server (this only works if in dev mode)
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'DEVMODE',
        },
      });

      if (res.status === 200) {
        Router.push('/profile');
      }
    } catch (error) {
      setDisabled(false); // re-enable login button - user may have requested to edit their email
      console.log(error);
    }
  }

  var dosocial = handleLoginWithSocial
  var doemail = handleLoginWithEmail
  if (process.env.NODE_ENV === 'development') {
    dosocial = handleDevLogin
    doemail = handleDevLogin
  }

  return (
    <Container fluid style={{overflow:"hidden"}}>
    <Row>
    <Col sm={7} style={{paddingLeft:0}}>
    <LandingSide/>
    </Col>
    <Col sm={5}>
      <div className="login">
      {process.env.NODE_ENV === 'development'? <Alert variant="warning">Development Mode</Alert> : ""}
      <EmailForm disabled={disabled} onEmailSubmit={doemail} />
      <SocialLogins onSubmit={dosocial} />
      </div>
    </Col>
      <style jsx>{`
        .login {
          max-width: 40rem;
          margin: 40px auto 0;
          padding: 1rem;
          // border: 1px solid #dfe1e5;
          border-radius: 4px;
          text-align: center;
          // box-shadow: 0px 0px 6px 6px #f7f7f7;
          box-sizing: border-box;
        }
      `}</style>
      </Row>
    </Container>
  );
};

export default Login;

export const getServerSideProps = withSession(async function({req, res, ...context}) {  

  // Check if the user is logged in. If so go to their profile
  const user = req.session.get('user')
  if (user != null) {
      return {
          redirect: {
              destination: '/profile',
              permanent: false,
          }
      }
  }

  let key = process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY
  key = (key)? key : ""
    return {
      props: {
        magic_key: key,

      }
  }
})
