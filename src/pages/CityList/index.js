import React from 'react';
import {AutoSizer, List} from 'react-virtualized';
import axios from 'axios';
import {NavBar, Icon, Flex, Toast} from 'antd-mobile';

import 'react-virtualized/styles.css';
import './index.scss';

import {getData, formatCityIndex} from './getData';
import {setCItyName, getGPS} from '../../utils/auth';

const CITY_ITEM_H = 50;
const CITY_TITLE = 36;

const hasCity = ['北京', '上海', '深圳', '广州'];

export default class CityList extends React.Component {
  state = {
    cityLists: [],
    cityIndex: [],
    cityListLength: [],
    cityScrollTop: 0,
  };
  listRef = React.createRef ();

  async gitCityListAll () {
    //获取城市列表
    let res = await axios.get ('http://localhost:8080/area/city?level=1');

    let {cityLists, cityIndex} = getData (res.data.body);

    //获取热门城市并加入列表
    let getHotCity = await axios.get ('http://localhost:8080/area/hot');
    cityLists.hot = getHotCity.data.body;
    cityIndex.unshift ('hot');

    //获取定位的城市加入列表
    let GPS = await getGPS ();
    let currentCity = res.data.body.filter (item => item.label === GPS.label);
    cityIndex.unshift ('#');
    cityLists['#'] = currentCity;

    //赋值给state
    this.setState ({
      cityLists: cityLists,
      cityIndex: cityIndex,
      cityListLength: res.data.body,
      active_index: 0,
    });

    this.listRef.current.measureAllRows ();
  }

  componentDidMount () {
    this.gitCityListAll ();
  }

  getRow = ({index}) => {
    let {cityLists, cityIndex} = this.state;

    return CITY_TITLE + cityLists[cityIndex[index]].length * CITY_ITEM_H;
  };

  //点击切换城市并跳转
  swicthCity = item => {
    let {value, label} = item;
    if (hasCity.indexOf (label) > -1) {
      setCItyName ({label, value});
      return this.props.history.push ('/home');
    } else {
      return Toast.info ('没有房源信息', 2);
    }
  };

  renderList = ({index, key, isScrolling, isVisible, style}) => {
    let {cityLists, cityIndex} = this.state;
    let letter = cityIndex[index];

    return (
      <div key={key} className="city" style={style}>
        <div className="title" id={cityIndex[index]}>
          {formatCityIndex (letter)}
        </div>
        {cityLists[cityIndex[index]].map (item => {
          return (
            <div
              key={item.value}
              className="cityItem"
              onClick={() => this.swicthCity (item)}
            >
              {item.label}
            </div>
          );
        })}
      </div>
    );
  };

  currentBtn = index => {
    // scrollToRow
    this.setState ({
      active_index: index,
    });
    this.listRef.current.scrollToRow (index);
  };

  onRowsRendered = ({startIndex}) => {
    this.setState ({
      active_index: startIndex,
    });
  };

  render () {
    return (
      <div className="CityList">
        <div className="city_header">
          <NavBar
            icon={
              <Icon
                type="left"
                style={{color: '#999'}}
                onClick={() => this.props.history.push ('/home')}
              />
            }
            mode="light"
            style={{backgroundColor: '#f6f5f6'}}
          >
            城市列表
          </NavBar>
        </div>
        <AutoSizer
          children={({height, width}) => (
            <List
              ref={this.listRef}
              height={height}
              width={width}
              rowHeight={this.getRow}
              rowCount={this.state.cityIndex.length}
              rowRenderer={this.renderList}
              onRowsRendered={this.onRowsRendered}
              scrollToAlignment="start"
            />
          )}
        />

        <Flex className="city_aside" justify="end" direction="column">

          {this.state.cityIndex.map ((item, index) => {
            return (
              <Flex.Item key={item}>
                <li
                  onClick={e => this.currentBtn (index)}
                  className={
                    this.state.active_index === index ? 'active-index' : ''
                  }
                >
                  {item === 'hot' ? '热' : item.toUpperCase ()}
                </li>
              </Flex.Item>
            );
          })}

        </Flex>
      </div>
    );
  }
}
