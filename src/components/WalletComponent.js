import React from 'react';
import { Card, CardItem, Body, Text, Icon, Button, Left, Right, Thumbnail } from 'native-base';

export default function WalletComponent(props) {
    const wallet = props.wallet;
    return (
        <Card>
            <CardItem>
                <Left>
                    <Thumbnail small source={{uri: 'https://trada.tech/assets/img/logo.svg'}} />
                    <Body>
                        <Text>TEA</Text>
                        <Text note>{wallet.name}</Text>
                    </Body>
                </Left>
                <Right>
                    <Icon name='dots-vertical' type='MaterialCommunityIcons' />
                </Right>
            </CardItem>
            <CardItem>
                <Text note ellipsizeMode="middle" numberOfLines={1} selectable={true}>{wallet.address}</Text>
            </CardItem>
            <CardItem>
                <Body style={{ alignItems:'flex-end' }}>
                    <Text>
                        {wallet.balance || '0.00'}
                    </Text>
                    <Text note style={{ marginRight:0 }}>
                        ≈ $ {wallet.convertPrice || '0.00'}
                    </Text>
                </Body>
            </CardItem>
        </Card>
    )
}