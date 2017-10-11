import { combineForms } from 'react-redux-form';

const initialLoginState = {
  username: '',
  password: '',
};

const loginReducer = combineForms(
  {
    login: initialLoginState,
  },
  'login'
);

export { loginReducer };
