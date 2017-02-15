# magic-redux-generator
Simple component for generate redux actions/reducer

Component in development. I accept suggestions.

## Installation
For install:
`npm install magic-redux-generator --save`

## Basic usage
Import:
`import reduxGenerator from 'magic-redux-generator'`

Set Authorization token (only on init):
`reduxGenerator.webservices.configureToken(yourToken)`

**Actions.js basic example:**
```
import reduxGenerator from 'magic-redux-generator'

let baseUri = mainUrl + '/users'
let actions = reduxGenerator.createActions(baseUri, 'users')
let types = reduxGenerator.createTypes('users')

//Add custom actions
export default {
  ...actions,

  types,

  yourCustomAction: () => {
    return (dispatch, getState) => {
      ...
      let item = extraData
      dispatch(actions.setItem(item))
    }
  },
}
```

**Reducer.js example:**
```
import reduxGenerator from 'magic-redux-generator'

let userReducer = createReducer('partidos')
export default userReducer.reducer
```

**Usage example:**

Dispatch action:
```
import actions from './Actions.js'

dispatch(actions.fetch({offset: 0, limit: 10}, 'users'))
```

And in mapStateToProps:
```
list: state.users.list,
```


**Error reducer example:**
```
import reduxGenerator from 'magic-redux-generator'
const users = reduxGenerator.createTypes('users')//One per action/reducer generate with reduxGenerator

const initialState = {
  type: null,
  error: null,
};

export default function errorReducer(state = initialState, action = {}) {
  switch (action.type) {

    case users.ACTIONS_ERROR:
      return {
        ...state,
        type: users.ACTIONS_ERROR,
        error: action.error,
      };

    case 'REMOVE_ERROR':
      return {
        ...state,
        error: null,
        type: null,
      };

    default:
      return state;
  }
}
```

### Props

## fetchItem

| Prop name    | Type     | Description                            | Example    |
|--------------|----------|----------------------------------------|------------|
| urlExtension | String   | Url sufix                              | "/id"       |
| queryParams  | Object   | Query url params                       | {limit:15} |
| responseType | String   | WS response sufix                      | "users"    |
| preDispatch  | Function | Function to execute before do dispatch | () => {}   |
| postDispatch | Function | Function to execute after do dispatch  | () => {}   |
