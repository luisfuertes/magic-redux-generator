import {fetch, create, update, remove} from './webservices'
import querystring from 'querystring'

export function createTypes(typeName){
  return {
    ACTIONS_FETCH: 'ACTIONS_FETCH_'+typeName.toUpperCase(),
    ACTIONS_CREATE: 'ACTIONS_CREATE_'+typeName.toUpperCase(),
    ACTIONS_UPDATE: 'ACTIONS_UPDATE_'+typeName.toUpperCase(),
    ACTIONS_DELETE: 'ACTIONS_DELETE_'+typeName.toUpperCase(),
    ACTIONS_SET_FETCHING: 'ACTIONS_SET_FETCHING_'+typeName.toUpperCase(),
    ACTIONS_UPDATE_ITEM: 'ACTIONS_UPDATE_ITEM_'+typeName.toUpperCase(),
    ACTIONS_UPDATE_TOTAL_ITEMS: 'ACTIONS_UPDATE_TOTAL_ITEMS_'+typeName.toUpperCase(),
  }
}

export let createActions = (url, typeName) => {

  const types = createTypes(typeName)

  return {
    setList: (value) => {
      return dispatch({type: types.ACTIONS_FETCH, value})
    },

    setItem: (value) => {
      return dispatch({type: types.ACTIONS_UPDATE_ITEM, value})
    },

    setTotal: (value) => {
      return dispatch({type: types.ACTIONS_UPDATE_TOTAL_ITEMS, value})
    },

    setFetching: (value) => {
      return dispatch({type: types.ACTIONS_SET_FETCHING, value})
    },

    fetch: (queryParams, responseType, onSucess, onError) => {
      var fetchUrl = queryParams ? url + '?' + querystring.stringify(queryParams) : url
      return (dispatch, getState) => {
        fetch(fetchUrl, responseType).then((value) => {
          dispatch({type: types.ACTIONS_FETCH, value:value[responseType]})
          dispatch({type: types.ACTIONS_UPDATE_TOTAL_ITEMS, value:value['total']})
          if(onSucess)
            onSucess(value)
        }).catch((error) => {
          console.log('m-r-g delete ' + typeName + ' error: ': error)
          if(onError)
            onError(error)
        });
      }
    },

    create: (data, queryParams, responseType, onSucess, onError) => {
      var fetchUrl = queryParams ? url + '?' + querystring.stringify(queryParams) : url
      return (dispatch, getState) => {
        create(data, fetchUrl, responseType).then((value) => {
          console.log("create response: ", value)
          //dispatch({type: types.ACTIONS_CREATE, value})
          if(onSucess)
            onSucess(value)
        }).catch((error) => {
          console.log('m-r-g delete ' + typeName + ' error: ': error)
          if(onError)
            onError(error)
        })
      }
    },

    update: (data, queryParams, responseType, onSucess, onError) => {
      var fetchUrl = queryParams ? url + '/' + data.id + '?' + querystring.stringify(queryParams) : url + '/' + data.id
      return (dispatch, getState) => {
        update(fetchUrl, responseType).then((value) => {
          dispatch({type: types.ACTIONS_UPDATE, value})
          if(onSucess)
            onSucess(value)
        }).catch((error) => {
          console.log('m-r-g delete ' + typeName + ' error: ': error)
          if(onError)
            onError(error)
        })
      }
    },

    delete: (data, queryParams, responseType, onSucess, onError) => {
      var fetchUrl = queryParams ? url + '/' + data.id + '?' + querystring.stringify(queryParams) : url + '/' + data.id
      return (dispatch, getState) => {
        remove(fetchUrl).then((value) => {
          dispatch({type: types.ACTIONS_DELETE, value})
          if(onSucess)
            onSucess(value)
        }).catch((error) => {
          console.log('m-r-g delete ' + typeName + ' error: ': error)
          if(onError)
            onError(error)
        })
      }
    },
  }
}


export let createReducer = (typeName) => {

  const initialState = {
    list: [],
    total: 0,
    item: null,
    isFetching: false,
  };

  const types = createTypes(typeName)

  return {
    reducer: (state = initialState, action = {}) => {
      switch (action.type) {

        case types.ACTIONS_FETCH:
          return {
            ...state,
            list: action.value
          };

        case types.ACTIONS_CREATE:
          return {
            ...state,
            list: action.value
          };

        case types.ACTIONS_UPDATE:
          return {
            ...state,
            list: action.value
          };

        case types.ACTIONS_DELETE:
          return {
            ...state,
            list: action.value
          };

        case types.ACTIONS_SET_FETCHING:
          return {
            ...state,
            isFetching: action.value
          };

        case types.ACTIONS_UPDATE_ITEM:
          return {
            ...state,
            item: action.value
          };

        case types.ACTIONS_UPDATE_TOTAL_ITEMS:
          return {
            ...state,
            total: action.value
          };

        default:
          return state;
      }
    }
  }
}
