import React, { createRef } from 'react'
import { Button } from 'antd'
import { Slider } from 'antd';
import AddContent from '@/components/AddContent'
import { pushData, updateData } from '@/store/actions'
import {connect} from 'react-redux'
import { faceArr, faceStaticUrl } from '@/constants'
import Comment from '@/components/Comment'
import { getRand } from '@/common'
import Link from 'next/link'

const getRandFace = (len) => {
  let a = faceArr.slice();
  let arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(faceStaticUrl + a.splice(getRand(0, a.length), 1)[0])
  }
  return arr;
}

class Homepage extends React.Component {
  state = {
    avtorNum: 30,
  }
  render() {
    const { avtorNum } = this.state;
    const { contentList, updateData, pushData } = this.props;
    return (
      <div>
      
        <div>
          头像个数:{avtorNum} <Slider min={5} defaultValue={avtorNum} onChange={avtorNum => this.setState({avtorNum})} />
        </div>
        <div>
          添加评论内容
          <AddContent list={contentList} pushData={pushData} ></AddContent>
        </div>
        <div>
          评论
          <Comment list={contentList} ></Comment>
        </div>
        <Link href="/"><a className="ant-btn" onClick={()=> updateData({type: 1, avotrsList: getRandFace(avtorNum)})} >保存并返回</a></Link>
      </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)