import { combineForms } from 'react-redux-form';

const initialLoginState = {
  username: '',
  password: '',
};

const loginReducer = rootName => ({
  [rootName]: combineForms(
    {
      [rootName]: initialLoginState,
    },
    rootName
  ),
});

export { loginReducer };
