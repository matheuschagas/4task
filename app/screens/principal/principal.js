import React from 'react';
import {Dimensions, Alert, Text, View, StyleSheet, TouchableHighlight, ScrollView, Image} from 'react-native';
import Spinner from "react-native-loading-spinner-overlay";
import HttpService from "../../utils/http";
import {MapView} from "expo";
import {HeaderBar} from "../../components/headerBar";


export class Principal extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        header: null
    });

    constructor(props) {
        super(props);
        this.state={
            commentsIndex: 0,
            commentsSize: 0,
            loading: true,
            error: false,
            id: this.props.navigation.state.params.tarefa,
            tarefa: null,
            region: {
                latitude: -30.035966,
                longitude: -51.186636,
                latitudeDelta: 0.04864195044303443,
                longitudeDelta: 0.040142817690068,
            },
            markers: []
        }
    }

    render(){
        return(
            <View>
                <HeaderBar endereco={this.state.tarefa !== null ?this.state.tarefa.endereco:''} navigation={this.props.navigation}/>
                <ScrollView style={styles.screen} contentStyle={{backgroundColor: '#f2f2f2'}} bounces={false} ref={view => this._scrollView = view}>
                    {this.state.error?<Text style={styles.text}>Verifique sua conexão</Text>:null}
                    {this.state.tarefa !== null && this._renderItem(this.state.tarefa)}
                    <View  onLayout={(event) => {
                        let {x, y, width, height} = event.nativeEvent.layout;
                        this.setState({commentsSize: height});
                    }}>
                        {this.state.tarefa !== null && this.state.tarefa.comentarios.map((comentario, index)=>{
                            return this._renderComentario(comentario, index)
                        })}
                    </View>
                    <Spinner visible={this.state.loading} textStyle={{color: '#FFF'}} />
                </ScrollView>
            </View>
        )
    }

    componentWillMount(){
        this.getTarefa();
    }

    async getTarefa(){
        let tarefa = await HttpService.get('tarefa/'+this.state.id);
        if(tarefa){
            let markers = [{
                coordinate: {
                    latitude: tarefa.latitude,
                        longitude: tarefa.longitude,
                },
                id:0
            }];
            let region = {
                latitude: tarefa.latitude,
                    longitude: tarefa.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
            };
            this.setState({loading:false, tarefa, markers, region});
        }else{
            this.setState({loading:false});
        }
    }

    _performAction(btn){
        switch (btn){
            case 'Ligar':
                Expo.Linking.openURL('tel:' + this.state.tarefa.telefone);
                break;
            case 'Serviços':
                this.props.navigation.navigate('Servicos');
                break;
            case 'Endereço':
                Alert.alert(this.state.tarefa.endereco);
                break;
            case 'Comentários':
                this.scrollToComments();
                break;
            case 'Favoritos':
                break;
        }
    }

    _renderBotao = (text, image) => {
        let imageWidth = Dimensions.get('window').width*0.2-20;
        let imageHeight = imageWidth;
        return  (
            <TouchableHighlight underlayColor={'#bbbbbb'} style={styles.btn} onPress={()=>this._performAction(text)}>
                <View style={{alignItems:'center'}}>
                    <Image source={image} style={{height: imageHeight, width: imageWidth}}/>
                    <Text style={{color:'#e08b00', fontSize: 8, fontWeight:text==='Ligar'?'bold':'normal'}}>{text}</Text>
                </View>
            </TouchableHighlight>
        );
    };

    scrollToComments() {
        if(this.state.commentsIndex===0){
            this._scrollView.scrollToEnd();
        }else{
            if(this.state.commentsSize<(Dimensions.get('window').height-54)){
                this._scrollView.scrollToEnd();
            }else{
                this._scrollView.scrollTo({y:this.state.commentsIndex});
            }
        }
    }

    _renderItem = (item) =>{
        if(!this.state.loading) {
            return (
                <View onLayout={(event) => {
                    let {x, y, width, height} = event.nativeEvent.layout;
                    this.setState({commentsIndex: height});
                }}>
                    <Image source={{uri: item.urlFoto}} style={styles.banner}/>
                    <View style={styles.logoContainer}><Image source={{uri: item.urlLogo}} style={styles.logo}/></View>
                    <Text style={styles.titulo}>{item.titulo.toUpperCase()}</Text>
                    <View style={styles.info}>
                        <View style={styles.actions}>
                            {this._renderBotao('Ligar', require('../../../assets/images/LIGAR.png'))}
                            {this._renderBotao('Serviços', require('../../../assets/images/SERVICOS.png'))}
                            {this._renderBotao('Endereço', require('../../../assets/images/ENDERECO.png'))}
                            {this._renderBotao('Comentários', require('../../../assets/images/COMENTARIOS.png'))}
                            {this._renderBotao('Favoritos', require('../../../assets/images/FAVORITOS.png'))}
                        </View>
                        <View style={styles.line}/>
                        <View style={styles.textoContainer}>
                            <Text style={styles.texto}>{item.texto}</Text>
                        </View>
                        <View>
                            <MapView
                                ref={map => this.map = map}
                                initialRegion={this.state.region}
                                style={{width: Dimensions.get('window').width, height: 120}}
                                loadingEnabled
                                scrollEnabled={false}
                                zoomControlEnabled={false}
                                zoomEnabled={false}

                            >
                                {this.state.markers.map((marker, i) => {
                                    let isFocus = i=== this.state.focus;
                                    return (
                                        <MapView.Marker key={marker.id+1}
                                                        coordinate={marker.coordinate}
                                                        pinColor={isFocus ? '#df3f9f' : '#000'}
                                        >
                                        </MapView.Marker>
                                    );
                                })}
                            </MapView>
                        </View>
                        <View style={styles.enderecoContainer}>
                            <Text style={styles.endereco}>
                                {item.endereco}
                            </Text>
                            <View style={styles.pinIconContainer}><Image source={require('../../../assets/images/ENDERECO.png')} style={styles.pinIcon}/></View>
                        </View>
                    </View>
                </View>
            )
        }else{
            return null;
        }
    };

    _renderRate(rate){
        let stars = '';
        for(let i = 0; i<5;i++){
            if(i<rate){
                stars +=String.fromCharCode(61445);
            }else{
                stars +=String.fromCharCode(61446);
            }
        }
        return(<Text style={{fontFamily: 'fontawesome', color:'#e08b00'}}>{stars}</Text>);
    }

    _renderComentario(comentario, index){
        const ProfileImageSize =  Dimensions.get('window').width * 0.2;
        return(<View key={index} style={{backgroundColor: 'white', flex: 1, flexDirection:'row', alignItems: 'flex-start', justifyContent: 'center', padding: 10}}>
            <Image source={{uri: comentario.urlFoto}} style={{
                width: ProfileImageSize,
                height: ProfileImageSize,
            borderRadius: ProfileImageSize/2}}/>
            <View style={{paddingLeft: 10, paddingRight: 10, width: Dimensions.get('window').width - ProfileImageSize - 20}}>
                <View style={{flex: 1, flexDirection:'row'}}>
                    <View>
                        <Text style={{color: '#e08b00', fontSize: 13}}>{comentario.nome}</Text>
                        <Text style={{color: '#e08b00', fontSize: 15}}>{comentario.titulo}</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                        {this._renderRate(comentario.nota)}
                    </View>
                </View>
                <Text style={{paddingTop: 10, color: '#e08b00', textAlign: 'justify'}}>{comentario.comentario}</Text>
            </View>
        </View>)
    }
}

