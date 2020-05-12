import { connect } from "react-redux";
import Router from "./Router";

const mapStateToProps = (state: any) => {
  const { tab } = state.Home;
  const { splash } = state.Splash;
  const { login } = state.Login;
  return {
    tab,
    splash,
    login,
  };
};

export default connect(mapStateToProps)(Router);
