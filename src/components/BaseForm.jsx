import React from "react";
import {ShallowComponent,Store,AjaxRequest,Assertions} from "robe-react-commons";
import Card from "../card/PageCard";
import AmCharts from "@amcharts/amcharts3-react";

export default class BaseForm extends ShallowComponent{
    static propTypes = {
        data : React.PropTypes.object,
        title : React.PropTypes.object
    };
    constructor(props){
        super(props);
        let chartData =  {
            "theme": "light",
            "type": "serial",
            "startDuration": 2,
            "dataProvider": [{
                "country": "USA",
                "visits": 2022,
                "color": "#FF0F00"
            }, {
                "country": "China",
                "visits": 1882,
                "color": "#FF6600"
            }, {
                "country": "Japan",
                "visits": 1809,
                "color": "#FF9E01"
            },{
                "country": "Şube",
                "visits": 1809,
                "color": "#CC9E01"
            },{
                "country": "Japan",
                "visits": 1809,
                "color": "#DD9E01"
            }],
            "valueAxes": [{
                "position": "left",
                "title": "Ankara Ulus"
            }],
            "graphs": [{
                "balloonText": "[[category]]: <b>[[value]]</b>",
                "fillColorsField": "color",
                "fillAlphas": 1,
                "lineAlpha": 0.1,
                "type": "column",
                "valueField": "visits"
            }],
            "depth3D": 20,
            "angle": 30,
            "chartCursor": {
                "categoryBalloonEnabled": false,
                "cursorAlpha": 0,
                "zoomable": false
            },
            "categoryField": "country",
            "categoryAxis": {
                "gridPosition": "start",
                "labelRotation": 90
            },
            "export": {
                "enabled": true
            }

        };

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