import React, { Fragment } from 'react'
import {connect} from 'react-redux'
import './index.scss'

class Index extends React.Component {
  render() {
  	const { list } = this.props;
    return (
      <div className="show-wrapper">
			<div className="show-reply-ctn">
			{
				list.map((it, index) => {
					const rpt = it.toname ? <Fragment>回复<span className="name">{it.toname}</span>: </Fragment> : ''
					return (
						<div key={index} className="show-reply-item">
							<img className="avtor" src={it.face} alt="" />
							<div className="show-reply-item-content">
								<p className="show-reply-tip">
									<span className="name">{it.name}</span>
									<span className="time">{it.time}</span>
								</p>
								<p className="show-reply-text" >{rpt}{it.content}</p>
							</div>
						</div>
					)
				})
			}
				
			</div>
		</div>
    )
  }
}



export default (Index);
