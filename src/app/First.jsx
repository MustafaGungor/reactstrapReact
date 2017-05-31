import React from "react";
import {ShallowComponent,Store,Assertions,RemoteEndPoint} from "robe-react-commons";
import DataGrid from "robe-react-ui/lib/datagrid/DataGrid";
import ModalDataForm from "robe-react-ui/lib/form/ModalDataForm";
import {Button} from "reactstrap";
import FirstModel from "./FirstModel.json";

export default class First extends ShallowComponent{
    static idField = "id";
    constructor(props : Object){
        super(props);
        let store = new Store({
            endPoint: new RemoteEndPoint({
                url: "firsts",
                idField: First.idField
            }),
            idField: First.idField,
            autoLoad: true
        });
        this.state = {
            store : store,
            fields : FirstModel.fields
        }

    }
    render(){
        return(<div>
           <DataGrid fields={this.state.fields}
                     store={this.state.store}/>

        </div>);
    }

    __onClick(e:Object){
        debugger;
    }
}