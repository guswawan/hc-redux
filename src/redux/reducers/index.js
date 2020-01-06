import { combineReducers } from 'redux'
import engineerProfile from './Engineer/engineerProfile'
import engineer from './Engineer/engineer'


const rootReducer = combineReducers({
  engineerProfile,
  engineer
});

export default rootReducer;
