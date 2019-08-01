// 百度地图API功能
const labelStyle = {
	position: 'absolute',
	zIndex: -7982820,
	backgroundColor: 'rgb(238, 93, 91)',
	color: 'rgb(255, 255, 255)',
	height: 25,
	padding: '5px 10px',
	lineHeight: '14px',
	borderRadius: 3,
	boxShadow: 'rgb(204, 204, 204) 2px 2px 2px',
	whiteSpace: 'nowrap',
	fontSize: 12,
	userSelect: 'none',
}

function getMapPosition(container, position, name) {
	let map = new window.BMap.Map(container)

	map.centerAndZoom(
		new window.BMap.Point(position.longitude, position.latitude),
		17,
	)
	map.enableScrollWheelZoom(true)
	map.clearOverlays()
	let new_point = new window.BMap.Point(position.longitude, position.latitude)
	let marker = new window.BMap.Marker(new_point)

	const label = new window.BMap.Label('', {
		position: new_point,
		offset: new window.BMap.Size(-20, -50),
	})

	label.setStyle(labelStyle)
	label.setContent(`
    <span>${name}</span>
    <div class="mapArrow"></div>
  `)
	map.addOverlay(label)
	map.addOverlay(marker)
	map.panTo(new_point)
}

export {getMapPosition}
