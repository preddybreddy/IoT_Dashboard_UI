import React from "react";

class TableComponentHeaders extends React.Component {
    constructor(props)
    {
        super(props)
    }

    //Need to remove method - Duplicate in TableComponentBody


    render()    
    {
        const includedProperties = this.props.tableHeaders.reverse()
        return  <thead><tr><th className="table-headers">Date</th>{includedProperties.map(i => <th className="table-headers">{i}</th>)}</tr></thead>

    }
}

export default TableComponentHeaders