import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Provider, connect } from 'react-redux';
import { store, actionCreator } from './store';
import LoginContainer from './container/LoginContainer';
import { createDrawerNavigator, createNavigationContainer } from 'react-navigation';
import { Drawer } from '@ant-design/react-native';
const AppContainer = createNavigationContainer(createDrawerNavigator({
    Home: {
        screen: LoginContainer
    },
    Setting: () => {
        return (<View>
            <Text>hello</Text>
          </View>);
    }
}, {
    drawerBackgroundColor: 'rgba(255,255,255,.9)',
    contentOptions: {
        activeTintColor: '#fff',
        activeBackgroundColor: '#6b52ae'
    }
}));
const C = connect(function (state) {
    return {
        isShowDraw: state.user.isShowDraw
    };
}, function (dispatch) {
    return {
        onChangeIsShowDraw() {
            dispatch(actionCreator.user.onChangeIsShowDraw({ isShowDraw: false }));
        }
    };
})(function (props) {
    const sidebar = (<View>
      <Text>hello</Text>
    </View>);
    return (<Drawer drawerWidth={200} sidebar={sidebar} position='left' open={props.isShowDraw} onOpenChange={status => {
        if (!status) {
            props.onChangeIsShowDraw({ isShowDraw: false });
        }
    }} drawerBackgroundColor='#ccc'>
      <AppContainer />
    </Drawer>);
});
class App extends Component {
    render() {
        console.log(`环境：${process.env.NODE_ENV}`);
        return (<Provider store={store}>
        <C />
      </Provider>);
    }
}
// console.log("App", App);
export default App;
