import {fetch, create, update, remove} from './webservices'
import querystring from 'qs'
import _ from 'lodash'

export function createTypes(typeName){
  return {
    ACTIONS_FETCH: 'ACTIONS_FETCH_'+typeName.toUpperCase(),
    ACTIONS_CREATE: 'ACTIONS_CREATE_'+typeName.toUpperCase(),
    ACTIONS_UPDATE: 'ACTIONS_UPDATE_'+typeName.toUpperCase(),
    ACTIONS_DELETE: 'ACTIONS_DELETE_'+typeName.toUpperCase(),
    ACTIONS_SET_FETCHING: 'ACTIONS_SET_FETCHING_'+typeName.toUpperCase(),
    ACTIONS_UPDATE_ITEM: 'ACTIONS_UPDATE_ITEM_'+typeName.toUpperCase(),
    ACTIONS_UPDATE_TOTAL_ITEMS: 'ACTIONS_UPDATE_TOTAL_ITEMS_'+typeName.toUpperCase(),
    ACTIONS_ERROR: 'ACTIONS_ERROR_'+typeName.toUpperCase(),

  }
}

export let createActions = (url, typeName) => {

  const types = createTypes(typeName)

  return {
    setList: (value) => {
      return {type: types.ACTIONS_FETCH, value}
    },

    setItem: (value) => {
      return {type: types.ACTIONS_UPDATE_ITEM, value}
    },

    setTotal: (value) => {
      return {type: types.ACTIONS_UPDATE_TOTAL_ITEMS, value}
    },

    setFetching: (value) => {
      return {type: types.ACTIONS_SET_FETCHING, value}
    },

    fetchItem: (urlParam, queryParams, responseType, onSucess) => {
      var fetchUrl = urlParam ? url + urlParam : url
      fetchUrl = queryParams ? fetchUrl + '?' + querystring.stringify(queryParams) : fetchUrl
      return (dispatch, getState) => {
        fetch(fetchUrl).then((value) => {

            if(responseType)
              dispatch({type: types.ACTIONS_UPDATE_ITEM, value:value[responseType]})
            else
              dispatch({type: types.ACTIONS_UPDATE_ITEM, value})

            if(onSucess) onSucess(value)

        }).catch((error) => {
          //console.error("FetchItem error ", fetchUrl, error);
          dispatch({type: types.ACTIONS_ERROR, error:error})
        });
      }
    },

    fetch: (queryParams, responseType, responseTotal, onSucess) => {
      var fetchUrl = queryParams ? url + '?' + querystring.stringify(queryParams) : url
      return (dispatch, getState) => {
        fetch(fetchUrl).then((value) => {
          if(responseType)
            dispatch({type: types.ACTIONS_FETCH, value:value[responseType] ? value[responseType] : []})
          else
            dispatch({type: types.ACTIONS_FETCH, value:value})

          if(responseTotal) dispatch({type: types.ACTIONS_UPDATE_TOTAL_ITEMS, value:value[responseTotal]})

          if(onSucess) onSucess(value)

        }).catch((error) => {
          //console.error("Fetch error ", fetchUrl, error);
          dispatch({type: types.ACTIONS_ERROR, error:error})
        });
      }
    },

    create: (data, queryParams, responseType, onSucess) => {
      var fetchUrl = queryParams ? url + '?' + querystring.stringify(queryParams) : url
      return (dispatch, getState) => {
        create(data, fetchUrl).then((value) => {
          //dispatch({type: types.ACTIONS_CREATE, value})
          if(onSucess) onSucess(value)

        }).catch((error) => {
          //console.error("Create error ", fetchUrl, error);
          dispatch({type: types.ACTIONS_ERROR, error:error})
        });
      }
    },

    update: (data, queryParams, responseType, onSucess) => {
      var fetchUrl = queryParams ? url + '/' + data.id + '?' + querystring.stringify(queryParams) : url + '/' + data.id
      return (dispatch, getState) => {
        update(data, fetchUrl).then((value) => {
          const state = getState()
          let list = _.clone(state[typeName].list)
          let index = _.indexOf(list, _.find(list, {id: value.id}));
          if(index != -1){
            list.splice(index, 1, value);
            dispatch({type: types.ACTIONS_UPDATE, value:list})
          }

          if(onSucess) onSucess(value)

        }).catch((error) => {
          //console.error("Update error ", fetchUrl, error);
          dispatch({type: types.ACTIONS_ERROR, error:error})
        });
      }
    },

    delete: (data, queryParams, responseType, onSucess) => {
      var fetchUrl = queryParams ? url + '/' + data.id + '?' + querystring.stringify(queryParams) : url + '/' + data.id
      return (dispatch, getState) => {
        remove(fetchUrl).then((value) => {
          //dispatch({type: types.ACTIONS_DELETE, value})
          if(onSucess) onSucess(value)

        }).catch((error) => {
          //console.error("Remove error ", fetchUrl, error);
          dispatch({type: types.ACTIONS_ERROR, error:error})
        });
      }
    },

    deleteRows: (items, queryParams, responseType, onSucess) =>  {
      let deleteRow = (itemId) => {
        let fetchUrl = queryParams ? url + '/' + itemId + '?' + querystring.stringify(queryParams) : url + '/' + itemId
        remove(fetchUrl).then((value) => {
          //dispatch({type: types.ACTIONS_DELETE, value})
          if(onSucess) onSucess(value)

        }).catch((error) => {
          //console.error("MultipleDelete error ", fetchUrl, error);
          dispatch({type: types.ACTIONS_ERROR, error:error})
        });
      }

      let promises = (items && items.length) ? _.map(items, itemId => deleteRow(itemId)) : []

      return (dispatch, getState) => {
        Promise.all(promises).then(function(results){
          //console.log("MultipleDelete results: ", results)
          if(onSucess) onSucess()
        });
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
