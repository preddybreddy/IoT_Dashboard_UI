
import './App.css';
import React from 'react';

let temp_rooms_arr = ["1A", "1B", "2A", "2B"]


function App() {
  return (
    <div className="App">
      {InputComponents()}
      {SiteDropDown(temp_rooms_arr)}
        <div className="table-data">
          <table className="table table-dark" num_rows= {20}>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
              {allTableRows()}
          </table>
        </div>
    </div>
  );
}

function InputComponents()
{
  return (
    <div className="input-group">
      <input placeholder='Start Date' ></input>
      <input placeholder='End Date'></input>
      <input placeholder='Site ID'></input>
      <button type="button" className="btn btn-success">Submit</button>
    </div>
  )
}

function SiteDropDown(rooms_arr)
{
  return (
    <div class="site-dropdown">
      <label for="SiteID: ">Rooms: </label>
        {generateOptions(rooms_arr)}
    </div>
  )
}

function generateOptions(rooms_arr)
{
  let rooms_child_elements = []
  for (let i = 0; i < rooms_arr.length; i++)
  {
    rooms_child_elements.push(React.createElement('option', {value: rooms_arr[i]}, rooms_arr[i]))
  }
  const parent_select_tag = React.createElement('select', {name: "SiteID", id: "SiteIdDropdown"}, ...rooms_child_elements)

  return parent_select_tag
}

function callTableRowReact()
{
  const grandChild = React.createElement('td', null, 'Mark')
  const grandChild2 = React.createElement('td', null, 'Otto')
  const child = React.createElement('tr', null, grandChild, grandChild2)
  return child
}

function allTableRows()
{
  let arr = []
  for (let i = 0; i < 10; i++)
  {
    arr.push(callTableRowReact())
  }
  return React.createElement('tbody', null, ...arr)
}



/*
let startDate = '2023-06-20'
let endDate = '2023-06-21'
let siteId = 2

let dashboard_api_url = `https://dashboardapi20230627143908.azurewebsites.net/api/Dashboard/sitevalues?startDate=${startDate}&endDate=${endDate}&siteId=${siteId}`

let json_response = fetch(dashboard_api_url).then(raw => raw.json()).then(response => response)

let response_header = {
  startDate: json_response.StartDate,
  endDate: json_response.EndDate,
  siteId: json_response.SiteId
}

let sources = json_response.Values.map(x => x.Source)
let response_values = json_response.Values

*/



export default App;
