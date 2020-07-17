import React, { createRef } from 'react'
import { Button } from 'antd'
import { Slider } from 'antd';
import AddContent from '@/components/AddContent'
import { pushRandData, updateData } from '@/store/actions'
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
    const { randContentList, updateData, pushRandData } = this.props;
    return (
      <div>
      
        <div>
          头像个数:{avtorNum} <Slider min={5} defaultValue={avtorNum} onChange={avtorNum => this.setState({avtorNum})} />
        </div>
        <div>
          添加评论内容
          <AddContent isRand={true} list={randContentList} pushData={pushRandData} ></AddContent>
        </div>
        <div>
          评论
          <Comment list={randContentList} ></Comment>
        </div>
        <Link href="/"><a className="ant-btn" onClick={()=> updateData({type: 1, randAvotrsList: getRandFace(avtorNum)})} >保存并返回</a></Link>
      </div>
    )
  }
}
const mapStateToProps = state => {
  const { randContentList } = state.reducer;
  return {
    randContentList
  };
};
const mapDispatchToProps = dispatch => {
  return {
    pushRandData (params) {
      return dispatch(pushRandData(params))
    },
    updateData (params) {
      return dispatch(updateData(params))
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)