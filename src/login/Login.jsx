import React from "react";
import {ShallowComponent, AjaxRequest} from "robe-react-commons";
import {Form, Alert, Button, Col, InputGroupAddon, Card} from "reactstrap";
import TextInput from "robe-react-ui/lib/inputs/TextInput";
import PasswordInput from "robe-react-ui/lib/inputs/PasswordInput";
import FaIcon from "robe-react-ui/lib/faicon/FaIcon";
import Toast from "robe-react-ui/lib/toast/Toast";
import SHA256 from "crypto-js/sha256";
import cookie from "react-cookie";

class Login extends ShallowComponent {

    loginPost = new AjaxRequest({
        url: "login",
        type: "POST"
    });

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            rememberme: false
        };
    }

    render() {
        return (
            <div className="center-block"
                 style={{maxWidth: 350, margin:"30px auto"}}>
                <Card>
                    <Form>
                        <div style={{textAlign: "center", marginBottom: "30px", background:"#153647", padding:"15px"}}>
                            <img src="./logo.png" style={{margin:"0 auto", height:"150px"}}/>
                        </div>
                        <Col>
                            <TextInput
                                ref="username"
                                type="email"
                                name="username"
                                placeholder="Username"
                                value={this.state.username}
                                onChange={this.__handleChange}
                                inputGroupLeft={<InputGroupAddon><FaIcon code="fa-user"/></InputGroupAddon>}
                                validationDisplay="block"
                                onKeyPress={this.__onKeyPress}
                            />
                        </Col>
                        <Col>
                            <PasswordInput
                                ref="password"
                                name="password"
                                className="form-control"
                                value={this.state.password}
                                onChange={this.__handleChange}
                                inputGroupLeft={<InputGroupAddon><FaIcon code="fa-lock"/></InputGroupAddon>}
                                placeholder="Password"
                                onKeyPress={this.__onKeyPress}
                            />
                        </Col>
                        <Col>
                            <Button
                                ref="submitBtn"
                                onClick={this.__handleSubmit}
                                color="primary"
                                block
                            >
                                Login
                            </Button>
                        </Col>
                        <br/>
                        <Col>
                            <Alert color="info">
                                <span>Username :<b> admin</b></span>
                                <br/>
                                <span>Password :<b> 123123</b></span>
                            </Alert>
                        </Col>
                    </Form>
                </Card>
            </div>
        );
    }

    __handleChange(e) {
        let state = {};
        state[e.target.name] = e.target.value;
        this.setState(state);
        return true;
    }

    __handleSubmit() {
        cookie.remove("auth-token");
        var username = this.state.username.trim();
        var password = this.state.password.trim();

        if (!password || !username) {
            return;
        }

        let data = {
            username: username,
            password: SHA256(password).toString()
        };


        this.loginPost.call(data, undefined, this.__loginSuccess, this.__loginError);
    }

    __loginSuccess(response) {

        cookie.save('username', response.username);
        location.reload();
    }

    __loginError(response, textStatus, xhr) {
        var text = response.responseText;
        switch (response.status) {
            case 200:
                text = "";
                break;
            case 401:
                text = "Kullanıcı adı ya da şifre hatalı girdiniz.";
                break;
            case 500:
                if (text == "User blocked.") {
                    text = "Çok fazla hatalı giriş yaptınız.";
                }
                else {
                    text = "Kullanıcı adı ya da şifre hatalı girdiniz.";
                }
                break;
            default:
                text = "Lütfen daha sonra tekrar deneyiniz.";
                break;
        }
        Toast.error(text);
    }

    __onKeyPress(e) {
        if (e.key == "Enter")
            this.__handleSubmit();
    }
}

module.exports = Login;
