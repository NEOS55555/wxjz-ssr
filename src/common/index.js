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

function getRand(a, b) {
	return Math.floor(Math.random() * (b - a) + a)
}
const dateForNow = date => {
	date = new Date(date);
	// 相差的秒数
	const xs = (new Date().getTime() - date.getTime()) / 1000
	const xm = xs / 60 
	const xh = xm / 60
	const xd = xh / 24;
	if (xd > 7) {
		return transDate(date);
	} else if (xd >= 1) {
		return Math.floor(xd) + '天前'
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

export {
	getRand,
	dateForNow,
}