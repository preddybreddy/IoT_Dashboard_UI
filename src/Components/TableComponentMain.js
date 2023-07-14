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
        const source = this.props.room
        const data_for_one_day = this.props.responseObj.data[0]
        const roomResponse = data_for_one_day[source]
        let reportNamesForRoom = Object.keys(roomResponse)
        return reportNamesForRoom

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
    //<TableComponentBody responseObj={this.props.responseObj} tableHeaders={this.extractRoomDataKeys()} room={this.props.room}/>
   
}

export default TableComponentMain 

// <TableComponentBody responseObj={this.props.responseObj} tableHeaders={this.extractReportNamesForSource()} room={this.props.room}/>
//<LineChartComponent responseObj={this.props.responseObj} data={this.props.responseObj.data} room={this.props.room} tableHeaders={this.extractReportNamesForSource()} />
