import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  AsyncStorage,
  StatusBar,
  Easing,
  Animated
} from 'react-native';
import { RootState, actionCreator } from '../store';
import {
  createBottomTabNavigator,
  NavigationInjectedProps
} from 'react-navigation';
import AudioRecord from 'react-native-audio-record';
import { Buffer } from 'buffer';
import LottieView from 'lottie-react-native';
import Permissions from 'react-native-permissions';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';

import {
  TextareaItem,
  Modal,
  ActionSheet,
  Provider,
  Tabs,
  Flex,
  Button,
  Drawer,
  WhiteSpace
} from '@ant-design/react-native';
import { thisExpression } from '@babel/types';

function mapState(state: RootState) {
  return {
    name: state.user.name,
    loading: state.loading.user.onAsyncChangeName,
    context: state.user.context,
    isShow: state.user.isShow,
    isShowDraw: state.user.isShowDraw
  };
}

function mapDispatch(dispatch) {
  return {
    onAsyncChangeName() {
      dispatch(
        actionCreator.user.onAsyncChangeName(
          { newName: 'async异步张三3' },
          { loading: true }
        )
      );
    },
    onChangeName() {
      dispatch(actionCreator.user.onChangeName({ newName: '同步张三' }));
    },
    pushUserPage(navigation) {
      dispatch(actionCreator.router.pushUserPage({ navigation }));
    },
    onChangeContext(newContext) {
      dispatch(actionCreator.user.onChangeContext({ newContext }));
    },
    onHide() {
      dispatch(actionCreator.user.onChangeIsShow({ nextIsShow: false }));
    },
    onChangeIsShowDraw() {
      dispatch(actionCreator.user.onChangeIsShowDraw({ isShowDraw: true }));
    }
  };
}

const options = {
  sampleRate: 16000, // default 44100
  channels: 1, // 1 or 2, default 1
  bitsPerSample: 16, // 8 or 16, default 16
  audioSource: 6, // android only (see below)
  wavFile: 'test.wav' // default 'audio.wav'
};

// create a path you want to write to
// :warning: on iOS, you cannot write into `RNFS.MainBundlePath`,
// but `RNFS.DocumentDirectoryPath` exists on both platforms and is writable

class LoginContainer extends Component {
  props: Partial<ReturnType<typeof mapState>> &
    Partial<ReturnType<typeof mapDispatch>> &
    NavigationInjectedProps;

  state: any;

