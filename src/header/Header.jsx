import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import AjaxRequest from "robe-react-commons/lib/connections/AjaxRequest";
import {Navbar, Col, Badge, Image, Button, ButtonGroup, NavbarToggler, NavbarBrand, Collapse, Nav, NavItem, NavLink} from "reactstrap";
import FaIcon from "robe-react-ui/lib/faicon/FaIcon";
import Link from "react-router/lib/Link";
import cookie from "react-cookie";
import "./style.css";

export default class Header extends ShallowComponent {
    static propTypes = {
        matches: React.PropTypes.bool,
        toggled: React.PropTypes.bool
    };

    static defaultProps = {
        toggled: false,
        matches: false
    };

    logoutPost = new AjaxRequest({
        url: "logout",
        type: "POST"
    });

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    render() {
        return (
            <Navbar color="faded" toggleable style={{background:"#153647"}} className="robe-header-navbar">
                <Button onClick={this.__onToggle}
                        style={{display: this.props.toggled ? "none" : "inherit", marginTop:6}}
                        className="navbar-toggle pull-left robe-navbar-button" color="link">
                    <FaIcon code="fa-bars"/>
                </Button>
                <Button onClick={this.__onToggle}
                        style={{
                            display: this.props.matches && this.props.toggled ? "inherit" : "none", marginTop:6
                        }}
                        className="navbar-toggle pull-left robe-navbar-button" color="link">
                    <FaIcon code="fa-bars"/>
                </Button>
                <Link to="/">
                    <img src="./logo.png"
                         className="pull-left"
                         style={{marginLeft: 5}}
                         width="30"/>
                </Link>
                <Link to="/">
                    <Col style={{display: this.props.matches ? "none" : "inherit", color:"#FFF", lineHeight:"30px"}}>Robe Sample Application</Col>
                </Link>
                <Link to="/">
                    <Col style={{display: this.props.matches ? "inherit" : "none" ,color:"#FFF", lineHeight:"30px" }}>Robe</Col>
                </Link>
                <Nav className="ml-auto header-navbar-right" navbar>
                    <Button
                        className="robe-navbar-button" color="link">
                        <FaIcon code="fa-user"/>
                    </Button>
                    <Button
                        className="robe-navbar-button" color="link">
                        <FaIcon code="fa-comments-o" />
                        <Badge>{this.state.messageCount}</Badge>
                    </Button>
                    <Button
                        className="robe-navbar-button" color="link">
                        <FaIcon code="fa-bell"/>
                        <Badge>{this.state.notificationCount}</Badge>
                    </Button>
                    <Button
                        className="robe-navbar-button"
                        onClick={this.__onExit} color="link">
                        <FaIcon code="fa-sign-out"/>
                    </Button>
                </Nav>
            </Navbar>
        );
    }



    __onExit = () => {
        cookie.remove('domain');
        cookie.remove('username');
        window.location.hash="";

        this.logoutPost.call(undefined, undefined,
            function (res) {
                location.reload();
            }.bind(this),
            function (res) {
                location.reload();
            }.bind(this));
    };

    __onToggle = () => {
        if (this.props.onToggle)
            this.props.onToggle();
    }  
}
