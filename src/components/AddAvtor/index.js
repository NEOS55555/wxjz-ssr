import React, { Component } from 'react';
import { message, Button } from 'antd'
import { siteImgErrorText } from '@/constants'
import { getRandOneComment, getRandFace, getID } from '@/common'
import { pushAvtor, updateData } from '@/store/actions'
import ImgFile from '@/comComp/ImgFile'



class HomePage extends Component {
  constructor (props) {
    super(props)
    this.state = this.initData()
  }
  initData = () => {
    return ({
      face: getRandFace(1)[0],
      imgError: -1,
    })
  }

  fileChange = res => {
    this.setState({
      face: res,
    })
  }

 
  onRandSure = () => {
    const { id, face } = getRandOneComment()
    this.props.pushAvtor({id, face})
  }
  onSure = () => {
    const { face, imgError } = this.state;
    console.log(imgError)
    if (imgError !== -1) {
      message.error(siteImgErrorText[imgError])
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
    this.props.pushAvtor({
      id: getID(),
      face,
    })
    this.setState(this.initData())
    
    // console.log(date.format('yyyy-MM-DD'))
    // console.log(time.format(timeFormat))
    // console.log('s')
  }
  render () {
    const { face } = this.state;
    return (
      <div>
        <p>添加头像</p>
        <div className="self-wrapper">
          {/*<div className="self-line must">
            <label className="prev-label">名称</label>
            <div className="self-line-ctn-wp">
              <Input onChange={this.nameChange} value={name} placeholder="名称" />
            </div>
          </div>*/}
         
          <ImgFile value={face} onChange={this.fileChange} onError={imgError => this.setState({imgError})} />
         
        </div>
        <Button onClick={this.onSure}>添加头像</Button>
        <Button onClick={this.onRandSure}>随机添加头像</Button>
      </div>
    )
  }
}




const mapDispatchToProps = dispatch => {
  return {
    pushAvtor (params) {
      return dispatch(pushAvtor(params))
    },
    updateData (params) {
      return dispatch(updateData(params))
    },
  };
};


export default connect(null, mapDispatchToProps)(HomePage)

