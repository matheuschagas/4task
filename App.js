import React from 'react';
import {createStackNavigator} from 'react-navigation';
import {MainRoutes} from './app/config/navigation';
import { Asset } from 'expo';
import {StatusBar, View, Platform} from "react-native";

const TaskApp = createStackNavigator({
    ...MainRoutes
}, {
    headerMode: 'float',
    cardStyle: {
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
    }
});

const defaultGetStateForAction = TaskApp.router.getStateForAction;
TaskApp.router.getStateForAction = (action, state) => {
    if(state && action.type === 'ReplaceCurrentScreen'){
        let routes = state.routes.slice(0, state.routes.length - 1);
        routes.push(action);
        return {
            ...state,
            routes,
            index: state.routes.length - 1,
        };

    }
    return defaultGetStateForAction(action, state);
};

function cacheImages(images) {
    return images.map(image => {
        if (typeof image === 'string') {
            return Image.prefetch(image);
        } else {
            return Asset.fromModule(image).downloadAsync();
        }
    });
}

export default class App extends React.Component{
    state = {fontLoaded: false};
    constructor(props) {
        super(props);
    }
    async componentDidMount() {
        Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
        const imageAssets = cacheImages([
            require('./assets/images/COMENTARIOS.png'),
            require('./assets/images/ENDERECO.png'),
            require('./assets/images/SERVICOS.png'),
            require('./assets/images/FAVORITOS.png'),
            require('./assets/images/LIGAR.png'),
        ]);
        Expo.Font.loadAsync({
            'fontawesome': require('./assets/fonts/fontawesome.ttf')
        });
        await Promise.all([...imageAssets]);
        this.setState({ fontLoaded: true });
    }


    render(){
        return(

            <View style={{flex: 1}}>
              <StatusBar
                  barStyle="light-content"
              />
                {this.state.fontLoaded?<TaskApp/>:null}
            </View>
        );
    }
}
