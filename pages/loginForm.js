import { Container } from "react-bootstrap"
import withSession from '../lib/session'
import SiteNav from '../components/sitenav'


export default function LoginForm(props) {
    return (
        <>
        <SiteNav></SiteNav>
        <Container fluid style={{ position: "relative", margin: "100px auto 0", width: "400px", padding: "25px", background: "rgba(255, 255, 255, 0.13)", borderRadius:"2px", color: "#fff", boxShadow: "0px 0px 16px 9px rgb(0 0 0 / 7%)"}}>
        <form method="post">
              <h1 style={{color: "#827979",fontSize: 30}}> Welcome Back!</h1> 
            <label>
                {/* <span>Email:</span> */}
                <input type="text" name="username" placeholder="Email" />
            </label>
            <label>
                {/* <span>Password:</span> */}
                <input type="password" name="password" placeholder="Password" />
            </label>
            { props.error && <p className="error">{props.error}</p> }
            <button type="submit" className="buttonStyle" style={{background: "#0690d8", color: "#fff"}}>Login</button>
            <style jsx>{`
                form {
                    padding-top: 1em;
                    max-width: 500px;
                    margin: auto;
                }
                form, label {
                    display: flex;
                    flex-flow: column;
                }
                label > span {
                    font-weight: 600;
                }
                input {
                    padding: 8px;
                    margin: 0.3rem 0 1rem;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }
                .error {
                    color: brown;
                    margin: 1rem 0 0;
                }
                #container-block{
                    position: relative;
                    margin: 100px auto 0;
                    width: 285px;
                    padding: 25px;
                    background: rgba(255, 255, 255, 0.13);
                    border-radius: 2px;
                    color: #fff;
                    -webkit-box-shadow: 0px 0px 16px 9px rgb(0 0 0 / 7%);
                    -moz-box-shadow: 0px 0px 16px 9px rgba(0, 0, 0, 0.07);
                    box-shadow: 0px 0px 16px 9px rgb(0 0 0 / 7%);
                }
                body{
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 100%;
                    overflow-y: scroll;
                    background-image: url(https://www.moneycrashers.com/wp-content/uploads/2013/03/volunteer-help-search-team-work-support-1068x713.jpg);
                    background-repeat: no-repeat;
                    background-size: cover;
                    opacity: 0.92;
                }
                .buttonStyle{
                    display: inline-block;
                    padding: 10px 10px;
                    margin-bottom: 0;
                    font-size: 16px; 
                    font-weight: 400;
                    text-transform: uppercase;
                    text-align: center;
                    white-space: nowrap;
                    vertical-align: middle;
                    cursor: pointer;
                    background-image: none;
                    border: none;
                    border-radius: 2px;
                    box-shadow: 0px 0px 13px 8px rgb(0 0 0 / 10%);
                }
            `}</style>
        </form >
        </Container >
        </>
    );
}


export const getServerSideProps = withSession(async function ({ req, res }) {
    if (req.method == 'POST') {
        try {
            // TODO: Validate User!!! 
            const prisma = require('../db/prisma')
            const userdata = await prisma.user.findUnique({
                where: {
                    email: "test@test.test",
                }
            })
            req.session.set('user', userdata)
            await req.session.save()
            return {
                redirect: {
                    destination: '/event',
                    permanent: false,
                }
            }
        } catch (error) {
            console.log(error)
            return {
                props: {
                    error: "There was an error: " + String(error)
                }
            }
        }
    }
    else {
        return {
            props: {},
        }
    }
})



