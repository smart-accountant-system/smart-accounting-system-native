import React from 'react';
import { Snackbar } from 'react-native-paper';

export default ({
  deleteSuccessNotification,
  onDismiss,
  label,
  text,
  backgroundColor,
}) => (
  <Snackbar
    visible={deleteSuccessNotification}
    onDismiss={onDismiss}
    action={{
      label,
      onPress: () => {
        // Do something
      },
    }}
    style={{
      backgroundColor,
    }}
  >
    {text}
  </Snackbar>
);
