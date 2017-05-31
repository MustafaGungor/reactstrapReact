import React from "react";
import {ShallowComponent} from "robe-react-commons";
import AmCharts from "@amcharts/amcharts3-react";
import Card from "./../card/PageCard";
import {Col,Row} from "reactstrap";
import PieChart from "../components/TurkMap";
import LineChart from "../components/BaseForm";
import ComplexChart from "./ComplexChart";
export default class Maps extends ShallowComponent{
    constructor(props:Object){
        super(props);
        this.defaultMap = "usaLow";
        this.geo = {"country_code":"TR","country_name":"Turkey"};
        this.countryMaps = {
            "AF": [ "afghanistanLow" ],
            "AL": [ "albaniaLow" ],
            "DZ": [ "algeriaLow" ],
            "AD": [ "andorraLow" ],
            "AO": [ "angolaLow" ],
            "AR": [ "argentinaLow" ],
            "AM": [ "armeniaLow" ],
            "AU": [ "australiaLow" ],
            "AT": [ "austriaLow" ],
            "AZ": [ "azerbaijanLow" ],
            "BS": [ "bahamasLow" ],
            "BH": [ "bahrainLow" ],
            "BD": [ "bangladeshLow" ],
            "BY": [ "belarusLow" ],
            "BE": [ "belgiumLow" ],
            "BZ": [ "belizeLow" ],
            "BT": [ "bhutanLow" ],
            "BO": [ "boliviaLow" ],
            "BA": [ "bosniaHerzegovinaCantonsLow" ],
            "BW": [ "botswanaLow" ],
            "BR": [ "brazilLow" ],
            "BN": [ "bruneiDarussalamLow" ],
            "BG": [ "bulgariaLow" ],
            "BF": [ "burkinaFasoLow" ],
            "BI": [ "burundiLow" ],
            "KH": [ "cambodiaLow" ],
            "CM": [ "cameroonLow" ],
            "CA": [ "canadaLow" ],
            "CV": [ "capeVerdeLow" ],
            "CF": [ "centralAfricanRepublicLow" ],
            "TD": [ "chadLow" ],
            "CL": [ "chileLow" ],
            "CN": [ "chinaLow" ],
            "CO": [ "colombiaLow" ],
            "CD": [ "congoDRLow" ],
            "CG": [ "congoLow" ],
            "CR": [ "costaRicaLow" ],
            "HR": [ "croatiaLow" ],
            "CU": [ "cubaLow" ],
            "CY": [ "cyprusLow" ],
            "UN": [ "cyprusNorthernCyprusLow" ],
            "GB": [ "unitedKingdomLow" ],
            "CZ": [ "czechRepublicLow" ],
            "DK": [ "denmarkLow" ],
            "DJ": [ "djiboutiLow" ],
            "DO": [ "dominicanRepublicLow" ],
            "EC": [ "ecuadorLow" ],
            "EG": [ "egyptLow" ],
            "SV": [ "elSalvadorLow" ],
            "EE": [ "estoniaLow" ],
            "FI": [ "finlandLow" ],
            "FR": [ "france2016Low" ],
            "GE": [ "georgiaLow" ],
            "DE": [ "germanyLow" ],
            "GR": [ "greeceLow" ],
            "GT": [ "guatemalaLow" ],
            "GN": [ "guineaLow" ],
            "GY": [ "guyanaLow" ],
            "HT": [ "haitiLow" ],
            "HN": [ "hondurasLow" ],
            "HK": [ "hongKongLow" ],
            "HU": [ "hungaryLow" ],
            "GL": [ "icelandLow" ],
            "IS": [ "icelandLow" ],
            "IN": [ "indiaLow" ],
            "ID": [ "indonesiaLow" ],
            "MY": [ "malaysiaLow" ],
            "IR": [ "iranLow" ],
            "IQ": [ "iraqLow" ],
            "IE": [ "irelandLow" ],
            "IL": [ "israelLow" ],
            "PS": [ "palestineLow" ],
            "VA": [ "italyLow" ],
            "SM": [ "sanMarinoLow" ],
            "MT": [ "italyLow" ],
            "IT": [ "italyLow" ],
            "JM": [ "jamaicaLow" ],
            "JP": [ "japanLow" ],
            "KZ": [ "kazakhstanLow" ],
            "KE": [ "kenyaLow" ],
            "XK": [ "kosovoLow" ],
            "KG": [ "kyrgyzstanLow" ],
            "LA": [ "laosLow" ],
            "LV": [ "latviaLow" ],
            "LT": [ "lithuaniaLow" ],
            "LU": [ "luxembourgLow" ],
            "MK": [ "macedoniaLow" ],
            "ML": [ "maliLow" ],
            "MX": [ "mexicoLow" ],
            "MD": [ "moldovaLow" ],
            "MN": [ "mongoliaLow" ],
            "ME": [ "montenegroLow" ],
            "MA": [ "moroccoLow" ],
            "MM": [ "myanmarLow" ],
            "NP": [ "nepalLow" ],
            "NL": [ "netherlandsLow" ],
            "NZ": [ "newZealandLow" ],
            "NI": [ "nicaraguaLow" ],
            "NG": [ "nigeriaLow" ],
            "NO": [ "norwayLow" ],
            "AE": [ "unitedArabEmiratesLow" ],
            "OM": [ "omanLow" ],
            "PK": [ "pakistanLow" ],
            "PA": [ "panamaLow" ],
            "PY": [ "paraguayLow" ],
            "PE": [ "peruLow" ],
            "PH": [ "philippinesLow" ],
            "PL": [ "polandLow" ],
            "PT": [ "portugalLow" ],
            "PR": [ "puertoRicoLow" ],
            "US": [ "usaLow" ],
            "QA": [ "qatarLow" ],
            "RO": [ "romaniaLow" ],
            "RW": [ "rwandaLow" ],
            "SA": [ "saudiArabiaLow" ],
            "RS": [ "serbiaLow" ],
            "SG": [ "singaporeLow" ],
            "SK": [ "slovakiaLow" ],
            "SI": [ "sloveniaLow" ],
            "LS": [ "southAfricaLow" ],
            "ZA": [ "southAfricaLow" ],
            "KR": [ "southKoreaLow" ],
            "ES": [ "spainLow" ],
            "LK": [ "sriLankaLow" ],
            "SR": [ "surinameLow" ],
            "SE": [ "swedenLow" ],
            "CH": [ "switzerlandLow" ],
            "SY": [ "syriaLow" ],
            "TW": [ "taiwanLow" ],
            "TJ": [ "tajikistanLow" ],
            "TH": [ "thailandLow" ],
            "TR": [ "turkeyLow" ],
            "UG": [ "ugandaLow" ],
            "UA": [ "ukraineLow" ],
            "GG": [ "unitedKingdomLow" ],
            "JE": [ "unitedKingdomLow" ],
            "IM": [ "unitedKingdomLow" ],
            "UY": [ "uruguayLow" ],
            "UZ": [ "uzbekistanLow" ],
            "VE": [ "venezuelaLow" ],
            "VN": [ "vietnamLow" ],
            "YE": [ "yemenLow" ]
        };

        this.titles = [];
        this.currentMap = "usaLow";
        if ( this.countryMaps[ this.geo.country_code ] !== undefined ) {
            this.currentMap = this.countryMaps[ this.geo.country_code ][ 0 ];

            // add country title
            if ( this.geo.country_name ) {
                this.titles.push( {
                    "text": this.geo.country_name
                } );
            }

        }

        let mapData = null;

        debugger;

        this.state = {
            currentMap : this.defaultMap,
            titles: [],
            countryMaps : this.countryMaps,
            mapData : mapData

        }
    }
    updateHeatmap(event){
        let map = event.chart;
        debugger;
        if ( map.dataGenerated )
            return;
        if ( map.dataProvider.areas.length === 0 ) {
            setTimeout( updateHeatmap, 100 );
            return;
        }
        for ( var i = 0; i < map.dataProvider.areas.length; i++ ) {
            map.dataProvider.areas[ i ].value = Math.round( Math.random() * 10000 );
        }
        map.dataGenerated = true;
        map.validateNow();

    }

