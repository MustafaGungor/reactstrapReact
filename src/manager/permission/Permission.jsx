import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import {ButtonToolbar, Col, Row,NavLink, Nav,NavItem,TabContent,TabPane, ButtonGroup } from "reactstrap";
import AjaxRequest from "robe-react-commons/lib/connections/AjaxRequest";
import CheckTree from "robe-react-ui/lib/checktree/CheckTree";
import RadioInput from "robe-react-ui/lib/inputs/RadioInput";
import Button from "robe-react-ui/lib/buttons/Button";
import Toast from "robe-react-ui/lib/toast/Toast";
import PageCard from "../../card/PageCard";
import "./style.css";

export default class Permission extends ShallowComponent {

    static idField = "id";

    constructor(props) {
        super(props);

        this.state = {
            roleId: undefined,
            roleData: [],
            permissionServices: [],
            permissionServiceData: [],
            permissionMenus: [],
            permissionMenuData: [],
            activeTab :'service'
        };
    }
    __toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    render() {
        let saveFunc = this.state.activeTab === "service" ? this.__saveServices : this.__saveMenus;
        return (
            <PageCard header="İzin Yönetimi">
                <Row>
                    <Col sm={4}>
                        <RadioInput
                            label="Roller"
                            name="roleId"
                            items={this.state.roleData}
                            value={this.state.roleId}
                            textField="name"
                            valueField={Permission.idField}
                            formControl={false}
                            onChange={this.__handleChangeRole}/>
                    </Col>
                    <Col sm={8}>
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={(this.state.activeTab == "service")?"active":""}
                                    onClick={() => { this.__toggle('service'); }}
                                >
                                   Servis İzinleri
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={(this.state.activeTab == "menu")?"active":""}
                                    onClick={() => { this.__toggle('menu'); }}
                                >
                                   Menu İzinleri
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="service">
                                <Row>
                                    <Col sm="12">
                                        <div className="tree-list">
                                            <CheckTree
                                                name="permissionServices"
                                                ref="permissionServices"
                                                items={this.state.permissionServiceData}
                                                value={this.state.permissionServices}/>
                                        </div>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="menu">
                                <Row>
                                    <Col sm="12">
                                        <div className="tree-list">
                                            <CheckTree
                                                name="permissionMenus"
                                                ref="permissionMenus"
                                                items={this.state.permissionMenuData}
                                                value={this.state.permissionMenus}/>
                                        </div>
                                    </Col>
                                </Row>
                            </TabPane>
                        </TabContent>
                        <br/>
                        <ButtonToolbar className="pull-right">
                            <ButtonGroup>
                                <Button
                                    disabled={this.state.roleId === undefined}
                                    onClick={this.__resetPermission}
                                    color="primary">Temizle</Button>
                                <Button
                                    disabled={this.state.roleId === undefined}
                                    onClickAsync={saveFunc}
                                    color="info">Kaydet</Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                        <br/>
                        <br/>
                    </Col>
                </Row>
            </PageCard>)
    }

    __handleChangeRole(e) {
        let state = {};
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        state[e.target.name] = value;
        this.setState(state);
        this.__readPermissionMenuByRole(value);
        this.__readPermissionServiceByRole(value);
    }

    __saveServices(e, done) {
        if (!this.state.roleId) return;

        this.request = new AjaxRequest({
            url: "permissions/configurePermission/" + this.state.roleId,
            type: "POST"
        });
        let data = this.refs.permissionServices.getSelectedItems();
        this.request.call(data, undefined,
            () => {
                done();
                Toast.success("Servis izinleri kaydedildi");
            },
            () => {
                done();
                Toast.error("Kayıt yapılamadı.");
            });

    }

    __saveMenus(e, done) {
        if (!this.state.roleId) return;

        this.request = new AjaxRequest({
            url: "permissions/configuresMenu/" + this.state.roleId,
            type: "POST"
        });

        let data = this.refs.permissionMenus.getSelectedItems();

        this.request.call(data, undefined,
            function (response) {
                done();
                Toast.success("Menu izinleri kaydedildi.");
            }, () => {
                done();
                Toast.error("Kayıt yapılamadı.");
            });
    }

    __resetPermission() {
        if (!this.state.roleId) return;
        this.__readPermissionMenuByRole(this.state.roleId);
        this.__readPermissionServiceByRole(this.state.roleId);
    }

    __readPermissionServiceByRole(roleId) {

        let getPermissionRequest = new AjaxRequest({
            url: "permissions/endPoints/" + roleId,
            type: "GET"
        });

        getPermissionRequest.call(undefined, undefined,
            (res) => {
                this.setState({permissionServices: res});
            });
    }

    __readPermissionMenuByRole(roleId) {

        let getPermissionMenuRequest = new AjaxRequest({
            url: "permissions/menus/" + roleId,
            type: "GET"
        });

        getPermissionMenuRequest.call(undefined, undefined,
            (res) => {
                this.setState({permissionMenus: res});
            });
    }

    __readroleData() {

        let getRoleRequest = new AjaxRequest({
            url: "roles",
            type: "GET"
        });

        getRoleRequest.call(undefined, undefined,
            (res) => {
                this.setState({roleData: res});
            });
    }

    __readPermissionService() {

        let getPermissionRequest = new AjaxRequest({
            url: "permissions/endPoints",
            type: "GET"
        });

        getPermissionRequest.call(undefined, undefined,
            (res) => {
                this.setState({permissionServiceData: res});
            });
    }

    __readPermissionMenu() {

        let getPermissionMenuRequest = new AjaxRequest({
            url: "permissions/menus",
            type: "GET"
        });

        getPermissionMenuRequest.call(undefined, undefined,
            (res) => {
                this.setState({permissionMenuData: res});
            });
    }

    componentDidMount() {
        this.__readroleData();
        this.__readPermissionService();
        this.__readPermissionMenu();
    }
}