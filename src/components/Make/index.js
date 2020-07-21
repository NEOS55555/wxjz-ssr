import React, { createRef } from 'react'
import makeImg from '@/common/make'
import { Button, message } from 'antd'
import {connect} from 'react-redux'
import { getRandFace, getRandComments, getRand } from '@/common'


// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&


class Homepage extends React.Component {
 
  render() {
    const { cover, contentList, avotrsList } = this.props;
    return (
      <div style={{padding: '20px 0'}}>
       <Button onClick={() => {
          document.querySelector('#loading').style.display = 'flex'
          makeImg({
            avtors: avotrsList.length === 0 ? getRandFace(getRand(10, 40)) : avotrsList,
            replyArr: contentList,
            targetImg: cover,
            success (canvas) {
              document.querySelector('#show-img').src = canvas.toDataURL()
              document.querySelector('#loading').style.display = 'none'
            },
            error (msg) {
              message.error(msg)
              document.querySelector('#loading').style.display = 'none'
            }
          })
        }}>生成配置图片</Button>
        <Button onClick={() => {
          document.querySelector('#loading').style.display = 'flex'
          makeImg({
            avtors: getRandFace(getRand(10, 40)),
            replyArr: getRandComments(),
            targetImg: cover,
            success (canvas) {
              document.querySelector('#show-img').src = canvas.toDataURL()
              document.querySelector('#loading').style.display = 'none'
            },
            error (msg) {
              message.error(msg)
              document.querySelector('#loading').style.display = 'none'
            }
          })
        }}>随机生成</Button>
        <br/>
        <img id="show-img" className="show-img" alt=""/>
      </div>
    )
  }
}
const mapStateToProps = state => {
  // const { cover,  } = state.reducer;
  return {
    ...state.reducer
  };
};

export default connect(mapStateToProps)(Homepage)
