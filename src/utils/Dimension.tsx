import { Dimensions, PixelRatio } from "react-native";

const DesignHeight = 736;
const DesignWidth = 414;
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const scale = screenWidth / 375;
const heightScale = screenHeight / 812;

const vw = (width: number) => {
  // const elemWidth = parseFloat(width);
  // return PixelRatio.roundToNearestPixel(screenWidth * elemWidth / 100);
//   return PixelRatio.roundToNearestPixel(width * scale);
  const percent = (width / DesignWidth) * 100
  return ((percent / 100) * screenWidth);
};

const vh = (height: number) => {
  // const elemHeight = parseFloat(heightPercent);
  // return PixelRatio.roundToNearestPixel(screenHeight * elemHeight / 100);
//   return PixelRatio.roundToNearestPixel(height * heightScale);
  const percent = (height / DesignHeight) * 100
  return ((percent / 100) * screenHeight);
};

export { DesignHeight, DesignWidth, vh, vw };
