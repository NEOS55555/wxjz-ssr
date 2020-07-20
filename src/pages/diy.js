import React, { createRef } from 'react'
import { Button } from 'antd'
import { Slider } from 'antd';
import AddContent from '@/components/AddContent'
import { pushData, updateData } from '@/store/actions'
import {connect} from 'react-redux'
import { faceArr, faceStaticUrl } from '@/constants'
import Comment from '@/components/Comment'
import { getRandFace } from '@/common'
import Link from 'next/link'


class Homepage extends React.Component {
  state = {
    avtorNum: 30,
  }
  render() {
    const { avtorNum } = this.state;
    const { updateData } = this.props;
    return (
      <div>
      
        <div>
          点赞头像个数:{avtorNum} <Slider min={5} defaultValue={avtorNum} onChange={avtorNum => this.setState({avtorNum})} />
        </div>
        <AddContent />
        <Comment />
        <Link href="/">
          <a className="ant-btn" onClick={()=> updateData({avotrsList: getRandFace(avtorNum)})} >保存并返回</a>
        </Link>
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

export default connect(null, mapDispatchToProps)(Homepage)