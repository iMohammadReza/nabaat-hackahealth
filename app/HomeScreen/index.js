import { createSwitchNavigator, createStackNavigator } from "react-navigation";

import HomeScreen from "./HomeScreen.js";
import About from "../Screens/About.js";
import RSS from '../Screens/RSS.js'
import Bus from '../Screens/Bus.js'
import AuthLoadingScreen from './AuthLoadingScreen'

console.disableYellowBox = true;

const HomeScreenRouter = createStackNavigator({
  Home: {screen: HomeScreen},
  About: {screen: About},
  RSS: {screen: RSS},
  Bus: {screen: Bus}
 },{
   headerMode: 'none'
 });

 const SwitchStack = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: HomeScreenRouter,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

export default SwitchStack;
