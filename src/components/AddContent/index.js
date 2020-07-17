import React, { Component, createRef } from 'react';
import {connect} from 'react-redux'
import moment from 'moment';
import { Input, Button, DatePicker, TimePicker, Popover } from 'antd'
import { pushData } from '@/store/actions'
import { MAX_IMG_SIZE, MAX_IMG_M, faceArr, faceStaticUrl } from '@/constants'
import { getBase64, getRand, dateForNow } from '@/common'
import getName from '@/common/getName'

const timeFormat = 'HH:mm';

const BILI = 0.9;
const siteImgTip = `点击图片进行添加，最大${MAX_IMG_M}M；宽高比 1: 1（也就是正方形），比例相差最小${BILI}（像正方形的长方形）`

const defaultImg = '/static/face.png'

const siteImgErrorText = ['请选择图片', '图片大小不对', '图片比例不对'];

const getRandDate = () => {
  let a = new Date().getTime();
  return new Date(a - getRand(0, 24 * 7) * 1000 * 3600)
}
const getRandTime = () => {
  let a = new Date().getTime();
  return new Date(a - getRand(3, 3600 * 24) * 1000)
}

const contentText = ['牛逼！！！！！', '6666666666666666', '鼓掌！啪啪啪啪啪啪！', '大佬，教我', '好看啊！', '吃饭了没', '你这是哪？', '。。。。。。。', '你是真的6p。']




class HomePage extends Component {
  constructor (props) {
    super(props)
    this.state = this.initData()
  }
  initData = () => {
    const { isRand, list } = this.props
    let ddd = isRand ? getRandDate() : new Date();
    let ttt = isRand ? getRandTime() : new Date();

    let toname = '';
    if (isRand) {
      toname = Math.random() < .5 ? (list[getRand(0, list.length)] || {}).name || '' : '';
    }

    return ({
      name: isRand ? getName() : '',
      content: isRand ? contentText[getRand(0, contentText.length)] : '',
      face: isRand ? faceStaticUrl + faceArr[getRand(0, faceArr.length)] : null,
      toname,
      date: moment(ddd),
      time: moment(ttt),
      nameError: -1,
      contentError: -1,
      imgError: -1,
    })
  }
  fileInput = createRef();

  nameChange = e => this.setState({name: e.target.value})
  tonameChange = e => this.setState({toname: e.target.value})
  contentChange = e => this.setState({content: e.target.value})

  checkImg (file) {
    let flag = -1;
    if (file.size > MAX_IMG_SIZE) {
      flag = 1
    } else if (file.type.indexOf('image') === -1) {
      flag = 0
    }
    return flag;
  }

  fileChange = e => {
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const [file] = files
    const imgError = this.checkImg(file);
    if (imgError !== -1) {
      this.setState({
        imgError
      })
      return;
    }

    
    getBase64(file).then(res => {
      // console.log(res)
      let img = new Image();
      img.src = res;
      img.onload = () => {
        let w = img.width, h = img.height;
        let b = w/h;
        if (b < BILI || b > 1 / BILI) {
          this.setState({
            imgError: 2
          })
          img = null;
          return ;
        }
        this.setState({
          face: res,
          imgError: -1,
        })
        this.fileInput.current.setAttribute('type', 'text');
        this.fileInput.current.setAttribute('type', 'file');
        img = null;
      }
      
    })
    // console.log(this.fileInput)
    
  }

  dateChange = (date) => {
    // console.log(a,b,c)
    this.setState({
      date
    })
  }
  timeChange = (time) => {
    // console.log(a,b,c)
    this.setState({
      time
    })
  }

  onSure = () => {
    const { name, content, face, toname, date, time, imgError } = this.state;
    if (imgError !== -1) {
      console.log('f')
      return;
    }
    
    if (!name) {
      this.setState({
        nameError: 0,
      })
      return;
    }
    if (!content) {
      this.setState({
        contentError: 0,
      })
      return;
    }
    if (!face) {
      this.setState({
        imgError: 0,
      })
      return;
    }
    console.log(date.format('yyyy-MM-DD') + ' ' + time.format('HH:mm:ss'))
    this.props.pushData && this.props.pushData({
      name,
      content,
      face,
      toname,
      time: dateForNow(date.format('yyyy-MM-DD') + ' ' + time.format('HH:mm:ss'))
    })
    this.setState(this.initData())
    
    // console.log(date.format('yyyy-MM-DD'))
    // console.log(time.format(timeFormat))
    // console.log('s')
  }
  render () {
    const { name, content, face, toname, date, time, imgError, nameError, contentError } = this.state;
    return <div className="self-wrapper">
      <div className="self-line must">
        <label>名称</label>
        <Input onChange={this.nameChange} value={name} placeholder="名称" />
        {
          nameError !== -1 && <p className="error-tip">请填写名称</p>
        }
      </div>
      <div className="self-line must">
        <label>评论</label>
        <Input onChange={this.contentChange} value={content} placeholder="评论内容" />
        {
          contentError !== -1 && <p className="error-tip">请填写评论内容</p>
        }
      </div>
      <div className="self-line must">
        <label>图片</label>
        <div className="self-text-wrapper">
          <input ref={this.fileInput} id="uploadImg" type="file" style={{display: 'none'}} onChange={this.fileChange} accept="image/*"/>
          <Popover placement="topLeft" content={<div>{siteImgTip}</div>} trigger="hover">
            <label htmlFor="uploadImg" className="img-ctn">
              <img src={ face || defaultImg } alt=""/>
            </label>
          </Popover>
          {
            imgError !== -1 && <p className="error-tip">{siteImgErrorText[imgError]}</p>
          }
        </div>
      </div>
      <div className="self-line must">
        <label>时间</label>
        <DatePicker value={date} onChange={this.dateChange} />
        <TimePicker
          onChange={this.timeChange}
          value={time}
          format={timeFormat}
        />
      </div>
      <div className="self-line">
        <label>对谁评论</label>
        <Input onChange={this.tonameChange} value={toname} placeholder="名称" />
      </div>
      
      <Button onClick={this.onSure}>添加一条数据</Button>
    </div>
  }
}





export default (HomePage);
