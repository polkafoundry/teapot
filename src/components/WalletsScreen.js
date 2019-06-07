import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Content, Card, CardItem, Body, Text, Icon, Button } from 'native-base';
import { NavigationEvents } from 'react-navigation';

// import { IceteaWeb3 } from '@iceteachain/web3';
import tweb3 from '../service';

import WalletComponent from './WalletComponent';

export default class WalletsScreen extends Component {
    static navigationOptions = {
        title: "Icetea Wallet",
    }

    constructor(props) {
        super(props);
        this.state = {
            wallets: []
        }
    }

    // Called when the component is foreground again.
    _onWillFocus = payload => {
        // Storage brings up a list of wallets.
        AsyncStorage.getItem('WALLETS').then(wallets => {
            this.setState({
                wallets: JSON.parse(wallets) || [],
            })
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationEvents onWillFocus={this._onWillFocus} />
                <Container style={styles.container}>
                    <Content padder>
                        {
                            this.state.wallets.map((wallet) => {
                                return (
                                    <WalletComponent key={wallet.address} wallet={wallet} onPress={() => {this.props.navigation.navigate('WalletInfo', wallet)}} />
                                )
                            })
                        }
                        <Card>
                            <CardItem>
                                <Body>
                                    <Button transparent iconLeft large block onPress={() => this.props.navigation.navigate('ImportWallet')}>
                                        <Icon name='import' type='MaterialCommunityIcons'></Icon>
                                        <Text>Import Wallet</Text>
                                    </Button>
                                </Body>
                            </CardItem>
                        </Card>
                        <Card>
                            <CardItem>
                                <Body>
                                    <Button transparent iconLeft large block onPress={() => this.props.navigation.navigate('CreateWallet')}>
                                        <Icon name='ios-add-circle-outline' />
                                        <Text>Create Wallet</Text>
                                    </Button>
                                </Body>
                            </CardItem>
                        </Card>
                    </Content>
                </Container>
            </View>
        );
    }

    componentWillMount() {
        // const tweb3 = new IceteaWeb3('wss://rpc.icetea.io/websocket');
        const pollingInterval = 2000;

        this.poller = setInterval(() => {
            const wallets = [...this.state.wallets];

            wallets.forEach(wallet => {
                tweb3.getBalance(wallet.address).then((balance) => {
                    // console.log(balance.balance)
                    wallet.balance = balance.balance / 10 ** 6;
                    // console.log(wallet.balance);
                });
            });

            this.setState({ wallets }, () => {
                AsyncStorage.setItem('WALLETS', JSON.stringify(wallets));
            })
        }, pollingInterval);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
});