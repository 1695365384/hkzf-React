import React from 'react'
import {TabBar} from 'antd-mobile'
import '../../assets/fonts/iconfont.css'

const TOP_BAR_LIST = [
  {title: '首页', icon: 'icon-my', path: '/home/index'},
  {title: '首页', icon: 'icon-my', path: '/home/index'},
  {title: '首页', icon: 'icon-my', path: '/home/index'},
  {title: '首页', icon: 'icon-my', path: '/home/index'},
]
export default class Home extends React.Component {
  state = {
    selectedTab: 'redTab',
  }

  render() {
    return (
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white">
        <TabBar.Item
          title="我的"
          key="Life"
          icon={<i className="iconfont icon-my" />}
          selectedIcon={<i className="iconfont icon-my" />}
          selected={this.state.selectedTab === 'blueTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'blueTab',
            })
          }}
          data-seed="logId"
        />
      </TabBar>
    )
  }
}
