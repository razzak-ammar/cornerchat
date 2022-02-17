import React from 'react';
import { Text as NativeText, StyleSheet } from 'react-native';

const Text = (props) => {
  return (
    <NativeText {...props} style={{ ...props.style, ...styles.main }}>
      {props.children}
    </NativeText>
  );
};

const styles = StyleSheet.create({
  main: {
    color: '#ffffff'
  }
});

export default Text;
