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
        //console.log(dataForDay)
        const sourceData = dataForDay[this.props.room]
        //console.log('Source data')
        //console.log(sourceData)
        const headers = Object.keys(sourceData)
        let temp_arr = []
        //console.log(this.props.responseObj)
        for (let prop = 0; prop < headers.length; prop++)
        {
            temp_arr.push(sourceData[headers[prop]])
        }
        //return temp_arr.map(x => <td className="table-element">{x}</td>)
        return temp_arr.map(x => {
            if (x === 'null')
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