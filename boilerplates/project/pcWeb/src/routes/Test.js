import { connect } from 'dva';
import { withRouter } from 'dva/router';
import Test from '../components/Test';


const mapStateToProps = (state) => {
  const { app, loading } = state;

  return {
    app,
    loading,
  };
}

export default connect(mapStateToProps)(Test);
