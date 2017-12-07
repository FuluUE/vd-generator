import React from 'react';
import PropTypes from 'prop-types';

class Async extends React.Component {

  static propTypes = {

  }

  static defaultProps = {

  }

  constructor(props) {
    super(props);

  }

  componentWillMount() {
    const { props: { dispatch } } = this;
    dispatch({ type: 'async/tests' });
  }

  render() {
    return (
      <div>
        Async
        { console.log(this.props) }
      </div>
    );
  }
}

export default Async;
