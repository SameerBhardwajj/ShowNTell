import {connect} from 'react-redux';
import Router from './Router';

const mapStateToProps = (state: any) => {
  const {tab} = state.Home;
  return {
    tab,
  };
};

export default connect(mapStateToProps)(Router);
