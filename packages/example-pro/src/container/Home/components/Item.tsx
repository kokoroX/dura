import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState, actionCreator } from '@store';
import { get } from 'lodash';
import { message } from 'antd';

const mapState = (state: RootState, ownProps) => {
  return {
    item: state.hello.articleList.find(n => n.id === +ownProps.id)
  };
};

type Props = Partial<ReturnType<typeof mapState>> & {
  id: number;
};

class Item extends Component<Props> {
  render() {
    console.log('item render', this.props.item);

    return (
      <div>
        <h1>{get(this.props, 'item.title', '')}</h1>
        <span>{get(this.props, 'item.context', '')}</span>
      </div>
    );
  }
}

const ItemContainer = connect(
  mapState,
  null
)(Item);

export default ItemContainer;
