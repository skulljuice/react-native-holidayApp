import React, { Component } from 'react'
import { Modal, Text, TouchableHighlight, View, Alert } from 'react-native';
import backend from '../../backend/backend';

export default class Activity extends Component {
    state = {
        modalVisible: false,
        activityName: ''
    };
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
        let param = {
            name: this.state.activityName,
            upvote: 0,
            downvote: 0
        }
        backend.saveActivity(param).then(res => {
            console.log('kkkkk', res);

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
                        <View>
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
                            <TouchableHighlight
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}>
                                <Text>Hide Modal</Text>
                            </TouchableHighlight>
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
