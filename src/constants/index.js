const MAX_IMG_M = 2;
const M = 1024 * 1024

export const PUSH_DATA2LIST = 'PUSH_DATA2LIST';
export const PUSH_RAND_DATA2LIST = 'PUSH_RAND_DATA2LIST';
export const CHANGE_TYPE = 'CHANGE_TYPE';
export const UPDATE_DATA = 'UPDATE_DATA';

export const MAX_IMG_SIZE = M * MAX_IMG_M;
export const faceStaticUrl = '/static/face/'

let faceArr = [];
for (let i = 0; i < 120; i++) {
	faceArr.push((i+1) + '.jpg')
}

export {
	MAX_IMG_M,
	faceArr
}
