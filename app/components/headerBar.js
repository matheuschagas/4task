import React from 'react';
import {View, Dimensions, Image, TouchableOpacity, Text} from 'react-native';
import HttpService from "../utils/http";

export class HeaderBar extends React.Component {

    constructor(props) {
        super(props);
    }

    _renderHeader()
    {
            return(
                <View style={{flexDirection:'row', width: Dimensions.get('window').width, height: 54, alignSelf:'center', alignItems:'center', justifyContent:'space-between', marginTop: 10}}>
                    <View style={{width: 40, height: 40, justifyContent:'center', paddingTop: 15, paddingLeft: 5}}>
                        <Text style={{fontFamily: 'fontawesome', color:'#fff', fontSize: 25}}>{String.fromCharCode(61523)}</Text>
                    </View>

                    <View style={{width: Dimensions.get('window').width-80, flex: 1, flexDirection:'row'}}>
                        <Image source={require('../../assets/images/ENDERECO.png')} style={{height: 40}}/>
                        <Text style={{fontSize: 13,color:'#fff'}}>
                            {this.props.endereco}
                        </Text>
                    </View>

                    <View style={{width: 40, height: 40, justifyContent:'center', paddingTop: 10, paddingRight: 5}}>
                        <Image source={require('../../assets/images/PESQUISA.png')} resizeMode={'contain'} style={{height: 30}}/>
                    </View>
                </View>
            )
    }

    async componentWillMount()
    {
    }


    render(){
        return(
            <View style={{justifyContent:'center', alignSelf:'center', backgroundColor:'#e08b00'}}>
                {this._renderHeader()}
            </View>
        )
    }
}
