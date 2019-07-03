import { createStackNavigator } from 'react-navigation';
import i18n from 'i18n-js';

import Login from '../screens/Login';
import ForgetPassword from '../screens/ForgetPassword';
import Register from '../screens/Register';
import PasswordChange from '../screens/PasswordChange';

const LoginStack = createStackNavigator(
  {
    Login,
    ForgetPassword,
    Register,
    PasswordChange: {
      screen: PasswordChange,
    },
  },
  {
    headerMode: 'none',
  }
);

export default LoginStack;
