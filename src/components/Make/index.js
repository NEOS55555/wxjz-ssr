import React, { createRef } from 'react'
import makeImg from '@/common/make'
import { Button } from 'antd'
import {connect} from 'react-redux'
import './make.css'


// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&


class Homepage extends React.Component {
 
  render() {
    const { cover, contentList, avotrsList, randContentList, randAvotrsList } = this.props;
    return (
      <div >
       <Button onClick={() => {
          document.querySelector('#loading').style.display = 'flex'
          makeImg({
            avtors: avotrsList,
            replyArr: contentList,
            targetImg: cover,
            success (canvas) {
              document.querySelector('#show-img').src = canvas.toDataURL()
              document.querySelector('#loading').style.display = 'none'
            },
            error () {
              alert('图片有误，不是wx截图')
              document.querySelector('#loading').style.display = 'none'
            }
          })
        }}>生成自定义</Button>
        <Button onClick={() => {
          console.log(document.querySelector('#loading'))
          document.querySelector('#loading').style.display = 'flex'
          makeImg({
            avtors: randAvotrsList,
            replyArr: randContentList,
            targetImg: cover,
            success (canvas) {
              document.querySelector('#show-img').src = canvas.toDataURL()
              document.querySelector('#loading').style.display = 'none'
            },
            error () {
              alert('图片有误，不是wx截图')
              document.querySelector('#loading').style.display = 'none'
            }
          })
        }}>生成随机</Button>
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
