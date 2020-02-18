import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Provider, connect } from 'react-redux';
import { store, RootState, actionCreator } from './store';
import LoginContainer from './container/LoginContainer';
import UserContainer from './container/UserContainer';
import {
  createStackNavigator,
  createDrawerNavigator,
  createNavigationContainer
} from 'react-navigation';
import {
  TextareaItem,
  Modal,
  List,
  Tabs,
  Flex,
  Button,
  Drawer,
  WhiteSpace
} from '@ant-design/react-native';
import ActionButton from 'react-native-action-button';
declare const process: {
  env: {
    NODE_ENV: string;
  };
};


const AppContainer = createNavigationContainer(
  createDrawerNavigator(
    {
      Home: {
        screen: LoginContainer
      },
      Setting: () => {
        return (
          <View>
            <Text>hello</Text>
          </View>
        );
      }
    },
    {
      drawerBackgroundColor: 'rgba(255,255,255,.9)',
      contentOptions: {
        activeTintColor: '#fff',
        activeBackgroundColor: '#6b52ae'
      }
    }
  )
);

const C = connect(
  function(state: RootState) {
    return {
      isShowDraw: state.user.isShowDraw
    };
  },
  function(dispatch) {
    return {
      onChangeIsShowDraw() {
        dispatch(actionCreator.user.onChangeIsShowDraw({ isShowDraw: false }));
      }
    };
  }
)(function(props: any) {
  const sidebar = (
    <View>
      <Text>hello</Text>
    </View>
  );
  return (
    <Drawer
      drawerWidth={200}
      sidebar={sidebar}
      position='left'
      open={props.isShowDraw}
      onOpenChange={status => {
        if (!status) {
          props.onChangeIsShowDraw({ isShowDraw: false });
        }
      }}
      drawerBackgroundColor='#ccc'
    >
      <AppContainer />
    </Drawer>
  );
});

class App extends Component {
  drawer: any;
  render() {
    console.log(`环境：${process.env.NODE_ENV}`);
    return (
      <Provider store={store}>
        <C />
      </Provider>
    );
  }
}

// console.log("App", App);

export default App;
