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
    this.state = {
      messages: [],
      message: '',
      showActivity: false,
      messageLoading: false,
      activities: [],
      activityLoading: false
    }
  }
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.getMsgs();
    this.getActivities();
  }
  handleMessageChange = (message) => {
    this.setState({ message: message });
  }

  getMsgs = () => {
    this.setState({ messageLoading: true })
    backend.loadMessages()
      .then(snapshot => {
        let data = [];
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          data.push({ ...doc.data(), id: doc.id });
        });
        return data.sort((a, b) => (a.added_at > b.added_at) ? 1 : ((b.added_at > a.added_at) ? -1 : 0));
      })
      .then(data => {
        this.setState({ messages: data, messageLoading: false });
      })
      .catch(er => {
        console.log('error', er);
      })
  }
  handleSendButtonPress = async () => {
    const message = this.state;
    if (message != '') {

      alert('Message sent!');
      let user = await AsyncStorage.getItem('user');
      if (user != null) {
        let currentUser = JSON.parse(user);
        let msg = this.state.message;
        let param = { message: msg, user: currentUser.name, added_at: new Date().getTime() }
        backend.sendMessage(param).then(r => {
          console.log('done');
        })
        this.setState({ message: '' });
      }
      this.getMsgs();
    }
  }
  getActivities = () => {
    this.setState({ messageLoading: true })
    backend.loadActivites()
      .then(snapshot => {
        let data = [];
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          data.push({ ...doc.data(), id: doc.id });
        });
        return data.sort((a, b) => (a.added_at > b.added_at) ? 1 : ((b.added_at > a.added_at) ? -1 : 0));
      })
      .then(data => {
        this.setState({ activities: data, activityLoading: false });
      })
      .catch(er => {
        console.log('error', er);
      })
  }
  handleActivityButtonPress = () => {
    // this.props.sendMessage(this.props.message)
    const { showActivity } = this.state;
    this.setState({ showActivity: !showActivity });
  }
  handleActivityVoteUpButtonPress = (current) => {
    let param = {
      id: current.id,
      data: { upvote: current.upvote++, downvote: current.downvote }
    }
    backend.updateActivity(param).then(res => {
      this.getActivities();
    })
  }
  handleActivityVoteDownButtonPress = (current) => {
    let param = {
      id: current.id,
      data: { upvote: current.upvote, downvote: current.downvote++ }
    }
    backend.updateActivity(param).then(res => {
      this.getActivities();
    })
  }

  render() {
    const { messages, messageLoading, activities, activityLoading } = this.state;
    // console.log(messages);
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Text >Chats</Text>
          </View>
          <View >
            {
              messageLoading ? <Text>Loading..</Text> : messages && !messageLoading && messages.map((message, index) => (
                <Text key={index}>{`${message.user} : ${message.message}`}</Text>
              ))
            }
          </View>
          <View>

            {
              activityLoading ? <Text>Loading..</Text> : activities && !activityLoading && activities.map((item, index) => (
                <View style={styles.containerAct} key={index}>
                  <Text>{item.name}</Text>
                  <View style={styles.row}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleActivityVoteUpButtonPress(item)}
                    >
                      <Text>Up Vote({item.upvote})</Text>
                    </TouchableOpacity>
                    {/* <View style={{ width: 100 }} /> */}
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleActivityVoteDownButtonPress(item)}
                    >
                      <Text>Down Vote({item.downvote})</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
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
            {this.state.showActivity && <Activity visible={true} close={() => this.setState({ showActivity: false })} />}
          </View>
        </ScrollView>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  containerAct: {
    flex: 1,
    color: 'red',
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row'
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
