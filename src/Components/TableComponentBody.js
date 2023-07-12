import React from "react";
import TableComponentListItem from './TableComponentListItem'



class TableComponentBody extends React.Component {
    constructor(props)
    {
        super(props)
    }

    differenceInDays(startDate, endDate)
    {
        let endDate_date = new Date(endDate)
        let startDate_date = new Date(startDate)
        if (startDate_date === endDate_date)
        {
            return 0
        }
        return parseInt((endDate_date.getTime() - startDate_date.getTime()) / (1000 * 86400)) + 1
    }
    
    addDay(date, day)
    {
        var offset = (24*60*60*1000) * day
        let newDate = new Date()
        let currentDate = new Date(date)
        newDate.setTime(currentDate.getTime() + offset)
        const formatTwoDigitDate = (dateOrMonth) => (dateOrMonth+"").length < 2 ? "0" + dateOrMonth : dateOrMonth    
        const toStringDate = (date) => `${date.getFullYear()}-${formatTwoDigitDate(date.getMonth() + 1)}-${formatTwoDigitDate(date.getDate())}`
        return toStringDate(newDate)
    }
    
    render() {
        const numDays = this.differenceInDays(this.props.responseObj["startDate"], this.props.responseObj["endDate"])   
        let lists = []
        for (let day = 0; day < numDays; day++)
        {
            lists.push(<tr><td className="single-date table-date">{this.addDay(this.props.responseObj["startDate"], day+1)}</td><TableComponentListItem responseObj={this.props.responseObj} day={day} room={this.props.room}/></tr>)
        }
        return <tbody>{lists}</tbody>
    }
}

export default TableComponentBody