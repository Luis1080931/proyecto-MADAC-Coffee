import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';


const ModalComponent = ({ visible, onRequestClose, children }) => {
 return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
          <TouchableOpacity onPress={onRequestClose} style={{ alignSelf: 'flex-end' }}>
            <Text>X</Text>
          </TouchableOpacity>
          {children}
        </View>
      </View>
    </Modal>
 );
};

export default ModalComponent;