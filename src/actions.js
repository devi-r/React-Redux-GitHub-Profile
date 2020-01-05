import fetch from 'isomorphic-fetch'

export const REQUEST_DATA = 'REQUEST_DATA'
export const RECEIVE_DATA = 'RECEIVE_DATA'
export const SELECT_QUERY = 'SELECT_QUERY'

export function selectQuery(query) {
  return {
    type: SELECT_QUERY,
    query
  }
}

function requestData(query) {
  return {
    type: REQUEST_DATA,
    query
  }
}

function receiveData(query, json) {
  return {
    type: RECEIVE_DATA,
    query,
    data: json
  }
}

function fetchData(query) {
  return dispatch => {
    dispatch(requestData(query))
    var url;
    if(query==='user'){
    	url = "https://api.github.com/users/supreetsingh247";
    }
    else{
    	url = "https://api.github.com/users/supreetsingh247/repos";
    }
    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receiveData(query, json)))
  }
}

function shouldFetchData(state, query) {
  const data = state.dataByQuery[query]
  if (!data) {
    return true
  } else if (data.isFetching) {
    return false
  }
}

export function fetchDataIfNeeded(query) {
  return (dispatch, getState) => {
    if (shouldFetchData(getState(), query)) {
      return dispatch(fetchData(query))
    }
  }
}

