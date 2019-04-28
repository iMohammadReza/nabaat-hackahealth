import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import Survey from "./screens/Survey"
import Game from "./screens/Game"
import Home from "./screens/Home";
import Login from "./screens/Login"
import AuthLoadingScreen from "./screens/AuthLoadingScreen"

const AppStack = createStackNavigator(
  {
      Game: {screen: Game},
      Home: {screen: Home},
      Survey: {screen: Survey},
  },
  {
      headerMode: 'none'
  }
);

const AuthStack = createStackNavigator(
  {
      Login: Login
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
    initialRouteName: 'App',
  }
);

export default SwitchStack;
