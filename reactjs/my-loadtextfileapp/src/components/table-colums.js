import React, {Component} from 'react';

class TableColumns extends Component {
    render() {
      return (
        this.props.arrayFromParent.map(item => (
          <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.parentCode}</td>
                <td>{item.parentDescription}</td>
          </tr>
        ))
      )
    }
  }

export default TableColumns;