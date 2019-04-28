import {observable} from 'mobx';
import { AsyncStorage } from 'react-native';

class AuthStorage {
  @observable webService = "https://hackahealth.liara.run/api/v1/appApi/"
  @observable userToken = ""

  addUserToken = (token) => {
    this.userToken = token;
  }

  saveToken = async () => {
    console.log(this.userToken)
    await AsyncStorage.setItem("token", this.userToken)
  }
}

const AuthStore = new AuthStorage()
export default AuthStore
