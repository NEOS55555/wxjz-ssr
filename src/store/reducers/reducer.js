import { PUSH_DATA2LIST, PUSH_RAND_DATA2LIST, CHANGE_TYPE, UPDATE_DATA } from '../../constants'

const initState = {
  cover: null,
  contentList: [],
  avotrsList: [],
  randContentList: [],
  randAvotrsList: [],

  type: 0,  // 0自定义 1随机
};

export default (state = initState, {type, data}) => {
  switch (type) {
    case UPDATE_DATA:
      return {
        ...state,  /* { contentList: [], type: 1 } */
        ...data
      }
    case PUSH_DATA2LIST:
      return {
        ...state,
        contentList: [...state.contentList, data]
      }
   
    case PUSH_RAND_DATA2LIST:
      return {
        ...state,
        randContentList: [...state.randContentList, data]
      }
   
    case CHANGE_TYPE:
      return {
        ...state,
        type: data
      }
   
    default:
      return state
  }
};
