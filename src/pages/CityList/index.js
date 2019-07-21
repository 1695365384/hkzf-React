import React from 'react'
import {AutoSizer, List} from 'react-virtualized'

export default class CityList extends React.Component {
  render() {
    return (
      <div className="CityList">
        <div className="city_header">头部</div>
        <div className="city_content">内容</div>
        <div className="city_aside">侧边</div>
      </div>
    )
  }
}
