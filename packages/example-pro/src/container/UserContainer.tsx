import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Input, Tabs } from 'antd';
import { actionCreator, RootState } from '@store';
import Hello from './Hello';

function mapState(state: RootState) {
  return {
    name: state.user.name,
    loading: state.loading.user.onAsyncChangeName
  };
}

function mapDispatch(dispatch) {
  return {
    onAsyncChangeName(newName: string) {
      dispatch(
        actionCreator.user.onAsyncChangeName({ newName }, { loading: true })
      );
    },
    onChangeName(newName: string) {
      dispatch(actionCreator.user.onChangeName({ newName }));
    }
  };
}

class UserContainer extends Component {
  props: Partial<ReturnType<typeof mapState>> &
    Partial<ReturnType<typeof mapDispatch>>;
  render() {
    return (
      <div>
        <h1>{this.props.name}</h1>
        <Input
          value={this.props.name}
          onChange={e => this.props.onChangeName(e.target.value)}
        />
        <Button
          loading={this.props.loading}
          type='primary'
          onClick={() => this.props.onAsyncChangeName(this.props.name)}
        >
          提交
        </Button>
        <Hello />
      </div>
    );
  }
}

export default connect(
  mapState,
  mapDispatch
)(UserContainer);
