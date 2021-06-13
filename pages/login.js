import { Container } from "react-bootstrap"
import withSession from '../lib/session'
import SiteNav from '../components/sitenav'


export default function Login(props) {
    return (
        <>
        <SiteNav></SiteNav>
        <section> 
                <div className="main-jumbotron">
                <h1>Let us help you find your next volunteer experience</h1>
                <h4>
                 At VolunteerMe!, we have the best volunteer events available in your area
                </h4>
                <div className="text-center mt-5">
                    <a href="/loginForm" className="btn btn-primary btn-lg outline">Get started</a>
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                >
                    <polygon fill="white" points="0,100 100,0 100,100" />
                </svg>
                </div>
                <style jsx>
                {`
                    svg {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    height: 10vw;
                    }
                    .main-jumbotron {
                    position: relative;
                    height: 90vh;
                    min-height: 300px;
                    background: #0690d8;
                    background: linear-gradient( 
                        90deg
                         ,#50aef9 0%, rgb(52 100 138) 53%, rgb(6 75 130) 100% )
                    }
                    .main-jumbotron h1 {
                    padding-top: 125px;
                    text-align: center;
                    color: white;
                    font-weight: 700;
                    }
                    .main-jumbotron h4 {
                    color: white;
                    margin-top: 25px;
                    font-weight: 600;
                    text-align: center;
                    }
                    .btn.outline {
                    background: none;
                    padding: 12px 22px;
                    }
                    .btn-primary.outline {
                    border: 2px solid #fff;
                    color: #fff;
                    }
                    .btn-primary.outline:hover,
                    .btn-primary.outline:focus,
                    .btn-primary.outline:active,
                    .btn-primary.outline.active,
                    .open > .dropdown-toggle.btn-primary {
                    color: rgba(252, 189, 201, 1);
                    border-color: #fff;
                    background-color: #fff;
                    }
                    .btn-primary.outline:active,
                    .btn-primary.outline.active {
                    border-color: #007299;
                    color: #007299;
                    box-shadow: none;
                    }
                `}
                </style>
                </section> 
        </>
    );
}


