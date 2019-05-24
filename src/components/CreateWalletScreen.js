import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content, Segment, Text, Icon, Button, Header, Left, Body, Title, Right, Form, Textarea, Input, Item } from 'native-base';

export default class CreateWalletScreen extends Component {
    static navigationOptions = {
        title: 'Create Wallet'
    }

    render() {
        return (
            <Container style={styles.container}>
                <View style={{ flex: 1, padding: 10 }}>
                    <View style={{ flex: 1 }}>
                        <Text note>Please copy and backup the 12 mnemonics below. This is very important data to recover your wallet.</Text>
                        <Form>
                            <Textarea rowSpan={5} bordered disabled />
                        </Form>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Button block primary>
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