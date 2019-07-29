import React from 'react'
import {PickerView} from 'antd-mobile'
import './index.scss'
function FilterPickView(props) {
	if (props.isFilterPickShow === false) {
		return null
	}
	return (
		<div>
			<PickerView data={props.FIlterList} cols={props.filterCol} />
			<div className="pick_bottom_btn">
				<span
					className=" pick_bottom_btn_close"
					onClick={() => props.changeFilterShow(props.isFilterPickShow)}>
					取消
				</span>
				<span className="pick_bottom_btn_confirm">确定</span>
			</div>
		</div>
	)
}
export default FilterPickView
