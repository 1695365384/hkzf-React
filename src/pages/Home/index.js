import React from 'react';
import {Button} from 'antd-mobile';

export default class Home extends React.Component {
  render () {
    return (
      <div>
        主页
        <Button type="primary">登录</Button>
      </div>
    );
  }
}
