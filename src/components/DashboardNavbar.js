import React, { useState } from 'react'
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
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Logout</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText>Simple Text</NavbarText>
        </Collapse>
      </Navbar>
    </Nav>
  )
}

export default DashboardNavbar
