import React from 'react';
import {Dimensions, FlatList, Text, View, StyleSheet, TouchableHighlight} from 'react-native';
import Spinner from "react-native-loading-spinner-overlay";
import HttpService from "../../utils/http";


export class Inicial extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'Tarefas',
        headerTintColor: '#FFF',
        headerStyle: {
            backgroundColor: '#e08b00'
        },
    });

    constructor(props) {
        super(props);
        this.state={
            loading: true,
            error: false,
            tarefas: []
        };
    }

    async getTarefas(){
        let tarefas = await HttpService.get('tarefa');
        if(tarefas){
            this.setState({loading:false, tarefas:tarefas.lista});
        }else{
            this.setState({loading:false});
        }
    }

    componentWillMount(){
        this.getTarefas();
    }

    _keyExtractor(item, index){
        return item;
    }

    _openTask(item){
        this.props.navigation.navigate('Principal', {tarefa: item});
    }

    _renderItem = ({item})=>{
        return(
            <TouchableHighlight underlayColor={'#bbbbbb'} onPress={()=>{this._openTask(item)}}>
                <View>
                    <Text style={styles.text}>{item}</Text>
                    <View style={styles.line}/>
                </View>
            </TouchableHighlight>
        );
    };

    render(){
        return(
            <View style={styles.screen}>
                {this.state.tarefas.length===0&&!this.state.error?<Text style={styles.text}>Não existem tarefas disponíveis</Text>:null}
                {this.state.error?<Text style={styles.text}>Verifique sua conexão</Text>:null}
            <FlatList style={{height: Dimensions.get('window').height}}
                data={this.state.tarefas}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
            />
                <Spinner visible={this.state.loading} textStyle={{color: '#FFF'}} />
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
    line:{
        backgroundColor: '#bcbcbc',
        height: 1,
    },
});