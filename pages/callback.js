import { useEffect, useContext } from 'react';
import Router, { useRouter } from 'next/router';
import createMagic from '../lib/magic';
import Loading from '../components/loading';
import withSession from '../lib/session'

const Callback = (props) => {
  const router = useRouter();
  const magic = createMagic(props.magic_key)

  // The redirect contains a `provider` query param if the user is logging in with a social provider
  useEffect(() => {
    router.query.provider ? finishSocialLogin() : finishEmailRedirectLogin();
  }, [router.query]);

  // `getRedirectResult()` returns an object with user data from Magic and the social provider
  const finishSocialLogin = async () => {
    let result = await magic.oauth.getRedirectResult();
    authenticateWithServer(result.magic.idToken);
  };

  // `loginWithCredential()` returns a didToken for the user logging in
  const finishEmailRedirectLogin = () => {
    if (router.query.magic_credential)
      magic.auth.loginWithCredential().then((didToken) => authenticateWithServer(didToken));
  };

  // Send token to server to validate
  const authenticateWithServer = async (didToken) => {
    let res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + didToken,
      },
    });

    if (res.status === 200) {
      // Set the UserContext to the now logged in user
      Router.push('/profile');
    }
  };

  return <Loading />;
};

export default Callback;

export const getServerSideProps = withSession(async function({req, res, ...context}) {  
  return {
      props: {
        magic_key: process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY,
      }
  }
})
