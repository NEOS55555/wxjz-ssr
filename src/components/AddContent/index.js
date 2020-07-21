import React, { Component } from 'react';
import {connect} from 'react-redux'
import moment from 'moment';
import { Input, Button, DatePicker, TimePicker, message } from 'antd'
import { siteImgErrorText } from '@/constants'
import { getRand, dateForNow, getRandOneComment, getRandFace, getID } from '@/common'
import { pushData, updateData } from '@/store/actions'
import ImgFile from '@/comComp/ImgFile'

const timeFormat = 'HH:mm';


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
      imgError: -1,
      contentError: -1,
    })
  }

  nameChange = e => this.setState({name: e.target.value})
  tonameChange = e => this.setState({toname: e.target.value})
  contentChange = e => this.setState({content: e.target.value})


  fileChange = res => {
    this.setState({
      face: res,
    })
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
    this.props.pushData(getRandOneComment(/*this.props.contentList*/))
  }
  onSure = () => {
    const { name, content, face, toname, date, time, imgError } = this.state;
    console.log(imgError)
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
    const { name, content, face, toname, date, time, nameError, contentError } = this.state;
    return (
      <div>
        <p>添加评论内容</p>
        <div className="self-wrapper">
          <div className="self-line must">
            <label className="prev-label">名称</label>
            <div className="self-line-ctn-wp">
              <Input onChange={this.nameChange} value={name} placeholder="名称" />
              {
                // nameError !== -1 && <p className="error-tip">请填写名称</p>
              }
            </div>
          </div>
          <div className="self-line must">
            <label className="prev-label">评论</label>
            <div className="self-line-ctn-wp">
              <Input onChange={this.contentChange} value={content} placeholder="评论内容" />
              {
                // contentError !== -1 && <p className="error-tip">请填写评论内容</p>
              }
            </div>
          </div>
          <ImgFile value={face} onChange={this.fileChange} onError={imgError => this.setState({imgError})} />
          <div className="self-line must">
            <label className="prev-label">时间</label>
            <div className="self-line-ctn-wp">
              <DatePicker value={date} onChange={this.dateChange} />
              <TimePicker
                onChange={this.timeChange}
                value={time}
                format={timeFormat}
              />
            </div>
          </div>
          <div className="self-line">
            <label className="prev-label">对谁评论</label>
            <div className="self-line-ctn-wp">
              <Input onChange={this.tonameChange} value={toname} placeholder="名称" />
            </div>
          </div>
          
          <Button onClick={this.onSure}>添加一条评论</Button>
          <Button onClick={this.onRandSure}>随机添加一条评论</Button>
        </div>
      </div>
    )
  }
}


/*const mapStateToProps = state => {
  const { contentList } = state.reducer;
  return {
    contentList
  };
};*/
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



export default connect(null, mapDispatchToProps)(HomePage)
