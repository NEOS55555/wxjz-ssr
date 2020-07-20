import React, { Fragment } from 'react'
import {connect} from 'react-redux'
import { CloseOutlined } from '@ant-design/icons';
import { updateData } from '@/store/actions'
import './index.scss'

class Index extends React.Component {
  render() {
  	const { contentList, updateData } = this.props;
    return (
      <div className="show-wrapper">
    		<p>评论列表({contentList.length})</p>
				<div className="show-reply-ctn">
				{
					contentList.map((it) => {
						const rpt = it.toname ? <Fragment>回复<span className="name">{it.toname}</span>: </Fragment> : ''
						return (
							<div key={it.id} className="show-reply-item">
								<img className="avtor" src={it.face} alt="" />
								<div className="show-reply-item-content">
									<div className="show-reply-tip">
										<div>
											<span className="name">{it.name}</span>
											<span className="time">{it.time}</span>
										</div>

										<CloseOutlined style={{fontSize: 16}} onClick={() => {
											updateData({
												contentList: contentList.filter(t => t.id !== it.id)
											})
											
										}} />
									</div>
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

const mapStateToProps = state => {
  const { contentList } = state.reducer;
  return {
    contentList
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateData (params) {
      return dispatch(updateData(params))
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Index)
// export default (Index);
