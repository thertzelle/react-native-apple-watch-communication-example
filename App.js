import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, TextInput, Button, Alert} from 'react-native';
import {sendMessage, watchEvents} from 'react-native-watch-connectivity';

const App = () => {
  const [message, setMessage] = useState('');
  watchEvents.addListener('message', (message) => {
    console.log('Received message ' + JSON.stringify(message));
  });
  const sendMessageToAppleWatch = () => {
    sendMessage({message}, (error) => {
      if (error) {
        Alert.alert(`the message "${message}" can't be sent`);
      }
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="message"
      />
      <Button onPress={sendMessageToAppleWatch} title="SEND" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;