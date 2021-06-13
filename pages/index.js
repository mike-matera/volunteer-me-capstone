/**
 * Site-level index page. 
 * 
 * 
 * For now just redirects to the event list page. 
 *
 */
 import withSession from '../lib/session'

export default function Page() {
    return (<h1>Nothing to see here.</h1>)
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
    else {
        return {
            redirect: {
                destination: '/event',
                permanent: false,
            }
        }
    }
})
