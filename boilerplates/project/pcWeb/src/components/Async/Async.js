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

  componentDidMount() {
    this.props.async()
  }

  render() {
    const { props } = this;

    return (
      <div>
        Async
        { console.log('(3) props',props) }
      </div>
    );
  }
}

export default Async;
