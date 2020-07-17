import React from 'react'
import Create from '@/components/Create'
import '@/styles/index.scss'


// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&


class Homepage extends React.Component {
  
  render() {
    return (
      <div className="all-container" >
        <h1>微信集攒</h1>
        <p>当然并<b className="import">不是真的</b>点赞，只是<b className="import">用ps修改成你想要的样子。</b></p>
        <p>目前只是随机版玩一玩，自定义头像功能等有空了再开发。</p>
        {/*<p>看使用人数多少，再来决定制作聊天版或者朋友圈版</p>*/}
        <h2>使用方法：</h2>
        <p>
          进入微信 <b className="import">我->相册->我的朋友圈->点入详情，之后再点击右下角</b>
        </p>
        <p>
          进入详情后，就截图，最好把你发的图带上这样更好看。之后就可以进行配置了。。。
        </p>
        <h2>按钮解释：</h2>
        <p>
          生成自定义：<b className="import">用自定义配置生成图片</b>
        </p>
        <p>
          生成随机：<b className="import">用随机配置生成图片</b>
        </p>
        <p>
          <b className="import">有任何想反馈的可以到<a target="_blank" href="http://uquwang.net/feedback">有趣网</a>反馈</b>
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