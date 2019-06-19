import React from 'react';
import { Snackbar } from 'react-native-paper';

export default ({ deleteFailNotification, onDismiss, label, text }) => (
  <Snackbar
    visible={deleteFailNotification}
    onDismiss={onDismiss}
    action={{
      label,
      onPress: () => {},
    }}
  >
    {text}
  </Snackbar>
);
