import React from 'react';
import { Text, TextInput, View, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native'
import { ExpoLinksView } from '@expo/samples';

export default class ContactScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
        {/* <ExpoLinksView /> */}
        <TouchableOpacity
          onPress={async () => {
            // console.log(this.state.name);
            await AsyncStorage.clear();
          }}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
