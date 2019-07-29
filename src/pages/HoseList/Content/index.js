import React from 'react'
import axios from 'axios'
import {
	AutoSizer,
	InfiniteLoader,
	List,
	WindowScroller,
} from 'react-virtualized'

import styles from './index.module.css'

import NoHouse from '../component/NoHouse'
import HouseItem from '../component/HouseItem'

export default class Content extends React.Component {
	render() {
		const {count, isLoading} = this.props

		if (count === 0 && !isLoading) {
			return <NoHouse>没有找到房源，请您换个搜索条件吧~</NoHouse>
		}

		return (
			<InfiniteLoader
				isRowLoaded={this.isRowLoaded}
				loadMoreRows={this.loadMoreRows}
				rowCount={count}>
				{({onRowsRendered, registerChild}) => (
					<WindowScroller>
						{({height, isScrolling, onChildScroll, scrollTop}) => (
							<AutoSizer>
								{({width}) => (
									<List
										ref={registerChild}
										height={height}
										autoHeight
										rowCount={count}
										onRowsRendered={onRowsRendered}
										width={width}
										rowHeight={120}
										isScrolling={isScrolling}
										onChildScroll={onChildScroll}
										scrollTop={scrollTop}
										rowRenderer={this.rowRenderer}
									/>
								)}
							</AutoSizer>
						)}
					</WindowScroller>
				)}
			</InfiniteLoader>
		)
	}

	isRowLoaded = ({index}) => {
		return !!this.props.list[index]
	}

	loadMoreRows = ({startIndex, stopIndex}) => {
		return new Promise(resolve => {
			axios
				.get('http://localhost:8080/houses', {
					params: {
						cityId: this.value,
						start: startIndex,
						end: stopIndex,
					},
				})
				.then(res => {
					this.props.updateList([...this.props.list, ...res.data.body.list])
					resolve()
				})
		})
	}

	rowRenderer = ({key, index, style}) => {
		let house = this.props.list[index]
		if (!house) {
			return (
				<div key={key} style={style}>
					<p className={styles.loading} />
				</div>
			)
		}
		return <HouseItem list={house} key={key} style={style} />
	}
}
