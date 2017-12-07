import { connect } from 'dva';
import Async from '../components/Async';


const mapStateToProps = (state) => {
  return {
    ...state,
  };
}

export default connect(mapStateToProps)(Async);
