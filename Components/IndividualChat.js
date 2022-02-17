import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const IndividualChat = () => {
  return (
    <TouchableOpacity>
      <Text style={styles.text}>Hello</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'white'
  }
});

export default IndividualChat;
