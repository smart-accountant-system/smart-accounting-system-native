/* eslint-disable no-plusplus */
export const handle401 = ({ logout, navigation }) => {
  logout({
    success: () => {
      navigation.navigate('Login');
    },
  });
};

const numeric = '1234567890';
export const toInt = value => {
  let result = '';
  for (let i = 0; i < value.length; i++)
    if (numeric.indexOf(value[i]) >= 0) {
      result += value[i];
    }

  return parseInt(result);
};
