import React from 'react'
import Comment from '@/components/Comment'
import './index.scss'

class Index extends React.Component {
  render() {
  	const { data, list } = this.props;
    return (
      <div className="show-wrapper">
				<div className="content">
					<div className="face-ctn ctn">
						<div className="face-img">
							<img className="avtor" src='{it}' alt="" />
						</div>
					</div>
					<Comment />
				</div>
			</div>
    )
  }
}

export default Index