import React from 'react';
import {Carousel} from 'antd-mobile';
import {API, BASE_URL} from '../../utils/API';
import {getCItyName, isCityName} from '../../utils/auth';

import '../../assets/fonts/iconfont.css';
import SearchHeader from './../../component/searchHeader/index';

export default class Banner extends React.Component {
  state = {
    data: [],
    imgHeight: 176,
    name: '上海',
  };

  componentDidMount () {
    this.getImg ();
    this.setCItyNameAndLocal ();
  }

  setCItyNameAndLocal = () => {
    let {label} = getCItyName ();
    let flag = isCityName (label);

    //进入首页先进行localstorege的判断,如果是false 进行请求,否则不请求
    if (!flag) {
      return;
    } else {
      this.setState ({
        name: label,
      });
    }
  };

  async getImg () {
    let res = await API.get ('/home/swiper');
    this.setState ({
      data: res.data.body,
    });
  }

  renderContent = () => {
    return this.state.data.map (val => (
      <a href="###" key={val}>
        <img
          alt=""
          src={BASE_URL + val.imgSrc}
          style={{
            width: '100%',
            verticalAlign: 'top',
            height: this.state.imgHeight,
          }}
          onLoad={() => {
            window.dispatchEvent (new Event ('resize'));
            this.setState ({imgHeight: 'auto'});
          }}
        />
      </a>
    ));
  };

  cityList = () => {};

  render () {
    return (
      <div>
        <SearchHeader cityName={this.state.name} />
        <Carousel autoplay={true} infinite>
          {this.renderContent ()}
        </Carousel>
      </div>
    );
  }
}
