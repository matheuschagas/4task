import React from 'react';
import {Text, View, StyleSheet, TouchableHighlight} from 'react-native';


export class Servicos extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'Serviços',
        headerTintColor: '#FFF',
        headerStyle: {
            backgroundColor: '#e08b00'
        },
        headerLeft:<View style={{marginLeft: 10}}><TouchableHighlight underlayColor={'#e08b00'} onPress={()=>navigation.goBack()}>
            <Text style={{fontFamily: 'fontawesome', color:'#fff', fontSize: 35}}>{String.fromCharCode(61657)}</Text>
        </TouchableHighlight></View>
    });

    constructor(props) {
        super(props);
        this.state={
        };
    }

    render(){
        return(
            <View style={styles.screen}>
                <Text>Serviços</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    screen:{
        paddingLeft: 10,
        paddingRight: 10,
    },
    text: {
        color: '#e08b00',
        paddingTop: 25,
        paddingBottom: 25,
        fontSize: 40,
    },
});