    render(){
        return(<Card>
            <Row>
                <Col sm="3">
                    <AmCharts.React {...this.state.mapData}/>
                </Col>
                <Col sm="9">
                    <Col sm ="12">
                        <Col sm="3" style={{height:400}}>
                            <LineChart/>
                        </Col>
                        <Col sm="3" style={{height:400}}>
                            <PieChart/>
                        </Col>
                        <Col sm="3" style={{height:1100}}>
                            <ComplexChart/>
                        </Col>
                        <Col sm="3" style={{height:400}}>
                            <PieChart/>
                        </Col>
                    </Col>


                </Col>
            </Row>
            </Card>);
    }

    componentWillMount(){
        if(this.state.mapData == null){
            let mapData = {
                "type": "map",
                "theme": "none",
                "colorSteps": 10,
                "dataProvider": {
                    "mapURL": this.currentMap+".svg",
                    "getAreasFromMap": true,
                    "zoomLevel": 0.9,
                    "areas": []
                },
                "areasSettings": {
                    "autoZoom": true,
                    "balloonText": "[[title]]: <strong>[[value]]</strong>"
                },
                "valueLegend": {
                    "right": 10,
                    "minValue": "little",
                    "maxValue": "a lot!"
                },
                "zoomControl": {
                    "minZoomLevel": 0.9
                },
                "titles": this.titles,
                "listeners": [ {
                    "event": "init",
                    "method": this.updateHeatmap
                } ]
            };

            this.setState({mapData:mapData})
        }
    }
}