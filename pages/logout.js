import { Container } from "react-bootstrap"
import withSession from '../lib/session'
import SiteNav from '../components/sitenav'


export default function Logout(props) {
    return (
        <>
        <SiteNav user={props.user}/>
        <Container fluid style={{margin:"auto", width:"50%", border:"3px solid green", padding:"10px", textAlign:"center"}}> 
           
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUiZnwp2n_OPHJ4aHHDMw6zEe4i7ZZVzSHjA&usqp=CAU" />
            <div >You have been logged out successfully</div>
            <div ><p>Thank you</p></div>
            
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
