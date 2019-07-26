import React from 'react'
import {BASE_URL} from '../../../../utils/API'
import './index.scss'
export default class HouseItem extends React.Component {
	render() {
		let {title, price, houseImg, houseCode, desc, tags} = this.props.list
		return (
			<div className="houseItem" key={houseCode} style={this.props.style}>
				<div className="imgWarp">
					<img src={BASE_URL + houseImg} alt="" />
				</div>
				<div className="content">
					<div className="title">
						<h3>{title}</h3>
					</div>
					<div className="desc">{desc}</div>
					<div className="tags">
						{tags.map((item, index) => {
							return (
								<span key={item} className={`tags${index + 1}`}>
									{item}
								</span>
							)
						})}
					</div>
					<div className="price">
						{price} <span>元/月</span>
					</div>
				</div>
			</div>
		)
	}
}