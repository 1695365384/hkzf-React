import React from 'react';
import './index.scss';

const map = new window.BMap.Map ('container');
const point = new window.BMap.Point ();

export default class Map extends React.Component {
  componentDidMount () {}
  render () {
    return (
      <div className="map">
        <div id="container">这是地图</div>
      </div>
    );
  }
}
