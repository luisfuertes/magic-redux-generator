# magic-redux-generator
Simple component for generate redux actions/reducer

Component in development. I accept suggestions.



## Installation
For install:
`npm install magic-redux-generator --save`



## Instance methods

### fetchItem

| Prop name    | Type     | Description                            | Example    |
|--------------|----------|----------------------------------------|------------|
| urlExtension | String   | Url sufix                              | "/id"       |
| queryParams  | Object   | Query url params                       | {limit:15} |
| responseType | String   | WS response sufix                      | "users"    |
| preDispatch  | Function | Function to execute before do dispatch | () => {}   |
| postDispatch | Function | Function to execute after do dispatch  | () => {}   |



### fetch

| Prop name     | Type     | Description                            | Example    |
|---------------|----------|----------------------------------------|------------|
| urlExtension  | String   | Url sufix                              | "/5"       |
| queryParams   | Object   | Query url params                       | {limit:15} |
| responseType  | String   | WS response sufix                      | "users"    |
| responseTotal | String   | WS response total sufix                | "total"    |
| preDispatch   | Function | Function to execute before do dispatch | () => {}   |
| postDispatch  | Function | Function to execute after do dispatch  | () => {}   |



### create

| Prop name    | Type     | Description                           | Example                           |
|--------------|----------|---------------------------------------|-----------------------------------|
| data         | Object   | Object with create data               | {username:example, password:1234} |
| urlExtension | String   | Url sufix                             | "/users"                          |
| queryParams  | Object   | Query url params                      | {limit:15}                        |
| postDispatch | Function | Function to execute after do dispatch | () => {}                          |



### update

| Prop name    | Type     | Description                           | Example                                 |
|--------------|----------|---------------------------------------|-----------------------------------------|
| data         | Object   | Object with update data               | {id:3, username:example, password:1234} |
| urlExtension | String   | Url sufix                             | "/3"                                    |
| queryParams  | Object   | Query url params                      | {limit:15}                              |
| postDispatch | Function | Function to execute after do dispatch | () => {}                                |



### delete

| Prop name    | Type     | Description                           | Example    |
|--------------|----------|---------------------------------------|------------|
| urlExtension | String   | Url sufix                             | "/3"       |
| queryParams  | Object   | Query url params                      | {limit:15} |
| postDispatch | Function | Function to execute after do dispatch | () => {}   |



### deleteRows

| Prop name        | Type     | Description                                | Example    |
|------------------|----------|--------------------------------------------|------------|
| urlExtension     | String   | Url sufix                                  | "/3"       |
| queryParams      | Object   | Query url params                           | {limit:15} |
| postDispatchItem | Function | Function to execute after delete each item | () => {}   |
| postDispatchAll  | Function | Function to execute after delete all items | () => {}   |



## More instance methods

| Instance method | Description                    | Example                             |
|-----------------|--------------------------------|-------------------------------------|
| setList         | Set the reducer list value     | dispatch(actions. setList([]))      |
| setItem         | Set the reducer item value     | dispatch(actions.setItem({}))       |
| setTotal        | Set the reducer total value    | dispatch(actions.setTotal(32))      |
| setFetching     | Set the reducer fetching value | dispatch(actions.setFetching(true)) |



## Project Example

You can check this component with [this project example for react-native.](https://github.com/luisfuertes/testMagicReduxGenerator)
```
git clone https://github.com/luisfuertes/testMagicReduxGenerator
cd projectDir && npm install
react-native run-ios
```



## Basic usage
**Import:**
`import reduxGenerator from 'magic-redux-generator'`

**Important: Set Authorization token (only on init):**
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

let userReducer = createReducer('users')
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
