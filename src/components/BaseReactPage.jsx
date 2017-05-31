import React from "react";
import {ShallowComponent,AjaxRequest,Assertions} from "robe-react-commons";

export default class BaseReactPage extends ShallowComponent{
    constructor(props:Object){
        super(props);
        this.componentWillReceiveProps(props);
        this.state = {
            first : "first"
        }
    }
    componentWillReceiveProps(props){
        this.state = {
            first : "second"
        }
    }
    render(){
        return(<div>{this.state.first}</div>);
    }
    //2
    componentDidMount(){
        console.log("Ben didMount");
    }
    //4
    componentDidUpdate(){
        console.log("Ben didUpdate");
    }
    //1
    componentWillMount(){
        console.log("Ben willMount");
    }
    //3
    componentWillUpdate(){
        console.log("Ben willUpdate");
    }
    /*shouldComponentUpdate(){
        console.log("Ben shouldComponentUpdate");
    }*/

}