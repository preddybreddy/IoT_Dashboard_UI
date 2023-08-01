import React from "react";
import RoomDropdownComponent from "./RoomDropdownComponent";
import LoadingComponent from "./LoadingComponent";
import DateEditMessage from "./DateEditMessageComponent";


class DateInputComponent extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {startDate: '', endDate: '', siteId: 0, responseObj: {}, populateRooms: false, loading: false}
        this.handleChangeStartDate = this.handleChangeStartDate.bind(this)
        this.handleChangeEndDate = this.handleChangeEndDate.bind(this)
        this.handleChangeSiteId = this.handleChangeSiteId.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    startDateGreaterThanEndDate()
    {
    
        let startDate = new Date(this.state.startDate)
        let endDate = new Date(this.state.endDate)
        return startDate > endDate

    }

    handleChangeSubmitButton()
    {
        return (this.state.startDate !== '' && this.state.endDate !== '' && this.state.siteId !== 0)
    }

    handleChangeStartDate(event)
    {      
        this.setState(prevState => prevState.startDate=event.target.value)
    }
   
    handleChangeEndDate(event)
    {
        this.setState(prevState => prevState.endDate=event.target.value)
    }

    handleChangeSiteId(event)
    {
        this.setState(prevState => prevState.siteId = event.target.value)
    }
    
    //Should I be calling the API from the DateInputComponent
    async handleSubmit(event)
    {
        // console.log(this.state.startDate)
        // console.log(this.state.endDate)
        // console.log(this.state.siteId)
        //let dashboard_url = `https://localhost:7149/api/Dashboard/sitevalues?startDate=${this.state.startDate}&endDate=${this.state.endDate}&siteId=${this.state.siteId}`
        let dashboard_url = `https://dashboardapi20230627143908-v2.azurewebsites.net/api/Dashboard/sitevalues?startDate=${this.state.startDate}&endDate=${this.state.endDate}&siteId=${this.state.siteId}`
        this.setState(prevState => prevState.loading = true)
        if (!this.startDateGreaterThanEndDate())
        {
            const raw_response = await fetch(dashboard_url)
            const json_response = await raw_response.json()
            console.log(json_response)
            this.setState(prevState => prevState.responseObj = json_response)
            
            this.setState(prevState => prevState.populateRooms = true)
            this.setState(prevState => prevState.loading = false)
    
            event.preventDefault()
        }   
    }

    render() {
        
        let roomsDropDown;
        let loadingComponent;
        let dateEditMessage;
        if (this.state.populateRooms && !this.state.loading)
        {
            roomsDropDown = <RoomDropdownComponent responseObj={this.state.responseObj} loadingIndicator={this.state.loading} />
            
        }
        if (this.state.loading)
        {
            loadingComponent = <LoadingComponent />
        }
        else
        {
            loadingComponent = null
        }
        if (this.startDateGreaterThanEndDate())
        {
            dateEditMessage = <DateEditMessage />
        }
        return (
            <div className="main-container container">      
                {dateEditMessage}
                <div className="input-group">
                    <div className="input-start-date">
                        <label>Start Date: </label>
                       
                        <div className="input-date-outer" >
                            
                            <input className="input-date" placeholder='Start Date' type="date"  onChange={this.handleChangeStartDate}></input>
                            
                        </div>
                    </div>
                    <div className="input-end-date">
                        <label>End Date: </label>
                        <div className="input-date-outer">
                            <input className="input-date" placeholder='End Date' type="date"  onChange={this.handleChangeEndDate}></input>
                        </div>
                    </div>
                    <div className="input-site">
                        <label>Site: </label>
                        <div className="input-site-outer">
                            <div className="site-drop-down">
                                <select className="site-drop-down-select" textCenter onChange={this.handleChangeSiteId}>
                                    <option  value="0">--Select One--</option>
                                    <option value="1">PCI Rockford</option>
                                    <option value="2">PCI Biotec</option>
                                    <option value="3">GSK Conshohocken</option>
                                    <option value="4">(Deprecated -- HISTORICAL ONLY) Movianto</option>
                                    <option value="8">MTF</option>
                                    <option value="9">Mcardle Skeath</option>
                                    <option value="10">Movianto Transposed</option>
                                    <option value="11">MTF Production ULCs</option>
                                    <option value="12">Fuji UK</option>
                                    <option value="26">Farrar Marietta RiverCity</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="submit-button">
                        
                        <button disabled={!this.handleChangeSubmitButton()} type="button" className="btn btn-success" onClick={this.handleSubmit}>Submit</button>
                    </div>
           
                </div>                
                <br />
                {loadingComponent}
                
                {roomsDropDown}
            </div>
        )
    }

}

export default DateInputComponent

//<input className="input-site" placeholder='Site ID' onChange={this.handleChangeSiteId}></input>
