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

    fetchItem: (urlExtension, queryParams, responseType, preDispatch, postDispatch) => {

      var fetchUrl = urlExtension ? url + urlExtension : url
      fetchUrl = queryParams ? fetchUrl + '?' + querystring.stringify(queryParams, {skipNulls: true}) : fetchUrl

      return (dispatch, getState) => {
        fetch(fetchUrl).then((value) => {

            var formatResponse = responseType && value[responseType] ? value[responseType] : value

            if(preDispatch){
              preDispatch(value).then(preDispatchResponse => {

                dispatch({type: types.ACTIONS_UPDATE_ITEM, value:preDispatchResponse})

                postDispatch && postDispatch(preDispatchResponse)
              })
            }else{
              dispatch({type: types.ACTIONS_UPDATE_ITEM, value:formatResponse})

              postDispatch && postDispatch(formatResponse)
            }
        }).catch((error) => {
          console.error("fetchItem error: ", error);
          dispatch({type: types.ACTIONS_ERROR, error})
        });
      }
    },

    fetch: (urlExtension, queryParams, responseType, responseTotal, preDispatch, postDispatch) => {

      var fetchUrl = urlExtension ? url + urlExtension : url
      fetchUrl = queryParams ? url + '?' + querystring.stringify(queryParams, {skipNulls: true}) : url

      return (dispatch, getState) => {
        fetch(fetchUrl).then((value) => {

          var formatResponse = responseType && value[responseType] ? value[responseType] : value

          if(preDispatch){
            preDispatch(formatResponse).then(preDispatchResponse => {

              dispatch({type: types.ACTIONS_UPDATE_ITEM, value:preDispatchResponse})

              postDispatch && postDispatch(preDispatchResponse)
            })
          }else{
            dispatch({type: types.ACTIONS_FETCH, value:formatResponse})

            if(responseTotal) dispatch({type: types.ACTIONS_UPDATE_TOTAL_ITEMS, value:value[responseTotal]})

            postDispatch && postDispatch(value)
          }

        }).catch((error) => {
          console.error("fetch error: ", error);
          dispatch({type: types.ACTIONS_ERROR, error})
        });
      }
    },

    create: (data, urlExtension, queryParams, postDispatch) => {

      var fetchUrl = urlExtension ? url + urlExtension : url
      fetchUrl = queryParams ? url + '?' + querystring.stringify(queryParams, {skipNulls: true}) : url

      return (dispatch, getState) => {
        create(data, fetchUrl).then((value) => {

          postDispatch && postDispatch(value)

        }).catch((error) => {
          console.error("create error: ", error);
          dispatch({type: types.ACTIONS_ERROR, error})
        });
      }
    },

    update: (data, urlExtension, queryParams, postDispatch) => {

      var fetchUrl = urlExtension ? url + urlExtension : url
      fetchUrl = queryParams ? url + '?' + querystring.stringify(queryParams, {skipNulls: true}) : url

      return (dispatch, getState) => {
        update(data, fetchUrl).then((value) => {

          //If item is on reducer list, it will be replaced
          const state = getState()
          let list = _.clone(state[typeName].list)
          let index = _.indexOf(list, _.find(list, {id: value.id}));
          if(index != -1){
            list.splice(index, 1, value);
            dispatch({type: types.ACTIONS_UPDATE, value:list})
          }

          postDispatch && postDispatch(value)

        }).catch((error) => {
          console.error("update error: ", error);
          dispatch({type: types.ACTIONS_ERROR, error})
        });
      }
    },

    delete: (urlExtension, queryParams, postDispatch) => {

      var fetchUrl = urlExtension ? url + urlExtension : url
      fetchUrl = queryParams ? url + '?' + querystring.stringify(queryParams, {skipNulls: true}) : url

      return (dispatch, getState) => {
        remove(fetchUrl).then((value) => {

          postDispatch && postDispatch(value)

        }).catch((error) => {
          console.error("delete error ", error);
          dispatch({type: types.ACTIONS_ERROR, error})
        });
      }
    },

    deleteRows: (itemsArray, queryParams, postDispatchItem, postDispatchAll) =>  {
      let deleteRow = (itemId) => {
        let fetchUrl = queryParams ? url + '/' + itemId + '?' + querystring.stringify(queryParams, {skipNulls: true}) : url + '/' + itemId
        remove(fetchUrl).then((value) => {

          postDispatchItem && postDispatchItem(value)

        }).catch((error) => {
          console.error("MultipleDelete error ", fetchUrl, error);
          dispatch({type: types.ACTIONS_ERROR, error:error})
        });
      }

      let promises = (itemsArray && itemsArray.length) ? _.map(itemsArray, itemId => deleteRow(itemId)) : []

      return (dispatch, getState) => {
        Promise.all(promises).then(function(results){

          postDispatchAll &&  postDispatchAll()

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
