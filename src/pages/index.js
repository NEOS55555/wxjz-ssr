import React from 'react'
import Create from '@/components/Create'
import '@/styles/index.scss'
import Link from 'next/link'


// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&


class Homepage extends React.Component {
  
  render() {
    return (
      <div className="all-container" >
        <h1>微信集攒-集赞活动的必需品</h1>
        <p>当然并<b className="import">不是真的</b>点赞，只是<b className="import">用ps修改成你想要的样子。</b></p>
        {/*<p>看使用人数多少，再来决定制作聊天版或者朋友圈版</p>*/}
        <h2>使用方法：</h2>
        <p>
          进入微信 <b className="import">我->相册->我的朋友圈->点入详情，之后再点击右下角->截图->上传截图->配置或者“随机生成”</b>
        </p>
        <p>
          <Link href="/step"><a>点击此处进入说明</a></Link>
        </p>
        <p>
          <b className="import">有任何想反馈的可以到<a target="_blank" href="http://uquwang.net/feedback">有趣实用网</a>反馈</b>
        </p>
        <div id="loading" className="loading">
          <span style={{animationDelay: '0s'}} >L</span>
          <span style={{animationDelay: '0.1s'}} >O</span>
          <span style={{animationDelay: '0.2s'}} >A</span>
          <span style={{animationDelay: '0.3s'}} >D</span>
          <span style={{animationDelay: '0.4s'}} >I</span>
          <span style={{animationDelay: '0.5s'}} >N</span>
          <span style={{animationDelay: '0.6s'}} >G</span>
        </div>
        <Create />
      </div>
    )
  }
}

export default Homepage