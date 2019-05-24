import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content, Segment, Text, Icon, Button, Header, Left, Body, Title, Right, Form, Textarea, Input, Item } from 'native-base';

import bip39 from 'react-native-bip39';
import HDKey from 'hdkey';
import { ecc, codec } from 'icetea-common';

export default class CreateWalletScreen extends Component {
    static navigationOptions = {
        title: 'Create Wallet'
    }
    
    constructor(props) {
        super(props);

        this.state = {
            mnemonic: null
        }
    }

    componentWillMount = () => {
        bip39.generateMnemonic().then(mnemonic => {
            this.setState({ mnemonic })
        });
    }

    _createWallet = async () => {
        const seed = bip39.mnemonicToSeed(this.state.mnemonic);
        console.log(seed);
        const hdkey = HDKey.fromMasterSeed(seed);
        console.log(hdkey);
        const privateKey = codec.toKeyString(hdkey.privateKey);
        console.log(privateKey);
        const address = ecc.toPubKeyAndAddress(privateKey).address;
        console.log(address);
    }

    render() {
        return (
            <Container style={styles.container}>
                <View style={{ flex: 1, padding: 10 }}>
                    <View style={{ flex: 1 }}>
                        <Text note>Please copy and backup the 12 mnemonics below. This is very important data to recover your wallet.</Text>
                        <Form>
                            <Textarea rowSpan={5} bordered disabled value={ this.state.mnemonic }/>
                        </Form>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Button block primary onPress={() => this._createWallet()}>
                            <Text>Create</Text>
                        </Button>
                    </View>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});