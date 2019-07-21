import React from 'react'
import {Flex} from 'antd-mobile'

import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'

const NAVBAR_INFO = [
  {id: 1, img: Nav1, title: '整租', path: '/home/list'},
  {id: 2, img: Nav2, title: '合租', path: '/home/list'},
  {id: 3, img: Nav3, title: '地图找房', path: '/map'},
  {id: 4, img: Nav4, title: '去出租', path: '/rent/add'},
]

export default class NavBar extends React.Component {
  render() {
    return (
      <div>
        <Flex className="NavItem">
          {NAVBAR_INFO.map(item => {
            return (
              <Flex.Item
                key={item.id}
                onClick={() => this.props.path.history.push(item.path)}>
                <img src={item.img} alt="" />
                <p>{item.title}</p>
              </Flex.Item>
            )
          })}
        </Flex>
      </div>
    )
  }
}
