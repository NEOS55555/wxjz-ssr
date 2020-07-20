import React, { Component, createRef } from 'react';
import {connect} from 'react-redux'
import moment from 'moment';
import { Input, Button, DatePicker, TimePicker, message } from 'antd'
import { MAX_IMG_SIZE, MAX_IMG_M } from '@/constants'
import { getBase64, getRand, dateForNow, getRandOneComment, getRandFace, getID } from '@/common'
import { pushData, updateData } from '@/store/actions'

const timeFormat = 'HH:mm';

const BILI = 0.9;
const siteImgTip = `点击图片进行添加，最大${MAX_IMG_M}M；宽高比最好 1 : 1，比例最小1 : ${BILI}`

const defaultImg = '/static/face.png'

const siteImgErrorText = ['请选择图片', '图片大小不对', '图片比例不对'];

/*const getRandDate = () => {
  let a = new Date().getTime();
  return new Date(a - getRand(0, 24 * 7) * 1000 * 3600)
}
const getRandTime = () => {
  let a = new Date().getTime();
  return new Date(a - getRand(3, 3600 * 24) * 1000)
}*/


class HomePage extends Component {
  constructor (props) {
    super(props)
    this.state = this.initData()
  }
  initData = () => {
    // const { isRand, list } = this.props
    /*let ddd = isRand ? getRandDate() : new Date();
    let ttt = isRand ? getRandTime() : new Date();

    let toname = '';
    if (isRand) {
      toname = Math.random() < .5 ? (list[getRand(0, list.length)] || {}).name || '' : '';
    }*/

    return ({
      name: '',
      content: '',
      face: getRandFace(1)[0],
      toname: '',
      date: moment(),
      time: moment(),
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
      message.error(siteImgErrorText[imgError])
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
          message.error(siteImgErrorText[2])
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
  onRandSure = () => {
    this.props.pushData(getRandOneComment(this.props.contentList))
  }
  onSure = () => {
    const { name, content, face, toname, date, time, imgError } = this.state;
    if (imgError !== -1) {
      message.error(siteImgErrorText[imgError])
      return;
    }
    
    if (!name) {
      this.setState({
        nameError: 0,
      })
      message.error('请填写名称')
      return;
    }
    if (!content) {
      this.setState({
        contentError: 0,
      })
      message.error('请填写评论')
      return;
    }
    if (!face) {
      this.setState({
        imgError: 0,
      })
      message.error('请选择头像')
      return;
    }
    // console.log(date.format('yyyy-MM-DD') + ' ' + time.format('HH:mm:ss'))
    this.props.pushData({
      id: getID(),
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
        <label className="prev-label">图片</label>
        <div className="self-text-wrapper">
          <input ref={this.fileInput} id="uploadImg" type="file" style={{display: 'none'}} onChange={this.fileChange} accept="image/*"/>
          <label htmlFor="uploadImg" className="img-ctn">
            <img src={ face || defaultImg } alt=""/>
          </label>
          <div>{siteImgTip}</div>
        </div>
      </div>
     
      
      <Button onClick={this.onSure}>添加头像</Button>
      <Button onClick={this.onRandSure}>随机添加一张头像</Button>
    </div>
  }
}


const mapStateToProps = state => {
  const { contentList } = state.reducer;
  return {
    contentList
  };
};
const mapDispatchToProps = dispatch => {
  return {
    pushData (params) {
      return dispatch(pushData(params))
    },
    updateData (params) {
      return dispatch(updateData(params))
    },
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
