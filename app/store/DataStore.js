import {observable} from 'mobx'
import { ToastAndroid } from 'react-native'
import AuthStore from './AuthStore'

class DataStorage {

  @observable user
  @observable tips = []
  @observable actions = []
  @observable game = {}

  getInit(){
    return new Promise((resolve, reject) => {
      let req = AuthStore.webService+"home"
      fetch(req, {
        method: 'POST',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "token": AuthStore.userToken,
        })
      })
      .then((response) => response.json().then(data => ({status: response.status, ...data})))
      .then((responseJson) => {
        if (responseJson.success) {
          resolve(responseJson)
          this.user = responseJson.user
          this.tips = responseJson.tips
          this.actions = responseJson.actions
        } else {
          reject()
        }
      })
      .catch((error) => {
        console.log("getInit error", error)
        ToastAndroid.show("خطا در برقراری ارتباط", ToastAndroid.SHORT)
        reject()
      });
    })
  }
}

const DataStore = new DataStorage()
export default DataStore
