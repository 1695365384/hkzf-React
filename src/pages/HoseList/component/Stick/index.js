import React from 'react'
import style from './index.module.css'
import PropType from 'prop-types'

class Stick extends React.Component {
	placeholder = React.createRef()
	content = React.createRef()

	scrollHandler = () => {
		let {height} = this.props
		let placeholder = this.placeholder.current
		let content = this.content.current
		let {top} = placeholder.getBoundingClientRect()

		if (top < 0) {
			content.classList.add(style.fixad)
			placeholder.style.height = `0px`
		} else {
			content.classList.remove(style.fixad)
			placeholder.style.height = `${height}px`
		}
	}

	componentDidMount() {
		window.addEventListener('scroll', this.scrollHandler)
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.scrollHandler)
	}

	render() {
		return (
			<div>
				<div ref={this.placeholder} />
				<div ref={this.content}>{this.props.children}</div>
			</div>
		)
	}
}

Stick.PropType = {
	height: PropType.number.isRequired,
}
export default Stick
