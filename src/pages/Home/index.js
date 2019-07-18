import React from 'react';
import {Button} from 'antd-mobile';

export default class Home extends React.Component {
  render () {
    return (
      <div>
        主页
        <Button type="primary" style={{width: 50}}>安妮</Button>
      </div>
    );
  }
}