const styles = StyleSheet.create({
    screen:{
        paddingLeft: 0,
        paddingRight: 0,
        height: Dimensions.get('window').height - 54,
    },
    banner:{
        height:Dimensions.get('window').height * 0.35,
        width: Dimensions.get('window').width,
    },
    logoContainer:{
        backgroundColor: 'white',
        height:Dimensions.get('window').width * 0.25,
        width: Dimensions.get('window').width * 0.25,
        borderRadius: Dimensions.get('window').width * 0.25,
        position: 'absolute',
        top:Dimensions.get('window').height * 0.35 - Dimensions.get('window').width * 0.25/2 - 10,
        right: 20,
    },
    logo:{
        height:Dimensions.get('window').width * 0.25,
        width: Dimensions.get('window').width * 0.25,
    },
    titulo: {
        color: '#e08b00',
        paddingTop: 15,
        paddingBottom: 15,
        fontSize: 25,
        paddingLeft: 10,
    },
    texto: {
        color: '#e08b00',
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 13,
        paddingLeft: 10,
        paddingRight: 10,
        textAlign: 'justify',
    },
    enderecoContainer:{
        width:Dimensions.get('window').width,
        backgroundColor: '#e08b00',
        paddingTop: 2,
        paddingBottom: 2,
    },
    endereco:{
      color: 'white',
        alignSelf:'flex-end',
        marginRight: Dimensions.get('window').width * 0.1 + 10 + 10,
        fontSize: 12,
    },
    info:{
        backgroundColor: 'white',
        width:Dimensions.get('window').width
    },
    actions:{
        width:Dimensions.get('window').width,
        flex: 1,
        flexDirection: 'row'
    },
    line:{
        backgroundColor: '#bcbcbc',
        height: 1,
        marginRight: 10,
        marginLeft: 10,
    },
    btn:{
        width: Dimensions.get('window').width * 0.2,
        height: Dimensions.get('window').width * 0.2,
        paddingLeft: 10,
        paddingRight: 10,
    },
    pinIcon:{
        width: Dimensions.get('window').width * 0.1,
        height: Dimensions.get('window').width * 0.1,
    },
    pinIconContainer:{
        backgroundColor: 'white',
        width: Dimensions.get('window').width * 0.1,
        height: Dimensions.get('window').width * 0.1,
        borderRadius: Dimensions.get('window').width * 0.1,
        position: 'absolute',
        right: 10,
        bottom: 5,
    },
});