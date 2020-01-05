import { combineReducers } from 'redux'
import {
  SELECT_QUERY,
  REQUEST_DATA,
  RECEIVE_DATA
} from './actions'

function selectedQuery(state = 'user', action) {
  switch (action.type) {
    case SELECT_QUERY:
      return action.query
    default:
      return state
  }
}

function data(
  state = {
    isFetching: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_DATA:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.data
      })
    default:
      return state
  }
}

function dataByQuery(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DATA:
    case REQUEST_DATA:
      return Object.assign({}, state, {
        [action.query]: data(state[action.query], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  dataByQuery,
  selectedQuery
})

export default rootReducer