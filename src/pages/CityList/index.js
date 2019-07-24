import React from 'react';
import {AutoSizer, List} from 'react-virtualized';
import 'react-virtualized/styles.css';

import {NavBar, Icon, Flex} from 'antd-mobile';
import {getData, formatCityIndex} from './getData';
import './index.scss';
import axios from 'axios';

export default class CityList extends React.Component {
  state = {
    cityLists: [],
    cityIndex: [],
  };

  async componentDidMount () {
    let res = await axios.get ('http://localhost:8080/area/city?level=1');
    let city = getData (res.data.body);
    console.log (city);
    this.setState ({
      cityLists: city.cityLists,
      cityIndex: city.cityIndex,
    });
  }

  renderList = ({index, key, isScrolling, isVisible, style}) => {
    let {cityLists, cityIndex} = this.state;
    console.log (cityLists, cityIndex);
    return (
      <div className="cityItem" key={key} style={style}>
        <div className="title">
          {formatCityIndex (cityIndex[index])}
        </div>
        {cityLists[cityIndex[index]].map (item => {
          return <div className="cityName" key={item.value}>{item.label}</div>;
        })}
      </div>
    );
  };

  render () {
    return (
      <div className="CityList">
        <div className="city_header">
          <NavBar
            icon={<Icon type="left" style={{color: '#999'}} />}
            mode="light"
            style={{backgroundColor: '#f6f5f6'}}
          >
            城市列表
          </NavBar>
        </div>
        <AutoSizer
          disableHeight
          disableWidth
          children={({height, width}) => (
            <List
              className="autoList"
              height={height}
              width={width}
              rowHeight={250}
              rowCount={this.state.cityIndex.length}
              rowRenderer={this.renderList}
            />
          )}
        />

        <Flex className="city_aside">
          <ul>
            <li>侧边</li>
          </ul>
        </Flex>
      </div>
    );
  }
}
