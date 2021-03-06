import {observable} from 'mobx'
import { ToastAndroid } from 'react-native'
import AuthStore from './AuthStore'

class DataStorage {

  @observable user = {point: 50}
  @observable tips = []
  @observable actions = []
  @observable list = []
  @observable usedCommits = []
  @observable drphone = "09136310951"

  useCommit = (cmt) => {
    this.usedCommits.push(cmt)
    this.list = this.list.filter(itm =>!this.usedCommits.includes(itm))
    console.log(this.list.length, this.usedCommits.length, this.list.filter((itm)=>!this.usedCommits.includes(itm)))
  }

  updateGame(value, point) {
    console.log(value, point)
    let req = AuthStore.webService+"game"
    fetch(req, {
      method: 'PUT',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: AuthStore.userToken,
        value: value+"",
        point: point.toString()
      })
    })
    .then((response) => response.json().then(data => ({status: response.status, ...data})))
    .then((responseJson) => {
      console.log(responseJson)
      if (responseJson.success) {
        this.user.score = this.user.score - point
        console.log(responseJson)
      } else {
        ToastAndroid.show("خطا ", ToastAndroid.SHORT)
      }
    })
    .catch((error) => {
      console.log("getInit error", error)
      ToastAndroid.show("خطا در برقراری ارتباط", ToastAndroid.SHORT)
      reject()
    });
  }

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
          console.log(this.user)
          this.tips = responseJson.tips
          this.drphone = responseJson.drphone
          this.actions = responseJson.actions
          this.list = [...this.actions,...this.tips]
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
