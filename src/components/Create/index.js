import React, { createRef } from 'react'
import { getBase64 } from '@/common'
import {connect} from 'react-redux'
import { Button } from 'antd'
// import Make from '@/components/Make'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { updateData } from '@/store/actions'

const Make = dynamic(
  () => import('@/components/Make'),
  { ssr: false }
)

function TempComp (props) {
  return <Make {...props}></Make>
}
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&


class Homepage extends React.Component {
  fileInput = createRef(null);
  
  fileChange = e => {
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const [file] = files
    
    getBase64(file).then(res => {
      // console.log(res)
      let img = new Image();
      img.src = res;
      img.onload = () => {
     
        this.props.updateData({
          cover: res,
        })
        this.fileInput.current.setAttribute('type', 'text');
        this.fileInput.current.setAttribute('type', 'file');
        img = null;
      }
      
    })
    // console.log(this.fileInput)
    
  }
  render() {
    const { cover } = this.props;
    return (
      <div>
        <div style={{paddingBottom: 20}} >
          <Link href="./diy"><a className="ant-btn">配置</a></Link>
          {/*<Link href="./rand"><a>随机配置</a></Link>*/}
        </div>
        <div className="img-flex">
          <label htmlFor="file" className="ant-btn" >上传截图</label>
          <img className="show-img top-small" src={cover} alt=""/>
        </div>
        <TempComp />
        <input onChange={this.fileChange} ref={this.fileInput} id="file" type="file" style={{display: 'none'}} />
      </div>
    )
  }
}
const mapStateToProps = state => {
  const { cover } = state.reducer;
  return {
    cover
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateData (params) {
      return dispatch(updateData(params))
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)