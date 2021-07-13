import React from 'react';
import withSession from '../lib/session'
import SiteNav from '../components/sitenav'
import EmailListCard from '../components/emailListCard'

class ContactUs extends React.Component{

    render() {
        return (
            <>
          <SiteNav user={this.props.user} />
          <EmailListCard />
          </>
        )
    }
}
export default ContactUs
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