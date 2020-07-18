import React from 'react'
import Link from 'next/link'


// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

const stepArr = [
  {
    txt: '进入微信 我，之后点击“相册”', 
    img: 'static/bz/1.jpg'
  },
  {
    txt: '点击“我的朋友圈”', 
    img: 'static/bz/2.jpg'
  },
  {
    txt: '点击“详情”', 
    img: 'static/bz/3.jpg'
  },
  {
    txt: '点击“右下角”', 
    img: 'static/bz/4.jpg'
  },
  {
    txt: '截图完事', 
    img: 'static/bz/5.jpg'
  },
  {
    txt: '之后进入首页，进行配置选择，然后选择微信截图', 
    img: 'static/bz/6.png'
  },
  {
    txt: '最后根据配置，选择按钮生成图片', 
    img: 'static/bz/7.png'
  }
]
class Homepage extends React.Component {
  
  render() {
    return (
      <div className="step-container" >
        {
          stepArr.map((it, index) => {
            return (
              <div key={index}>
                <p>{index + 1}.{it.txt}</p>
                <img src={it.img} alt={it.txt}/>
              </div>
            )
          })
        }
        
       
        <p>最后的最后，手机端长按图片保存，pc端鼠标右键保存</p>
        <Link href="/"><a>点此处返回</a></Link>
        
      </div>
    )
  }
}

export default Homepage