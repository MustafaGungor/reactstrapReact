import React from "react";
import {ShallowComponent} from "robe-react-commons";
import TodoApp from "./TodoApp";
import Button from "robe-react-ui/lib/buttons/Button";
export default class Todo extends ShallowComponent{
    constructor(props){
        super(props);
        this.state = {
            data : [{name:1},{name:2},{name:3}]
        }

    }
    render(){
        return(
            <div>
                deneme
                {this.__onClickFunction(this.state.data)}
            </div>
        );
    }
    __onClick(e:Object){
        debugger;
    }
    __onClickFunction(deneme: Object){
        let buttons = [];
        let me = this;
        deneme.forEach(function (v,i) {
            debugger;
            buttons.push(<Button ref={"button"+i} onClick={me.__onClick}> {v.name}</Button>);
        });
        return (buttons);
    }
}