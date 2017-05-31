import React from "react";
import {ShallowComponent} from "robe-react-commons";
import {Col} from "reactstrap";

export default class Showcase extends ShallowComponent {
    render(){
        return(
            <Col md={12}>
                <iframe name="I1" width="100%" height="100%" src="http://demo.mebitech.com/robe-react-ui/#Components"></iframe>
            </Col>
        );
    }
}