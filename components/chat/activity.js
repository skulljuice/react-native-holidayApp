import React, { Component } from 'react'
import { Modal, Text, TextInput, TouchableHighlight, StyleSheet, View, Alert } from 'react-native';
import backend from '../../backend/backend';

export default class Activity extends Component {
    state = {
        modalVisible: false,
        activityName: ''
    };
    componentDidMount() {
        this.setModalVisible(this.props.visible);
    }
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }
    saveActivity = () => {
        let param = {
            name: this.state.activityName,
            upvote: 0,
            downvote: 0,
            added_at: new Date().getTime()
        }
        backend.saveActivity(param).then(res => {
            console.log('save acivity', res);
            this.setModalVisible(false);
        })
    }

    render() {
        return (
            <View style={{ marginTop: 22 }}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{ marginTop: 22 }}>
                        <View style={styles.container}>
                            <Text>Activity</Text>
                            <TextInput
                                style={styles.nameInput}
                                placeHolder='Actvity Name'
                                onChangeText={(text) => {
                                    this.setState({
                                        name: text,
                                    })
                                }}
                                value={this.state.name}
                            />
                            <View style={styles.row}>
                                <TouchableHighlight
                                    style={{ width: '20' }}
                                    onPress={() => {

                                        this.setModalVisible(!this.state.modalVisible);
                                    }}>
                                    <Text>Close</Text>
                                </TouchableHighlight>
                                <View style={{ width: '100' }} />
                                <TouchableHighlight
                                    style={{ width: '20' }}
                                    onPress={() => {
                                        this.saveActivity();
                                    }}>
                                    <Text>Add Activity</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>

                {/* <TouchableHighlight
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                    <Text>Show Modal</Text>
                </TouchableHighlight> */}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        backgroundColor: '#0000',
    },
    row: {
        flexDirection: 'row'
    },
    loginContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    title: {
        marginTop: 20,
        marginLeft: 20,
        fontSize: 20,
    },
    nameInput: {
        height: 40,

        borderWidth: 2,
        borderColor: 'black',
        margin: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    buttonText: {
        marginLeft: 20,
        fontSize: 20,
    },

});

