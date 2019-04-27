import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import Survey from "./screens/Survey"
import Game from "./screens/Game"
import Home from "./screens/Home";
import LoginScreen from "./screens/LoginScreen"
import AuthLoadingScreen from "./screens/AuthLoadingScreen"

const AppStack = createStackNavigator(
  {
      Home: {screen: Home},
      Game: {screen: Game},
      Survey: {screen: Survey},
  },
  {
      headerMode: 'none'
  }
);

const AuthStack = createStackNavigator(
  {
      Login: LoginScreen
  },
  {
      headerMode: 'none'
  }
);

const SwitchStack = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

export default SwitchStack;
