import React from "react";
import TableComponentHeaders from "./TableComponentHeaders";
import TableComponentBody from "./TableComponentBody";

class TableComponentMain extends React.Component {
    constructor(props) {
        super(props)
    }

    extractReportNamesForSource()
    {
        // let valuesObj = this.props.responseObj.Values[0]
        
        // //Need to remove Source from array. Need to filter by Source instead
        // const notIncludedProps = ['Id', 'Source', 'Side']
        // let valuesObjKeys = Object.keys(valuesObj)
        // const includedProps = valuesObjKeys.filter(v => !notIncludedProps.includes(v))
        // console.log(includedProps)
        // return includedProps
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
            </div>
        )
    }
    //<TableComponentBody responseObj={this.props.responseObj} tableHeaders={this.extractRoomDataKeys()} room={this.props.room}/>
    
    
}

export default TableComponentMain 

// <TableComponentBody responseObj={this.props.responseObj} tableHeaders={this.extractReportNamesForSource()} room={this.props.room}/>