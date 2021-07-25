import { Container } from "react-bootstrap"
import withSession from '../lib/session'
import SiteNav from '../components/sitenav'


export default function Logout(props) {
    return (
        <>
        <SiteNav user={props.user}/>
        <Container fluid style={{margin:"auto", width:"100%", border:"3px solid green", padding:"60px", textAlign:"center", height:'60vh'}}> 
           
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUiZnwp2n_OPHJ4aHHDMw6zEe4i7ZZVzSHjA&usqp=CAU" />
            <div style={{paddingTop: "38px", fontWeight: "500"}}>You have been logged out successfully</div>
            <div style={{fontWeight: "500"}} ><p>Thank you</p></div>
            
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
