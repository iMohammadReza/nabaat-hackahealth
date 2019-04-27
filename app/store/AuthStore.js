import {observable} from 'mobx';
import { AsyncStorage } from 'react-native';

class AuthStorage {
  @observable webService = "http://api.padidar.com/v1/"
  @observable userToken = ""

  addUserToken = (token) => {
    this.userToken = token;
    AsyncStorage.setItem("token", token)
  }
}

const AuthStore = new AuthStorage()
export default AuthStore
