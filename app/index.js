import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import Survey from "./screens/Survey"
import Game from "./screens/Game"
import Home from "./screens/Home";
import Login from "./screens/Login"
import AuthLoadingScreen from "./screens/AuthLoadingScreen"

const AppStack = createStackNavigator(
  {
    Survey: {screen: Survey},
      Home: {screen: Home},
      Game: {screen: Game},

  },
  {
      headerMode: 'none'
  }
);

const AuthStack = createStackNavigator(
  {
      Login: {screen: Login}
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
