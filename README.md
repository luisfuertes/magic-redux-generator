# redux-generator
Simple component for generate redux actions/reducer

Component in development. I accept suggestions.

## basic usage:
Import
`import reduxGenerator from 'redux-generator'` 

Actions.js basic example:
``` 
import _ from 'lodash'
import reduxGenerator from 'redux-generator'

let baseUri = mainUrl + '/users'
export default reduxGenerator.createActions(baseUri, 'users')
``` 

With custom actions:
``` 
import _ from 'lodash'
import reduxGenerator from 'redux-generator'

let baseUri = mainUrl + '/users'
let actions = reduxGenerator.createActions(baseUri, 'users')
let types = reduxGenerator.createTypes('users')

//For add more actions
let customActions = {
  fetchSomeList: () => {
    return (dispatch, getState) => {

    }
  },
}

export default _.extend(actions, customActions, {types: types});
``` 

Reducer.js example:
``` 
import reduxGenerator from 'redux-generator'

let reducerUser = reduxGenerator.createReducer('users')
export default reducerUser
``` 
