import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import {Card, CardBlock, CardTitle, CardSubtitle} from "reactstrap";

export default class PageCard extends ShallowComponent {

    static propTypes = {
        header: React.PropTypes.any,
        borderless: React.PropTypes.bool,
        unfilled: React.PropTypes.bool,
        unShadow: React.PropTypes.bool,
        actions: React.PropTypes.any,
        xs: React.PropTypes.number,
        sm: React.PropTypes.number,
        md: React.PropTypes.number,
        lg: React.PropTypes.number

    };

    static defaultProps = {
        header: undefined,
        borderless: false,
        unfilled: false,
        unShadow: false,
        actions: undefined,
        xs: undefined,
        sm: undefined,
        md: undefined,
        lg: undefined
    };

    render() {
        var className = "";
        if (this.props.className)
            className += " " + this.props.className;
        return (
            <Card style={{marginTop:15}}>
                <CardBlock className={className}>
                    <CardTitle>{this.props.header}</CardTitle>
                </CardBlock>
                <CardBlock>
                    {this.props.children}
                </CardBlock>
            </Card>
        );
    };
}