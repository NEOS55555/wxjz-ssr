import { PUSH_DATA2LIST, PUSH_AVTOR2LIST, UPDATE_DATA } from '../constants'

function pushData (data) {
	return {
		type: PUSH_DATA2LIST,
		data
	}
}
function pushAvtor (data) {
	return {
		type: PUSH_AVTOR2LIST,
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
	pushAvtor,
	updateData,
}