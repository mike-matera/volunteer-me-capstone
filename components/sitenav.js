import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

export default function SiteNav(config) {
    return (
<>
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/">Volunteer Here</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
    </Nav>
    <Nav className="mr-sm-2"><Nav.Link>Welcome User!</Nav.Link></Nav>
  </Navbar>
  <br />
</>
    )
}
