import React, {Component} from "react";
import CanvasJSReact from '@canvasjs/react-charts';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class LineChartComponent extends Component {
    constructor(props)
    {
        super(props)
    }

    updateState()
    {
        this.setState({room: this.props.room, tableHeaders: this.props.tableHeaders, dates: this.extractDates(), dataPointsAll: this.extractDataPointsForReports()})
    }

    extractDataPointsForReports()
    {
        let dataPoints = []
        const data = this.props.data
        const room = this.props.room
        console.log('Room from LineChartComponent', room)
        const headers = this.props.tableHeaders
        const roomData = data.map(x => x[room])
        for (let i=0; i < headers.length; i++)
        {
            dataPoints.push([])
        }

        for (let i = 0; i < roomData.length; i++)
        {
            const roomDataForDay = roomData[i]
            for (let j = 0; j < headers.length; j++)
            {
                const dataPointValue = roomDataForDay[headers[j]]
                let transformedDataPointValue = 0
                if (dataPointValue !== "null")
                {
                    transformedDataPointValue = Number(dataPointValue)
                }
                dataPoints[j].push(transformedDataPointValue)
            }
        }
        return dataPoints
        
    }

    extractDates()
    {
        let startDate = new Date(this.props.responseObj['startDate'])
        let endDate = new Date(this.props.responseObj['endDate'])
        let daysInBetween = []
        const diffTime = Math.abs(endDate - startDate)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        const addDays = (date) => {
            let d = new Date(date)
            d.setDate(d.getDate() + 1)
            return d
        }
        let temp_start_date = addDays(startDate)
        for (let i = 0; i < diffDays + 1; i++)
        {
            daysInBetween.push(temp_start_date)
            temp_start_date = addDays(temp_start_date)
        }
        return daysInBetween.map(x => x.toLocaleDateString().slice(0, x.toLocaleDateString().lastIndexOf('/')).replace('/', '-'))
    }

    formObjectForCanvasDataPoints(reportIndex)
    {
        // console.log('This.dataPointsAll')
        // console.log(this.datePointsAll[0])
        const dataPointsForReport = this.dataPointsAll[reportIndex]
        let dataPointObjectsForCanvas = []
        for (let i = 0; i < this.dates.length; i++)
        {
            let temp_obj = {}
            temp_obj.x = i + 1
            temp_obj.label = this.dates[i]
            temp_obj.y =  dataPointsForReport[i]
            
            dataPointObjectsForCanvas.push(temp_obj)
        }
        return dataPointObjectsForCanvas
    }

    render() {
        this.dates = this.extractDates() 
        this.dataPointsAll = this.extractDataPointsForReports()
        console.log('Room changed from LineChartComponent', this.props.room)
        let dataArray = []
        for (let i = 0; i < this.props.tableHeaders.length; i++)
        {
            let cond = this.props.tableHeaders[i]
            dataArray.push(
                {
                    type: "line",
                    toolTipContent: cond + ": {y}",
                    showInLegend: true, 
                    legendText: this.props.tableHeaders[i],
                    dataPoints: this.formObjectForCanvasDataPoints(i)
                }
            )
        }
       const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2", // "light1", "dark1", "dark2"
			title:{
				text: "Room Data"
			},
			axisY: {
				title: "Temperature",
				includeZero: false,
				//suffix: "%"
			},
			axisX: {
				title: "Date",
				//prefix: "W",
				interval: 1
			},
			// data: [
            //     {
            //         type: "line",
            //         toolTipContent: "Day {x}: {y}%",
            //         dataPoints: this.formObjectForCanvasDataPoints(0)
            //     },
            //     {
            //         type: "line",
            //         toolTipContent: "Day {x}: {y}%",
            //         dataPoints: this.formObjectForCanvasDataPoints(1)
            //     }
            // ]
            data: dataArray
		}
		
		return (
		<div>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default LineChartComponent