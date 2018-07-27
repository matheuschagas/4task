import React from 'react';
import {View, Dimensions, Image, TouchableOpacity, Text, TouchableHighlight, Platform, StatusBar} from 'react-native';
import HttpService from "../utils/http";

export class HeaderBar extends React.Component {

    constructor(props) {
        super(props);
    }

    _renderHeader()
    {
            return(
                <View style={{flexDirection:'row', width: Dimensions.get('window').width, height: (Platform.OS === 'ios' ? 54 : 45), alignSelf:'center', alignItems:'center', justifyContent:'space-between', marginTop: 10}}>
                    <View style={{width: 40, height: 40, justifyContent:'center', paddingTop: (Platform.OS === 'ios' ? 10 : 0), marginLeft: 10}}>
                        <TouchableHighlight underlayColor={'#e08b00'} onPress={()=>this.props.navigation.goBack()}>
                        <Text style={{fontFamily: 'fontawesome', color:'#fff', fontSize: 35}}>{String.fromCharCode(61657)}</Text>
                        </TouchableHighlight>
                    </View>

                    <View style={{width: Dimensions.get('window').width-80, flex: 1, flexDirection:'row', alignItems: 'center', justifyContent: 'center', paddingTop: (Platform.OS === 'ios' ? 10 : 0), marginRight: 11}}>
                        <Image source={require('../../assets/images/ENDERECOBranco.png')} resizeMode={'contain'} style={{height: 20}}/>
                        <Text style={{fontSize: 13,color:'#fff'}}>
                            {this.props.endereco}
                        </Text>
                    </View>

                    <View style={{width: 40, height: 40, justifyContent:'center', paddingTop: (Platform.OS === 'ios' ? 15 : 0), marginRight: (Platform.OS === 'ios' ? 15 : 10)}}>
                        <TouchableHighlight underlayColor={'#e08b00'} onPress={()=>{}}>
                        <Image source={require('../../assets/images/PESQUISA.png')} resizeMode={'contain'} style={{height: 25}}/>
                        </TouchableHighlight>
                    </View>
                </View>
            )
    }

    render(){
        return(
            <View style={{justifyContent:'center', alignSelf:'center', backgroundColor:'#e08b00'}}>
                {this._renderHeader()}
            </View>
        )
    }
}
