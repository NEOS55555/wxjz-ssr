const MAX_IMG_M = 2;
const M = 1024 * 1024

export const PUSH_DATA2LIST = 'PUSH_DATA2LIST';
export const UPDATE_DATA = 'UPDATE_DATA';
export const PUSH_AVTOR2LIST = 'PUSH_AVTOR2LIST';
export const siteImgErrorText = ['请选择图片', '图片大小不对', '图片比例不对'];

export const MAX_IMG_SIZE = M * MAX_IMG_M;
export const faceStaticUrl = '/static/face/'
export const BILI = .9

let faceArr = [];
for (let i = 0; i < 120; i++) {
	faceArr.push((i+1) + '.jpg')
}

export {
	MAX_IMG_M,
	faceArr
}
