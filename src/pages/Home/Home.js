import React from 'react';
import {TabBar} from 'antd-mobile';
import {Route} from 'react-router-dom';
import {TOP_BAR_LIST} from './HomeData';
import '../../assets/fonts/iconfont.css';
import './index.scss';
import {Index, HoseList} from '../../RouterLink/router';

export default class HomeRouter extends React.Component {
  state = {
    selectedTab: this.props.location.pathname,
  };

  showTabNavBar = () => {
    return TOP_BAR_LIST.map (item => {
      return (
        <TabBar.Item
          title={item.title}
          key={item.title}
          icon={<i className={`iconfont ${item.icon}`} />}
          selectedIcon={<i className={`iconfont ${item.icon}`} />}
          selected={this.state.selectedTab === item.path}
          onPress={() => {
            this.props.history.push (item.path);
            this.setState ({
              selectedTab: item.path,
            });
          }}
          data-seed="logId"
        />
      );
    });
  };

  render () {
    return (
      <div className="Homes">
        <Route exact path="/home" component={Index} />
        <Route path="/home/list" component={HoseList} />
        <div className="tabBarList">
          <TabBar tintColor="#21B97A" noRenderContent={true}>
            {this.showTabNavBar ()}
          </TabBar>
        </div>
      </div>
    );
  }
}
