import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Nav,
  Navbar,
  NavbarToggler,
  Collapse,
  DropdownToggle,
  UncontrolledDropdown,
  NavbarText,
  DropdownMenu,
  DropdownItem,
  Button
} from 'reactstrap'

const DashboardNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)
  return (
    <Nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <Button color="primary">Toggle Menu</Button>
      <Navbar color="light" light expand="md" className="ml-auto  mt-2 mt-lg-0">
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret></DropdownToggle>
              <DropdownMenu right>
                <Link to="/profile">
                  <DropdownItem>My Profile</DropdownItem>
                </Link>
                <DropdownItem divider />
                <DropdownItem>
                  <Link to="/profile">Logout</Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </Nav>
  )
}

export default DashboardNavbar