  drawer: any;

  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0)
    };
  }

  animation: any;

  componentDidMount() {
    // Animated.timing(this.state.progress, {
    //   toValue: 1,
    //   duration: 500,
    //   easing: Easing.linear
    // }).start();
  }
  render() {
    const tabs = [
      { title: '推荐' },
      { title: '我的关注' },
      { title: '中小学' },
      { title: '法律咨询' },
      { title: '心理咨询' },
      { title: '医疗咨询' },
      { title: '英语学习' },
      { title: '爱问爱答' }
    ];

    const style = StyleSheet.create({
      txt: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
        backgroundColor: '#fff'
      },
      line: { color: '#EE9611' },
      actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white'
      },
      txt2: {
        width: 300,
        // borderWidth: 1,
        borderColor: '#999',
        lineHeight: 25
      }
    });
    return (
      <View style={{ flex: 1 }}>
        <Provider>
          <StatusBar
            hidden={this.props.isShowDraw}
            showHideTransition='slide'
            animated={true}
          />
          <Tabs
            tabs={tabs}
            animated={true}
            prerenderingSiblingsNumber={2}
            destroyInactiveTab={false}
          >
            <View style={style.txt}>
              <View>
                <View style={{ backgroundColor: '#fff', zIndex: 999 }}>
                  <Text
                    style={[style.txt2, { backgroundColor: '#fff' }]}
                    numberOfLines={2}
                    ellipsizeMode='clip'
                    onLayout={e => {
                      if (e.nativeEvent.layout.height > 25 * 3) {
                        console.log('大于3行');
                      }
                      console.log(e.nativeEvent.layout.height);
                    }}
                  >
                    在嵌套的Text组件中，子Text组件将继承父Text组件的样式，并且只能添加父Text组件没有指定的样式，不能覆盖父Text组件的样式。如果试图在代码中覆盖父Text组件继承来的样式，覆盖将不会生效。Ps：嵌套Text组件的显示字符串中，需要另起一行需要在字符串前添加
                    {'\r\n'}，否则将接着上一行继续显示 ————————————————
                  </Text>
                </View>
                <View
                  style={{ justifyContent: 'flex-start', flexDirection: 'row' }}
                >
                  <Text
                    style={[
                      style.txt2,
                      {
                        marginTop: -50,
                        marginLeft: -20,
                        width: 300
                      }
                    ]}
                    numberOfLines={3}
                    onLayout={e => {
                      if (e.nativeEvent.layout.height > 25 * 3) {
                        console.log('大于3行');
                      }
                      console.log(e.nativeEvent.layout.height);
                    }}
                  >
                    在嵌套的Text组件中，子Text组件将继承父Text组件的样式，并且只能添加父Text组件没有指定的样式，不能覆盖父Text组件的样式。如果试图在代码中覆盖父Text组件继承来的样式，覆盖将不会生效。Ps：嵌套Text组件的显示字符串中，需要另起一行需要在字符串前添加
                    {'\r\n'}，否则将接着上一行继续显示 ————————————————
                  </Text>
                  <Text style={{ lineHeight: 25, color: 'blue' }}>全文</Text>
                </View>
              </View>

              <LottieView
                // progress={this.state.progress}
                ref={animation => {
                  this.animation = animation;
                }}
                loop={true}
                autoPlay={true}
                source={require('../json/data.json')}
              ></LottieView>
              <Text>hello</Text>
              <View style={{ marginTop: 200, padding: 8 }}>
                <Button
                  type='primary'
                  onPress={() => {
                    // this.animation.play();
                    // this.props.onChangeIsShowDraw();
                    this.props.navigation.openDrawer();
                  }}
                >
                  打开侧滑面板
                </Button>
                <WhiteSpace />
              </View>
            </View>
            <View style={style.txt}>
              <Text>我的关注</Text>
              <ActionButton buttonColor='rgba(231,76,60,1)'>
                <ActionButton.Item
                  buttonColor='#9b59b6'
                  title='New Task'
                  onPress={() => console.log('notes tapped!')}
                >
                  <Icon name='md-create' style={style.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item
                  buttonColor='#3498db'
                  title='Notifications'
                  onPress={() => {}}
                >
                  <Icon
                    name='md-notifications-off'
                    style={style.actionButtonIcon}
                  />
                </ActionButton.Item>
                <ActionButton.Item
                  buttonColor='#1abc9c'
                  title='All Tasks'
                  onPress={() => {}}
                >
                  <Icon name='md-done-all' style={style.actionButtonIcon} />
                </ActionButton.Item>
              </ActionButton>
            </View>
            <View style={style.txt}>
              <Text>中小学</Text>
            </View>
            <View style={style.txt}>
              <Button
                type='primary'
                onPress={() => {
                  const BUTTONS = [
                    'Operation1',
                    'Operation2',
                    'Operation3',
                    'Delete',
                    'Cancel'
                  ];
                  ActionSheet.showActionSheetWithOptions(
                    {
                      title: 'Title',
                      message: 'Description',
                      options: BUTTONS,
                      cancelButtonIndex: 4,
                      destructiveButtonIndex: 3
                    },
                    buttonIndex => {
                      this.setState({ clicked: BUTTONS[buttonIndex] });
                    }
                  );
                }}
              >
                打开底部弹层
              </Button>
            </View>
            <View style={style.txt}>
              <Text>心理咨询</Text>
            </View>
            <View style={style.txt}>
              <Text>医疗咨询</Text>
            </View>
            <View style={style.txt}>
              <Text>英语学习</Text>
            </View>
            <View style={style.txt}>
              <Text>爱问爱答</Text>
            </View>
          </Tabs>
        </Provider>
      </View>
    );
  }
}

export default createBottomTabNavigator({
  Home: connect(
    mapState,
    mapDispatch
  )(LoginContainer),
  Own: function() {
    const style = StyleSheet.create({
      txt: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
        backgroundColor: '#fff'
      }
    });
    return (
      <View style={style.txt}>
        <LottieView
          ref={animation => {
            this.animation = animation;
          }}
          autoPlay={true}
          source={require('../json/data.json')}
        ></LottieView>
        <Text>Content of First Tab</Text>
      </View>
    );
  }
});
