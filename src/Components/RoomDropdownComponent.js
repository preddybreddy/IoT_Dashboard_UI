import React from "react";
import TableComponentMain from './TableComponentMain';

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
        //console.log(json_response)
        const values = json_response.data[0]
        let roomOptions = Object.keys(values)
        // let roomOptions =  values.map(v => <option value={v.Source}>{v.Source}</option>)
        // roomOptions.unshift(<option value=''></option>)
        let htmlroomOptions = roomOptions.map(r => <option value={r}>{r}</option>)
        htmlroomOptions.unshift(<option value=""></option>)
        //console.log('Room options')
        //console.log(htmlroomOptions)
        return htmlroomOptions
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