import React from "react";

class TableComponentListItem extends React.Component {
    constructor(props)
    {
        super(props)
    }

    roundToFiveDigits(x)
    {
        if (x.indexOf('.') !== -1)
        {
            let decimalPart= x.slice(x.indexOf('.') + 1) 
            return (x.slice(0, x.indexOf('.')) + '.') + (decimalPart.length > 5 ? decimalPart.slice(0, 5) : decimalPart)
        }
        return x.slice(0, 5)
    }

    render() {
        
        const day = this.props.day
        const dataForDay = this.props.responseObj.data[day]
        /*this.props.room is the string representation of the room e.x "480A1", "480A2"...
         * the string rep needs to be converted into a 0 based index to located the correct source subarray within the day subarray
        */
        const sourceIndexToSourceNameMapping = Object.keys(this.props.responseObj.reportNamesForEachSource)[this.props.room]
        const sourceDataArray = dataForDay[this.props.room]
        const headers = this.props.responseObj.reportNamesForEachSource[sourceIndexToSourceNameMapping]
        let temp_arr = []
        for (let prop = headers.length - 1; prop >= 0; prop--)
        {
            temp_arr.push(sourceDataArray[prop])
        }
        //return temp_arr.map(x => <td className="table-element">{x}</td>)
        return temp_arr.map(x => {
            if (x === "null")
            {
                return <td className="table-element light-red">{x}</td>
            }
            else
            {
                return <td className="table-element">{this.roundToFiveDigits(x)}</td>  
            }
        })
    }
}

export default TableComponentListItem