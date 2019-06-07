import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Content, Segment, Text, Icon, Button, Header, Left, Body, Title, Right, Form, Textarea, Input, Item } from 'native-base';
import RNSecureKeyStore, {ACCESSIBLE} from 'react-native-secure-key-store';

import { ecc } from 'icetea-common';

export default class ImportWalletScreen extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);

        this.state = {
            privateKey: null
        }
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

    _recoverWallet = async () => {
        // console.log(this.state.privateKey)
        const PubKeyandAddr = ecc.toPubKeyAndAddressBuffer(this.state.privateKey);
        const address = PubKeyandAddr.address;
        // console.log(address)

        // Generate wallet information to save
        const wallet = {
            name: 'IceTea',
            coinType: 'TEA',
            symbol: 'TEA',
            address
        }
        // console.log(wallet);
        // Save
        await this._storeData(wallet, this.state.privateKey);

        // Back to wallet lists screen
        this.props.navigation.goBack();
    }

    render() {
        return (
            <Container>
                <Header hasSegment androidStatusBarColor='black'>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Import Wallet</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder>
                    <View>
                        <Text note>Enter the private key address of your wallet.</Text>
                        <Item regular>
                            <Input onChangeText={(privateKey) => this.setState({privateKey})} value={this.state.privateKey} />
                        </Item>
                    </View>
                    <View>
                        <Button block primary onPress={() => this._recoverWallet()}>
                            <Text>Import</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
} 

const styles = StyleSheet.create({
    container: {
        
    }
})