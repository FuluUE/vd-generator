import { connect } from 'dva';
import App from '../components/App';

const mapStateToProps = (state) => {
  return {
    ...state,
  };
}

export default connect(mapStateToProps)(App)
