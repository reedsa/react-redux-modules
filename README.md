# React Redux Modules

React component modules that easily integrate with your Redux store.

These modules assume you have an understanding of how to use React and Redux.

## Installation

Make sure your project has [React]() and [Redux]() installed, otherwise install those dependencies as well.

```
yarn add react-redux-modules
```

Or install all required dependencies with:
```
yarn add react react-dom redux react-redux react-redux-modules
```

## Getting Started

You should have a Redux store set up in your React application. We will walk through the steps required to implement a component that uses the LoginForm component from react-redux-modules.

```javascript
import React, { Component } from 'react';
import LoginForm from 'react-redux-modules/lib/components/LoginForm';

import { authenticate } from '../store/user/action';

class LoginPage extends Component {
  render() {
    return (
      <h2>Login</h2>
      <LoginForm
        model="loginForm"
        apiUrl={process.env.REACT_APP_API_URL}
        loginSuccessAction={authenticate}
      />
    );
  }
}

export default LoginPage;
```

Make sure to set the `apiUrl` prop with the url for your API login endpoint where the form will issue a POST request.

Use a meaningful name for the `model` prop as it will be necessary to use in the creation of the reducer.

Now an action is needed that implements the `authenticate` logic, which will be dispatched after the Log In button is clicked and the API responds successfully. You can also set up a reducer that listens to the action type to save the data that comes back in the response in your Redux store.

```javascript
export const authenticate = user => ({ type: ActionTypes.AUTHENTICATE, user });
```

Now set up a user reducer to update the data in your Redux store. In this example, it is assumed that the API responds with data about the user that just logged in.

```javascript
const initialUserState = {
  id: null,
  isAuthenticated: false,
  name: null,
};

export default (state = initialUserState, action) => {
  switch (action.type) {
    case 'AUTHENTICATE':
      const { id, name } = action.user;
      return { ...state, isAuthenticated: true, id, name };
    default:
      return state;
  }
};
```

And finally, configure your Redux store with the user reducer and the react-redux-modules reducer used by the LoginForm. Notice the call to `loginReducer` uses the name of the model we used in the component.

```javascript
import { combineReducers, createStore } from 'redux'
import { loginReducer } from 'react-redux-modules/lib/reducers/loginReducer';
import user from './user/reducer';

export default function configureStore(history) {
  const root = combineReducers({
    user,
    ...loginReducer('loginForm'),
  });

  const store = createStore(root);

  return store;
}

```
