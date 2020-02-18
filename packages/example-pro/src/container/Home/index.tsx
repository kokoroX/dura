import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState, actionCreator, connectHOC } from '@store';
import Item from './components/Item';
import { Button } from 'antd';

const mapState = function(state: RootState) {
  return {
    helloName: state.hello.name,
    articleIdList: state.hello.articleList.map(n => n.id),

    loading: state.loading.hello.onAsyncQueryUserList
  };
};

const mapDispatch = function(dispatch) {
  return {
    onChangeName() {
      dispatch(actionCreator.hello.onChangeName({ nextName: '李四' }));
    },
    onChangeItem() {
      dispatch(actionCreator.hello.onChangeItem({ id: 1, title: '测试标题' }));
    }
  };
};

type Props = Partial<ReturnType<typeof mapState>> &
  Partial<ReturnType<typeof mapDispatch>>;

class Home extends Component<Props> {
  async hello() {
    console.log('1');
    await new Promise(resolve => {
      console.log('2');
      resolve('3');
    }).then(r => {
      console.log(r);
    });

    await new Promise(resolve => {
      console.log('4');
      resolve('5');
    }).then(r => {
      console.log(r);
    });
  }

  render() {
    console.log('render home index');

    this.hello();
    this.hello();

    return (
      <div>
        <h1>hello{this.props.helloName}</h1>
        <Button onClick={this.props.onChangeName}>变换姓名</Button>
        <Button type='primary' onClick={this.props.onChangeItem}>
          更改列表item
        </Button>
        {this.props.articleIdList.map(id => (
          <Item key={id} id={id} />
        ))}
      </div>
    );
  }
}

const HomeContainer = connectHOC(mapState, mapDispatch)(Home);

export default HomeContainer;
