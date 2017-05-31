import React from "react";
import {ShallowComponent} from "robe-react-commons";

export default class Application extends ShallowComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h3>TODO</h3>
                <p>Hello World.</p>
            </div>
        )
    }
}