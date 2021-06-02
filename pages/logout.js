import { Container } from "react-bootstrap"
import withSession from '../lib/session'
import SiteNav from '../components/sitenav'

export default function Logout(props) {
    return (
        <>
        <SiteNav user={props.user}/>
        <Container fluid>
            Goodbye!
        </Container>
        </>
    )
}

export const getServerSideProps = withSession(async function ({ req, res }) {  
    req.session.destroy()
    return { 
        props: {},
    }
})
