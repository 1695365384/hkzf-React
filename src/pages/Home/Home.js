import React, {lazy} from 'react'
import {TabBar} from 'antd-mobile'
import {Route} from 'react-router-dom'

import '../../assets/fonts/iconfont.css'
import './index.scss'

const Index = lazy(() => import('../Index/Index.js'))
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
export default class HomeRouter extends React.Component {
  state = {
    selectedTab: this.props.location.pathname,
  }

  showTabNavBar = () => {
    return TOP_BAR_LIST.map(item => {
      return (
        <TabBar.Item
          title={item.title}
          key={item.title}
          icon={<i className={`iconfont ${item.icon}`} />}
          selectedIcon={<i className={`iconfont ${item.icon}`} />}
          selected={this.state.selectedTab === item.path}
          onPress={() => {
            this.props.history.push(item.path)
            this.setState({
              selectedTab: item.path,
            })
          }}
          data-seed="logId"
        />
      )
    })
  }

  render() {
    return (
      <div className="Homes">
        <Route exact path="/home" component={Index} />
        <Route path="/home/list" />
        <div className="tabBarList">
          <TabBar tintColor="#21B97A" noRenderContent={true}>
            {this.showTabNavBar()}
          </TabBar>
        </div>
      </div>
    )
  }
}
