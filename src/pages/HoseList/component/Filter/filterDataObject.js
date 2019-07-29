class FilterObj {
	constructor() {
		this.cityId = null
		this.area = null
		this.subway = null
		this.rentType = null
		this.price = null
		this.more = null
		this.roomType = null
		this.oriented = null
		this.characteristic = null
		this.floor = null
		this.strat = 1
		this.end = 20
		this.eachData = eachData.bind(this)
		this.eachData(this)
	}
}
function eachData(obj) {
	Object.keys(obj).forEach(key => {
		definePropertyData(obj, key, obj[key])
	})
}

function definePropertyData(obj, key, val) {
	Object.defineProperty(obj, key, {
		enumerable: true,
		configurable: true,
		get() {
			return val
		},
		set(newVal) {
			val = newVal
		},
	})
}

function switchFilterData(type, val, obj) {
	switch (type) {
		case 'area':
			switchArea(val, obj)
			break
		case 'rentType':
			obj.rentType = val[0]
			break
		case 'price':
			obj.price = val[0]
			break
		default:
			return
	}
}

function switchArea(val, obj) {
	if (val[1] !== 'null') {
		if (val[0] === 'area') {
			obj.area = val[2] !== 'null' ? val[2] : val[1]
		} else {
			obj.subway = val[2] !== 'null' ? val[2] : val[1]
		}
	}
}
export {FilterObj, switchFilterData}
