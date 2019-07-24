import React from 'react';
import ReactDOM from 'react-dom';
import 'antd-mobile/dist/antd-mobile.css';
import './index.css';
import App from './app';
navigator.geolocation.getCurrentPosition (position => {
  // postion 对象中，常用属性的文档：
  // https://developer.mozilla.org/zh-CN/docs/Web/API/Coordinates
  // postion.coords.longitude 经度
  // postion.coords.latitude  纬度
  console.log ('当前位置信息：', position);
});
ReactDOM.render (<App />, document.getElementById ('root'));
