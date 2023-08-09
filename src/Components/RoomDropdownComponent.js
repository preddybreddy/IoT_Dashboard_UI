import React from "react";
import TableComponentMain from './TableComponentMain';
import { eventWrapper } from "@testing-library/user-event/dist/utils";

class RoomDropdownComponent extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {room: ''}
        this.showTable = false
        this.handleSelectionEvent = this.handleSelectionEvent.bind(this)

    }

    extractRooms(json_response)
    {
       const roomOptions =  Object.keys(json_response.reportNamesForEachSource)
       let roomOptionsHTML = roomOptions.map((v, _i) => <option value={_i}>{v}</option>)
       roomOptionsHTML.unshift(<option value=''></option>)
       console.log('extractRooms() in RoomDropDownComponent', roomOptionsHTML)
       
       return roomOptionsHTML
    }

    handleSelectionEvent(e)
    {
        this.setState({room: e.target.value})
        this.showTable = true
    }


    render() {
        let table;
        if (this.showTable && !this.props.loading)
        {
            table = <TableComponentMain responseObj={this.props.responseObj} room={this.state.room}/>
        }
        return (
            <div className="site-data">
                <h5 className="site-name">Data for {this.props.responseObj.site}</h5>
                <div className="site-dropdown">
                    <label for="SiteID: ">Rooms: </label>
                    <select name="SiteID" id="SiteIdDropdown" onChange={this.handleSelectionEvent}>
                        {this.extractRooms(this.props.responseObj)}
                        <h1>Room {this.state.room}</h1>
                    </select>
                    <div className="data-table-outer">                    
                        {table}
                    </div>
                </div>
            </div>
        )
    }
}

export default RoomDropdownComponent