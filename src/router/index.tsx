import { connect } from "react-redux";
import Router from "./Router";

const mapStateToProps = (state: any) => {
  const { tab } = state.Home;
  const { splash } = state.Splash;
  const { loginToken } = state.Login;
  return {
    tab,
    splash,
    loginToken,
  };
};

export default connect(mapStateToProps)(Router);
