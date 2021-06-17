import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

export default function SiteNav(props) {
  var usernav
  if (props.user) {
    usernav = (
      <>
      <Nav.Link>Welcome {props.user.name}</Nav.Link>
      
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/about">About</Nav.Link>
      <Nav.Link href="/contactUs">Contact Us</Nav.Link>
      <Nav.Link href="/logout">Logout</Nav.Link>
            
      </>
    )
  }
  else {
    usernav = (
      <>
      <Nav.Link href="/login">Login</Nav.Link>
      </>
    )
  }

  return (
  <>
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">Volunteer Me!</Navbar.Brand>
      <Navbar.Collapse >

      <Nav className="mr-auto">
        {usernav}
      </Nav>
      
      </Navbar.Collapse>
    </Navbar>
    <br />
  </>
  )
}
