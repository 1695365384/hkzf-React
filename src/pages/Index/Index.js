import React, {lazy} from 'react'
import Banner from './Banner'
import './index.scss'

const NavBar = lazy(() => import('./NavBar.js'))
const Group = lazy(() => import('./Group.js'))
const News = lazy(() => import('./News.js'))
export default class Index extends React.Component {
  render() {
    return (
      <div>
        <Banner />
        <NavBar path={this.props} />
        <Group />
        <News />
      </div>
    )
  }
}
