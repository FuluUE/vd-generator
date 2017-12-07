import { connect } from 'dva';
import App from '../components/App';

const mapStateToProps = (state) => {
  console.log('routes/App state', state);
  const { app, loading } = state;
  return {
    app,
    loading,
  };
}

export default connect(mapStateToProps)(App)
