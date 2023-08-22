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
        const lenReportValues = data[0][room].length
        for (let i=0; i < lenReportValues; i++)
        {
            dataPoints.push([])
        }

        for (let i = 0; i < data.length; i++)
        {
            const dataForOneDay = data[i]
            const roomData = dataForOneDay[room]
            for (let j = 0; j < roomData.length; j++)
            {
                dataPoints[j].push(Number(roomData[j]))
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
				text: "Graphical Room Data"
			},
			axisY: {
				title: "Temperature",
				includeZero: false,
			},
			axisX: {
				title: "Date",
				interval: 1
			},
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