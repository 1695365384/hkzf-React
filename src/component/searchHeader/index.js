import React from 'react';
import {Flex} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import propType from 'prop-types';

import './index.scss';

function SearchHeader({cityName, history, className}) {
  return (
    <Flex className={className || 'searchMap'}>
      <Flex
        justify="start"
        className="location"
        onClick={() => history.push('/city')}>
        <span className="name">{cityName}</span>
        <i className="iconfont icon-arrow" />
        <div className="form">
          <i className="iconfont icon-seach" />
          <span className="text">请输入小区或地址</span>
        </div>
      </Flex>

      <i className="iconfont icon-map" onClick={() => history.push('/map')} />
    </Flex>
  );
}
SearchHeader.propType = {
  cityName: propType.string,
  className: propType.string,
};
export default withRouter(SearchHeader);
