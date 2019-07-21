import React from 'react'
import {WingBlank, Flex} from 'antd-mobile'
import {API, BASE_URL} from '../../utils/API'
import Item from 'antd-mobile/lib/popover/Item'
export default class News extends React.Component {
  state = {
    data: [],
  }
  async componentDidMount() {
    let res = await API.get('/home/news?area=AREA%7C88cff55c-aaa4-e2e0')
    this.setState({
      data: res.data.body,
    })
  }
  render() {
    return (
      <WingBlank size="lg" className="clearfix NewBox">
        <h3>最新资讯</h3>

        <ul className="NewList">
          {this.state.data.map(item => {
            return (
              <li key={item.id}>
                <div className="imgWarp">
                  <img src={BASE_URL + item.imgSrc} alt="" />
                </div>
                <div>
                  <Flex direction="column" justify="between" className="item">
                    <h3>{item.title} </h3>
                    <Flex justify="between" className="info">
                      <span>{item.from}</span>
                      <span>{item.date}</span>
                    </Flex>
                  </Flex>
                </div>
              </li>
            )
          })}
        </ul>
      </WingBlank>
    )
  }
}
