import { faceArr, faceStaticUrl } from '@/constants'
import getName from './getName'

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    if (!file) {
    return resolve(null)
    }
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
let id = 0;
const getID = () => {
	return id++;
}
function addZero (t) {
	return t < 10 ? '0' + t : t;
}
function getRand(a, b) {
	return Math.floor(Math.random() * (b - a) + a)
}
function transDate (time, onlyTime) {
	const date = new Date(time);
	let timenow = addZero(date.getHours()) + ':' + addZero(date.getMinutes())
	if (onlyTime) {
		return timenow
	}
	return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日' + ' ' + timenow
}
const dateForNow = date => {
	date = new Date(date);
	let xds = new Date().getDate() - date.getDate()
	let isYesterday = xds === 1;
	// 相差的秒数
	const xs = (new Date().getTime() - date.getTime()) / 1000
	const xm = xs / 60 
	const xh = xm / 60
	const xd = xh / 24;
	if (xds > 1) {
		return transDate(date);
	} else if (isYesterday) {
		return `昨天 ` + transDate(date, true)
	} else if (xh >= 1) {
		return Math.floor(xh) + '小时前'
	} else if (xm >= 1) {
		return Math.floor(xm) + '分钟前'
	} else if (xs >= 10) {
		return Math.ceil(xs) + '秒前'
	} else {
		return '刚刚';
	}
}

const getRandDate = () => {
  	let a = new Date().getTime();
  	
	return new Date(a - getRand(0, 24 * 7) * 1000 * 3600 - getRand(3, 3600 * 24) * 1000)
}
const contentText = ['牛逼！！！！！', '6666666666666666', '鼓掌！', '大佬，教我', '好看啊！', '吃饭了没', '你这是哪？', '。。。。。。。', '你是真的6p。', '看着好美味！', '好无聊啊aaaaaaa！！！', '傻乎乎的。。。']
const getRandComTxt = () => {
	return contentText[getRand(0, contentText.length)]
}

const getRandOneComment = () => {
	return {
      name: getName(),
      content: getRandComTxt(),
      face: faceStaticUrl + faceArr[getRand(0, faceArr.length)],
      time: dateForNow(getRandDate()),
      id: getID(),
	}
}

const getRandComments = () => {
	let arr = [];
	let len = getRand(5, 10);
	while(len--) {
		arr.push(getRandOneComment())
	}
	return arr;
}
const getRandFace = (len) => {
	if (len < 0) {
		return [];
	}
	const max = faceArr.length;
	const mmar = len - max;
	len = mmar > 0 ? max : len;

  let a = faceArr.slice();
  let arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(faceStaticUrl + a.splice(getRand(0, a.length), 1)[0])
  }
  return arr.concat(getRandFace(mmar));
}



export {
	getName,
	getRand,
	dateForNow,
	getRandOneComment,
	getRandComments,
	getRandComTxt,
	getRandFace,
	getID,
}