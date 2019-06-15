export const handle401 = ({ logout, navigation }) => {
  logout({
    success: () => {
      navigation.navigate('Login');
    },
  });
};
