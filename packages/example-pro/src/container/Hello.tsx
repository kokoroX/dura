import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

/**
 * {
      answer: {
        orderNo: {
          projectName: ''
        }
      }
    }
 */

interface State {}

interface Props {
  answer?: {
    orderNo?: {
      projectName?: string;
    };
  };
}

class Hello extends React.Component<State, Props> {
  constructor(props) {
    super(props);
    this.state = {
      answer: {}
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  render() {
    const name1 = get(this.state, 'answer.orderNo.projectName', '默认');

    return (
      <div>
        <h1>人员列表</h1>
        <h1>{name1}</h1>
      </div>
    );
  }
}

export default connect()(Hello);
