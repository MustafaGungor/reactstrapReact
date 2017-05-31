import React from "react";
import {ShallowComponent,Store,AjaxRequest,Assertions} from "robe-react-commons";
import Card from "../card/PageCard";
import AmCharts from "@amcharts/amcharts3-react";

export default class BaseForm extends ShallowComponent{
    static propTypes = {
        data : React.PropTypes.object
    };
    constructor(props){
        super(props);
        let chartData = {
            "type": "pie",
            "theme": "light",  //dark or light
            "dataProvider": [ {
                "country": "Lithuania",
                "value": 260
            }, {
                "country": "Ireland",
                "value": 201
            }, {
                "country": "Germany",
                "value": 65
            }, {
                "country": "Australia",
                "value": 39
            }, {
                "country": "UK",
                "value": 19
            }, {
                "country": "Latvia",
                "value": 10
            } ],
            "valueField": "value",
            "titleField": "country",
            "outlineAlpha": 0.4,
            "depth3D": 15,
            "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
            "angle": 30,
            "export": {
                "enabled": true
            }
        }

        this.state = {
            data : chartData
        }
    }
    render(){
        let chartData = this.state.data;
        return(
            <div>
                <AmCharts.React {...chartData}/>
            </div>
        );
    }
}