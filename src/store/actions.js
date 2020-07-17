import { PUSH_DATA2LIST, PUSH_RAND_DATA2LIST, CHANGE_TYPE, UPDATE_DATA } from '../constants'

function pushData (data) {
	return {
		type: PUSH_DATA2LIST,
		data
	}
}

function pushRandData (data) {
	return {
		type: PUSH_RAND_DATA2LIST,
		data
	}
}
function changeType (data) {
	return {
		type: CHANGE_TYPE,
		data
	}
}

function updateData (data) {
	return {
		type: UPDATE_DATA,
		data
	}
}


export {
	pushData,
	pushRandData,
	changeType,
	updateData,
}