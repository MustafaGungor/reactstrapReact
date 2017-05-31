import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import SideMenu from "robe-react-ui/lib/sidemenu/SideMenu";
import {Col, Card, Row} from "reactstrap";
import Header from "./../header/Header";

export default class Workspace extends ShallowComponent {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            toggled: false,
            selectedMenu:"Manager"
        };
    }


    render() {
        let toggled = this.state.toggled == false ? 0 : 290;
        let contentWidth = "calc(100% - "+ toggled +"px)";
        let content = this.props.children;
        let selectedMenu = this.state.selectedMenu;
        if (content == undefined){
            content = (<div><h3>Workspace</h3><p>Hello World...</p></div>);
        }
        return (
            <div>
                <Header
                    matches={this.state.matches}
                    toggled={this.state.toggled}
                    onToggle={this.__changeMenu} />
                    <Col
                        id="sideMenu"
                        style={{width: toggled, background:"#1f4152", padding:0}}
                        className="side-menu">
                            <div style={{padding:15}}>
                                <SideMenu
                                    items={this.props.route.menu}
                                    selectedItem={this.state.selectedMenu}
                                    onChange={this.__handleChange}/>
                            </div>
                    </Col>
                <Col
                    id="content"
                    className="content"
                    style={{height: window.innerHeight - 55, marginLeft: toggled, width:contentWidth, overflowY:"auto"}}
                    onClick={this.__closeMenu}>
                    {content}
                </Col>
            </div>
        );
    }

    __handleChange = (item) => {
        if (item.path != ""){
            this.context.router.push(item.module);
        }
        this.setState({selectedMenu:item.module})
    };

    __closeMenu = () => {
        if (this.state.matches == true) {
            this.setState({
                toggled: false
            });
        }
    };
    __changeMenu = () => {
        if (this.state.matches == true) {
            this.setState({
                toggled: !this.state.toggled
            });
        }
    };

    __mediaQueryChanged = (mql) => {
        this.setState({
            toggled: !mql.matches,
            matches: mql.matches
        });

    };

    componentWillMount() {
        const mql = window.matchMedia("screen and (max-width: 768px)");
        mql.addListener(this.__mediaQueryChanged);
        this.setState({matches: mql.matches, toggled: !mql.matches});

        this.context.router.listen(this.__closeMenu);

        let initialSelection = window.location.pathname.slice(window.location.pathname.lastIndexOf("/") + 1);
        if (initialSelection) {
            this.context.router.push(initialSelection);
        }
    }

    componentWillUnmount() {
        this.state.mql.removeListener(this.__mediaQueryChanged);
        this.context.router.listen(null);
    }
}
