import { createStackNavigator, createAppContainer } from 'react-navigation';
import WalletsScreen from './components/WalletsScreen';
import CreateWalletScreen from './components/CreateWalletScreen';
import ImportWalletScreen from './components/ImportWalletScreen';

const AppStackNavigator = createStackNavigator({
    Wallets: { screen: WalletsScreen },
    CreateWallet: { screen: CreateWalletScreen },
    ImportWallet: { screen: ImportWalletScreen },
},{
    defaultNavigationOptions: {
        headerBackTitle: null,
    }
});

export default createAppContainer(AppStackNavigator);