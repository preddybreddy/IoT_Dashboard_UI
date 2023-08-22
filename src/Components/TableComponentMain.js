import React from "react";
import TableComponentHeaders from "./TableComponentHeaders";
import TableComponentBody from "./TableComponentBody";
import LineChartComponent from "./LineChartComponent";

class TableComponentMain extends React.Component {
    constructor(props) {
        super(props)

    }

    extractReportNamesForSource()
    {
        //this.props.room is the room index from 0 ... n
        // sourceName converts the number into the source string
        const sourceName = Object.keys(this.props.responseObj.reportNamesForEachSource)[this.props.room]
        let reportNamesForSource = this.props.responseObj.reportNamesForEachSource[sourceName]
        return reportNamesForSource
    }

    render() {
        return ( 
            <div className="table-responsive">
                <table className="table table-responsive">
                    <TableComponentHeaders tableHeaders={this.extractReportNamesForSource()} />
                    <TableComponentBody responseObj={this.props.responseObj} room={this.props.room}/>
                </table>
                <LineChartComponent responseObj={this.props.responseObj} data={this.props.responseObj.data} room={this.props.room} tableHeaders={this.extractReportNamesForSource()} />
            </div>
        )
    }
}

export default TableComponentMain 
