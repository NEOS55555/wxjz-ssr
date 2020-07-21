import { PUSH_DATA2LIST, PUSH_AVTOR2LIST, UPDATE_DATA } from '../../constants'

const initState = {
  cover: null,
  contentList: [],
  avotrsList: [],
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
    case PUSH_AVTOR2LIST:
      return {
        ...state,
        avotrsList: [...state.avotrsList, data]
      }
   
    default:
      return state
  }
};
