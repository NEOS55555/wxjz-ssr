// import domtoimage from 'dom-to-image';
import html2canvas from 'html2canvas';
import { dateForNow } from './index'

function transMap (tempCanvasData) {
	var arr = [];
  var data = tempCanvasData.data;
  for ( var y = 0; y < tempCanvasData.height; y++) {    
		for ( var x = 0; x < tempCanvasData.width; x++) {    
      arr[y] = arr[y] || []
      let m = (x + y * tempCanvasData.width) * 4
      /*arr[y].push({
      	r: data[m],
      	g: data[m + 1],
      	b: data[m + 2],
      	a: data[m + 3],
      })*/
      arr[y].push([data[m], data[m+1], data[m+2], data[m+3]])
    }
	}
	return arr;
}

function copyImageData (context, src) {
    var dst = context.createImageData(src.width, src.height);
    dst.data.set(src.data);
    return dst;
}

function getContentStart (temp1, starti=0, from0) {
	for (let i = starti; i < temp1.length; i++) {
		// if (isook(temp1, i, from0)) {
		if (isook(temp1, i, from0) && isook(temp1, i + 1, from0)) {
			return i
		}
	}
}

function isook (arr, i, from0) {
	const s = from0 ? 0 : 40;
	if (isOk(arr[i][s])) {
		for (let j = s+1; j < arr[i].length - s; j++) {
			if (!isOk(arr[i][j])) {
				return false
			}
		}
	} else {
		return false;
	}
	return i
}

function isOk (a) {
	return a.join(',') === '247,247,247,255'
}
function oriTrans (mapArr) {
	let arr = [];
	let len = mapArr.length;
	let jlen = mapArr[0].length

	/*let i = 0, j = 0;
	while (i < len && j < jlen) {
		arr.push(...mapArr[i][j++])
		if (j % jlen === 0 && j !== 0) {
			i++;
			j = 0;
		}
	}*/
	for (let i = 0; i < len; i++) {
		for (let j = 0; j < jlen; j++) {
			arr.push(...mapArr[i][j])
		}
	}
	// console.log('otherData----', otherData)
	// return new ImageData(new Uint8ClampedArray([...arr, ...[].slice.call(otherData.data)]), jlen, len + otherData.height);
	// return otherData;
	return new ImageData(new Uint8ClampedArray([...arr]), jlen, len);
}

function concatData (imgDatas=[]) {
	let arr = [];
	let h = 0;
	// console.log(imgDatas)
	
	imgDatas.forEach(it => {
		if (!it) {
			return
		}
		arr = arr.concat([].slice.call(it.data))
		h += it.height
	})
	return new ImageData(new Uint8ClampedArray(arr), imgDatas[0].width, h)
}

function getWhiteData (width, height) {
	let arr = []
	if (height < 0) {
		// return;
		height = 100
	}
	for (let i = 0, len = width * height; i < len; i++) {
		arr.push(255, 255, 255, 255)
	}
	return new ImageData(new Uint8ClampedArray(arr), width, height);
}
function addZero (t) {
	return t < 10 ? '0' + t : t
}



/*
replyArr: [{name, face, content, toname}]

 */
