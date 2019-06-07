import React from 'react';
import { Root } from 'native-base';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import WalletsScreen from './components/WalletsScreen';
import CreateWalletScreen from './components/CreateWalletScreen';
import ImportWalletScreen from './components/ImportWalletScreen';
import WalletInfoScreen from './components/WalletInfoScreen';
import ReceiveScreen from './components/ReceiveScreen'

const AppStackNavigator = createStackNavigator({
    Wallets: { screen: WalletsScreen },
    CreateWallet: { screen: CreateWalletScreen },
    ImportWallet: { screen: ImportWalletScreen },
    WalletInfo: { screen: WalletInfoScreen },   
    ReceiveScreen: { screen: ReceiveScreen },
},{
    defaultNavigationOptions: {
        headerBackTitle: null,
    }
});

const AppContainer = createAppContainer(AppStackNavigator);

export default () => (
    <Root>
        <AppContainer />
    </Root>
);