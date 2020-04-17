import { connect } from "react-redux";
import Router from "./Router";

const mapStateToProps = (state: any) => {
  const { tab } = state.Home;
  const { splash } = state.Splash;
  return {
    tab,
    splash,
  };
};

export default connect(mapStateToProps)(Router);
