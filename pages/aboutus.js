import { Container } from "react-bootstrap"
import withSession from '../lib/session'
import SiteNav from '../components/sitenav'
import Team from '../components/team'

export default function AboutUs(props) {
    return (
        <>
        <SiteNav user={props.user}/>
                
        <Team/>
        </>
    )
}

export const getServerSideProps = withSession(async function ({ req, res }) {  
    req.session.destroy()
    return { 
        props: {},
    }
})
