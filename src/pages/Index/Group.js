import React from 'react'
import {Flex, Grid} from 'antd-mobile'
import {API, BASE_URL} from '../../utils/API'
import './index.scss'

export default class Group extends React.Component {
  state = {
    data: [],
  }

  async componentDidMount() {
    let res = await API.get('/home/groups?area=AREA%7C88cff55c-aaa4-e2e0')
    this.setState({
      data: res.data.body,
    })
  }

  render() {
    return (
      <div className="Group">
        <div className="Group-title">
          <h3>
            租房小区 <span className="more">更多</span>
          </h3>
        </div>

        <Grid
          data={this.state.data}
          columnNum={2}
          square={false}
          hasLine={false}
          renderItem={item => {
            return (
              <Flex className="Group-content">
                <div className="desc">
                  <p>{item.title}</p>
                  <span>{item.desc}</span>
                </div>
                <img src={BASE_URL + item.imgSrc} alt="" />
              </Flex>
            )
          }}
        />
      </div>
    )
  }
}
