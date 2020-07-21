import React, { Component, createRef } from 'react';
import { Input, Button, DatePicker, TimePicker, message } from 'antd'
import { MAX_IMG_SIZE, MAX_IMG_M, BILI, siteImgErrorText } from '@/constants'
import { getBase64, getID } from '@/common'

const siteImgTip = `点击图片进行添加，最大${MAX_IMG_M}M；宽高比最好 1 : 1，比例最小1 : ${BILI}`

const defaultImg = '/static/face.png'



class HomePage extends Component {
  
  fileInput = createRef();


  checkImg (file) {
    let flag = -1;
    if (!file) {
      return flag
    }
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
      this.props.onError(imgError)
      message.error(siteImgErrorText[imgError])
      return;
    }

    
    getBase64(file).then(res => {
      // console.log(res)
      let img = new Image();
      img.src = res;
      img.onload = () => {
        let w = img.width, h = img.height;
        let b = w/h, b1 = h/w;
        if (b < BILI || b > 1 / BILI || b1 < BILI || b1 > 1 / BILI) {
          img = null;
          this.props.onError(2)
          message.error(siteImgErrorText[2])
          return ;
        }
        this.props.onChange(res, file)
        this.fileInput.current.setAttribute('type', 'text');
        this.fileInput.current.setAttribute('type', 'file');
        img = null;
      }
      
    })
  }

  render () {
    const { value } = this.props;
    return (
      <div className="self-line must">
        <label className="prev-label">头像</label>
        <div className="self-text-wrapper">
          <input ref={this.fileInput} id="uploadImg" type="file" style={{display: 'none'}} onChange={this.fileChange} accept="image/*"/>
          <label htmlFor="uploadImg" className="img-ctn">
            <img src={ value || defaultImg } alt=""/>
          </label>
          <div>{siteImgTip}</div>
        </div>
      </div>
    )
  }
}





export default HomePage
