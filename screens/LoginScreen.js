import React, { Component } from 'react'
import { Text, TextInput, View, TouchableOpacity, StyleSheet } from 'react-native'
import backend from '../backend/backend';

// import 'firebase/firestore';
// import db from './../firebase';

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }

    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.loginContainer}>
                    <Text> Login </Text>
                    <View style={styles.row}>

                        <Text style={styles.title}>Enter your name:</Text>
                        <TextInput
                            style={styles.nameInput}
                            placeHolder='Name'
                            onChangeText={(text) => {
                                this.setState({
                                    name: text,
                                })
                            }}
                            value={this.state.name}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            // console.log(this.state.name);
                            let user = { loggedIn: true, name: this.state.name }
                            this.props.refresh(user);
                            let m = { user: this.state.name, message: `I'm in.` }
                            backend.sendMessage(m).then(res => {
                                console.log('ddd', res);
                            });
                        }}
                    >
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                </View>
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
