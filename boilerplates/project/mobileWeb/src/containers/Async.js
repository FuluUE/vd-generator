import { connect } from 'react-redux';
import Async from '../components/Async';
import { async } from '../redux/async';


const mapStateToProps = (state) => {
  console.log('(2) state',state);
  return {
    asyncResult: state.async.asyncResult
  }
};

export default connect(
  mapStateToProps,
  { async }
)(Async);
