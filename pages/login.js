import { Container } from "react-bootstrap"
import withSession from '../lib/session'
import SiteNav from '../components/sitenav'

export default function Login(props) {
    return (
        <>
        <SiteNav></SiteNav>
        <Container fluid>
        <form method="post">
            <label>
                <span>Email:</span>
                <input type="text" name="username" />
            </label>
            <label>
                <span>Password:</span>
                <input type="password" name="password" />
            </label>
            {props.error && <p className="error">{props.error}</p>}
            <button type="submit">Login</button>
            <style jsx>{`
                form {
                    padding-top: 5em;
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
            `}</style>
        </form>
        </Container>
        </>
    )
}

export const getServerSideProps = withSession(async function({req, res}) {  
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