function getImageData ({div, avtors=[], replyArr=[], targetImg, success, error}) {
	const oru = location.origin;
	let avtorHstr = '';
	avtors.forEach(it => {
		avtorHstr += `<img crossOrigin="anonymous" class="avtor" src="${oru}${it}" alt="">`
	})
	if (!targetImg) {
		return error && error()
	}
	
	let replyHstr = '';
	replyArr.forEach(({name, face, content, toname, time}) => {
		let rpt = toname ? `回复<span class="name">${toname}</span>: ` : ''
		replyHstr += `
		crossorigin
			<div class="reply-item">
				<img crossOrigin="anonymous" class="avtor" src="${oru}${face}" alt="">
				<div class="reply-item-content">
					<p class="reply-tip">
						<span class="name">${name}</span>
						<span class="time">${(time)}</span>
					</p>
					<p class="reply-text" >${rpt}${content}</p>
				</div>
			</div>
		`
	})

	const html = `
		<div class="container">
			<div class="content">
				<div class="face-ctn ctn">
					<img crossOrigin="anonymous" class="tip" src="${oru}/static/wx/z.png" alt="">
					<div class="face-img">
						${avtorHstr}
					</div>
				</div>
				<div class="text-ctn ctn">
					<img crossOrigin="anonymous" class="tip" src="${oru}/static/wx/x.png" alt="">
					<div class="reply-ctn">
						${replyHstr}
					</div>
				</div>
			</div>
		</div>
	`
	div.innerHTML = html
	const ctnNode = div.querySelector(".container");
	setTimeout(function () {
		// domtoimage.toPixelData(ctnNode).then(pixels => {
		html2canvas(ctnNode)
		.then(canvas => {
			return canvas.getContext('2d').getImageData(0, 0, ctnNode.offsetWidth, ctnNode.offsetHeight).data
		}).then(pixels => {
			// console.log(pixels)
			// var img = new Image();
			// img.src = dataUrl;
			// document.body.appendChild(img)
	    const canvasData = new ImageData(pixels, ctnNode.offsetWidth, ctnNode.offsetHeight)
	    /*{
				data: pixels,
				width: ctnNode.offsetWidth,
				height: ctnNode.offsetHeight
	    };*/
		  // console.log('canvasData ---- ', canvasData)
			
	    var img = new Image()
			img.src = targetImg
			img.crossOrigin='anonymous'
		  img.onload = function () {
		  	// console.log(this.width, this.height)
				var startTime = new Date().getTime()
				const maxHeight = this.height
		  	var canvas = document.createElement("canvas");
		  	canvas.width = this.width
  			canvas.height = this.height
			  let context = canvas.getContext("2d");
			  context.drawImage(this, 0, 0, this.width, this.height);
			  let casData = (context.getImageData(0, 0, canvas.width, canvas.height))
				const arr = transMap(casData, canvas)
				console.log('初始花费：', new Date().getTime() - startTime)

				var startTime1 = new Date().getTime()
				const contentStarti = getContentStart(arr);
				if (contentStarti === undefined) {
					return error && error()
				}

				const lastReplyStarti = getContentStart(arr, contentStarti, true)

				console.log('计算花费：', new Date().getTime() - startTime1)

				var startTime2 = new Date().getTime()

				const topContent = oriTrans(arr.slice(0, contentStarti-1));

				const centerContent = canvasData;
				const lastContent = oriTrans(arr.slice(lastReplyStarti, arr.length))
				
				const flen = topContent.height + centerContent.height + lastContent.height;

				const whiteData = getWhiteData(this.width, maxHeight - flen);
				console.log('获取Data花费：', new Date().getTime() - startTime2)

				var startTime3 = new Date().getTime()
				context.clearRect(0, 0, this.width, this.height)
				canvas.width = this.width;
				canvas.height = flen + whiteData.height;
				context.putImageData(topContent, 0, 0);
				context.putImageData(centerContent, 0, topContent.height);
				context.putImageData(whiteData, 0, topContent.height + centerContent.height);
				context.putImageData(lastContent, 0, topContent.height + centerContent.height + whiteData.height);
				console.log('push花费：', new Date().getTime() - startTime3)

				success && success(canvas);
		  	
		  	// var canvas2 = document.getElementById("canvas2");
				// document.body.removeChild(topCanvas)
		  }
		});
	
	}, 1300)
}


function getImageCb () {
	const div = document.createElement('div');
	div.style.position = 'absolute';
	div.style.left = '-3000px';
	document.body.appendChild(div)
	return function (o) {
		getImageData({...o, div})
	}
}
const getImageCanvas = getImageCb();



export default getImageCanvas



