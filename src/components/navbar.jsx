import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    // NavbarBrand,
    Nav,
    NavItem,
    // NavLink,
    // UncontrolledDropdown,
    // DropdownToggle,
    // DropdownMenu,
    // DropdownItem,
    // NavbarText
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

//images
import Logo from '../assets/linkmark.png';

class NavComponent extends Component {
    state = {
        isOpen : false
    }
    toggle = () => {

    }
    
    render () {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <img className='logo' alt="linkmarkLogo" src={Logo} />
                    {/* <NavbarBrand href="/">Linkmark</NavbarBrand> */}
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                        {/* <NavLink href="/components/">Components</NavLink> */}
                        </NavItem>
                        <NavItem>
                        </NavItem>
                        {/* <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Dropdown
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>
                            Option 1
                            </DropdownItem>
                            <DropdownItem>
                            Option 2
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>
                            Reset
                            </DropdownItem>
                        </DropdownMenu>
                        </UncontrolledDropdown> */}
                    </Nav>
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='signup'>Signup</NavLink>
                    <NavLink to='about'>About</NavLink>
                    {/* <NavbarText>Simple Text</NavbarText> */}
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default NavComponent;