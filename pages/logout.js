import { Container } from "react-bootstrap"
import withSession from '../lib/session'
import SiteNav from '../components/sitenav'


export default function Logout(props) {
    return (
        <>
        <SiteNav user={props.user}/>
        <Container fluid style={{margin:"auto", width:"100%",
        padding:"60px", textAlign:"center", height:'60vh'}}> 
           
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUiZnwp2n_OPHJ4aHHDMw6zEe4i7ZZVzSHjA&usqp=CAU" />
            <div style={{paddingTop: "58px", fontWeight: "500", fontSize:"19px", color:"#6f6464"}}>You have been logged out successfully</div>
            <div style={{fontWeight: "500", fontSize:"19px", color:"#6f6464"}} ><p>See you soon!</p></div> 
            
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
