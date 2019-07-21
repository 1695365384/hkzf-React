import React from 'react'
import {AutoSizer, List} from 'react-virtualized'
import {NavBar, Icon, Flex} from 'antd-mobile'

import './index.scss'

export default class CityList extends React.Component {
  render() {
    return (
      <div className="CityList">
        <div className="city_header">
          <NavBar
            icon={<Icon type="left" style={{color: '#999'}} />}
            mode="light"
            style={{backgroundColor: '#f6f5f6'}}>
            路上看到
          </NavBar>
        </div>
        <div className="city_content">
          <AutoSizer
            children={({height, width}) => {
              return (
                <List
                  height={height}
                  width={width}
                  rowHeight={100}
                  rowCount={20}
                  rowRenderer={() => <div>asd</div>}>
                  asdf
                </List>
              )
            }}
          />
        </div>
        <Flex className="city_aside">
          <ul>
            <li>侧边</li>
          </ul>
        </Flex>
      </div>
    )
  }
}
