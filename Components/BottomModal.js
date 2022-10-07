import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Animated, Dimensions } from 'react-native';

const BottomModal = ({
  modalOpen,
  children,
  modalClosed,
  setModalOpen,
  setModalClosed
}) => {
  let deviceHeight = Dimensions.get('window').height;

  const [modalHeight, setModalHeight] = useState(
    new Animated.Value(deviceHeight)
  );

  useEffect(() => {
    if (modalOpen === true) {
      Animated.timing(modalHeight, {
        duration: 300,
        toValue: 0,
        useNativeDriver: true
      }).start();
    }
    setModalOpen(false);
  }, [modalOpen]);

  useEffect(() => {
    if (modalClosed === true) {
      Animated.timing(modalHeight, {
        duration: 300,
        toValue: deviceHeight,
        useNativeDriver: true
      }).start();
    }
    setModalClosed(false);
  }, [modalClosed]);

  const openModal = () => {
    Animated.timing(modalHeight, {
      duration: 300,
      toValue: 0
    }).start();
  };

  const closeModal = () => {
    Animated.timing(modalHeight, {
      duration: 300,
      toValue: 500
    });
  };

  return (
    <Animated.View
      style={[styles.main, { transform: [{ translateY: modalHeight }] }]}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: 500,
    backgroundColor: '#5620E5',
    position: 'absolute',
    bottom: 0,
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20
  }
});

export default BottomModal;
