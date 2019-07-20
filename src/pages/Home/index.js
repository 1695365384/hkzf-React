import React from 'react'
import {TabBar} from 'antd-mobile'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import '../../assets/fonts/iconfont.css'
import './index.scss'
const TOP_BAR_LIST = [
  {
    title: '首页',
    icon: 'icon-ind',
    path: '/home',
  },
  {
    title: '找房',
    icon: 'icon-findHouse',
    path: '/home/list',
  },
  {
    title: '资讯',
    icon: 'icon-infom',
    path: '/home/news',
  },
  {
    title: '我的',
    icon: 'icon-my',
    path: '/home/profile',
  },
]
export default class Home extends React.Component {
  state = {
    selectedTab: '/home',
  }

  componentDidMount() {}

  render() {
    console.log(this.state.selectedTab)
    return (
      <div className="tabBarList">
        <Router>
          <Route path="/home" />
        </Router>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white">
          {TOP_BAR_LIST.map(item => {
            return (
              <TabBar.Item
                title={item.title}
                key={item.title}
                icon={<i className={`iconfont ${item.icon}`} />}
                selectedIcon={<i className={`iconfont ${item.icon}`} />}
                selected={this.state.selectedTab === item.path}
                onPress={() => {
                  this.setState({
                    selectedTab: item.path,
                  })
                  this.props.history.push(item.path)
                }}
                data-seed="logId"
              />
            )
          })}
        </TabBar>
      </div>
    )
  }
}
