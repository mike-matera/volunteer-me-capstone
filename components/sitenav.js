import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

export default function SiteNav(props) {
  var usernav
  if (props.user) {
    usernav = (
      <>
      <Nav className="mr-sm-2"><Nav.Link>Welcome {props.user.name}!</Nav.Link></Nav>
      <Nav className="mr-sm-2"><Nav.Link href="/logout">Logout</Nav.Link></Nav>
      </>
    )
  }
  else {
    usernav = (
      <>
      <Nav className="mr-sm-2"><Nav.Link href="/login">Login</Nav.Link></Nav>
      </>
    )
  }

  return (
  <>
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">Volunteer Here</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
      </Nav>
      {usernav}
    </Navbar>
    <br />
  </>
  )
}
