import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  AsyncStorage
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import backend from '../backend/backend';
import Activity from '../components/chat/activity';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [], message: '', showActivity: false }
  }
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    backend.loadMessages()
      .then(snapshot => {
        let data = [];
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          data.push(doc.data());
        });
        return data;
      })
      .then(data => {
        this.setState({ messages: data });
      })
      .catch(er => {
        console.log('error', er);
      })
  }
  handleMessageChange = (message) => {
    this.setState({ message: message });
  }


  handleSendButtonPress = async () => {
    const { user } = await JSON.parse(AsyncStorage.getItem('user'));
    let msg = this.state.message;
    let param = { message: msg, user: user }
    backend.sendMessage(param).then(r => {
      console.log('done');
    })
  }
  handleAcivityButtonPress = () => {
    // this.props.sendMessage(this.props.message)
    this.setState({ showActivity: !showActivity });
  }

  render() {
    const { messages } = this.state;
    // console.log(messages);
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Text >Chats</Text>
          </View>
          <View >
            {
              messages && messages.map(message => (
                <Text>{`${message.name} : ${message.message}`}</Text>
              ))
            }
          </View>
          <View style={styles.containerBox}>

            <TextInput
              style={styles.textInput}
              placeholder={'Enter Message'}
              returnKeyType='send'
              onChangeText={this.handleMessageChange}
              value={this.state.message}
              underlineColorAndroid={'transparent'}
            // editable={!sending}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={this.handleSendButtonPress}
            // disabled={isButtonDisabled}
            >
              <Text>Send</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={this.handleActivityButtonPress}
            // disabled={isButtonDisabled}
            >
              <Text>Add Activity</Text>
            </TouchableOpacity>
            {this.state.showActivity && <Activity />}
          </View>
        </ScrollView>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  containerBox: {
    display: 'flex',
    flexDirection: 'row',
    minWidth: '100%',
    backgroundColor: '#eeeeee',
    borderTopColor: '#cccccc',
    borderTopWidth: 1
  },
  textInput: {
    flex: 1,
    backgroundColor: '#ffffff',
    height: 40,
    margin: 10,
    borderRadius: 5,
    padding: 3
  },
  button: {
    flexShrink: 0,
    width: 40,
    height: 40,
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
