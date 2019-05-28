import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Content, Segment, Text, Icon, Button, Header, Left, Body, Title, Right, Form, Textarea, Input, Item } from 'native-base';
import RNSecureKeyStore, {ACCESSIBLE} from 'react-native-secure-key-store';

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

    _storeData = async (wallet, privateKey) => {
        try {
            // Get your old Wallet listing information
            const wallets = JSON.parse(await AsyncStorage.getItem('WALLETS')) || [];
            // Add to existing Wallet list
            wallets.push(wallet);
            // Saving wallet listing information
            await AsyncStorage.setItem('WALLETS', JSON.stringify(wallets));
            // Storing private keys in a secure zone
            await RNSecureKeyStore.set(wallet.address, privateKey, {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY});
        } catch (error) {
            // ERROR saving data
            console.log(error);
        }
    }

    _createWallet = async () => {
        const seed = bip39.mnemonicToSeed(this.state.mnemonic);
        // console.log(seed);
        const hdkey = HDKey.fromMasterSeed(seed);
        // console.log(hdkey);
        const privateKey = codec.toKeyString(hdkey.privateKey);
        // console.log(privateKey);
        const address = ecc.toPubKeyAndAddress(privateKey).address;
        // console.log(address);

        // Generate wallet information to save
        const wallet = {
            name: 'IceTea',
            coinType: 'TEA',
            symbol: 'TEA',
            address
        }

        // Save
        await this._storeData(wallet, privateKey);

        // Back to wallet lists screen
        this.props.navigation.goBack();
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