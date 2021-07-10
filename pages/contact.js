import { Container } from "react-bootstrap"
import withSession from '../lib/session'
import SiteNav from '../components/sitenav'
import EmailListCard from '../components/emailListCard'


export default function Contact(props) {
    return (
        <>
        <SiteNav user={props.user}/>                
        <EmailListCard />
        </>
    )
}

export const getServerSideProps = withSession(async function ({ req, res }) {  
    req.session.destroy()
    return { 
        props: {},
    }
})