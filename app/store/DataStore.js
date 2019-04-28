import {observable} from 'mobx'
import { ToastAndroid } from 'react-native'
import AuthStore from './AuthStore'

class DataStorage {

  @observable user
  @observable tips = []
  @observable actions = []
 

  // checkCopon(copon){
  //   return new Promise((resolve, reject) => {
  //     let req = AuthStore.webService+"check_copon";
  //     fetch(req, {
  //       method: 'POST',
  //       headers:{
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //         'Token': AuthStore.userToken
  //       },
  //       body: JSON.stringify({
  //         "copon": copon,
  //       })
  //     })
  //     .then((response) => response.json().then(data => ({status: response.status, ...data})))
  //     .then((responseJson) => {
  //       if (responseJson.status == 401) {
  //         reject()
  //       } else {
  //         this.copon = responseJson;
  //         resolve(responseJson)
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("check_copon error", error)
  //       reject()(error)
  //     });
  //   })
  // }

  // checkout(id, months, traffic, is_reset){
  //   return new Promise((resolve, reject) => {
  //     let req = AuthStore.webService+"checkout";
  //     console.log({
  //       "id": id,
  //       "months": months,
  //       "user_id": this.user.id,
  //       "traffic": traffic,
  //       "is_reset": is_reset,
  //       "back_url": "http://mypadidar"
  //     })
  //     fetch(req, {
  //       method: 'POST',
  //       headers:{
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //         'Token': AuthStore.userToken
  //       },
  //       body: JSON.stringify({
  //         "id": id,
  //         "months": months,
  //         "user_id": this.user.id,
  //         "traffic": traffic,
  //         "is_reset": is_reset,
  //         "back_url": "http://mypadidar"
  //       })
  //     })
  //     .then((response) => response.json().then(data => ({status: response.status, ...data})))
  //     .then((responseJson) => {
  //       if (responseJson.status > 399) {
  //         reject()
  //       } else {
  //         this.checkoutBank(responseJson.token, false)
  //         console.log(responseJson)
  //         resolve(responseJson)
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error, JSON.stringify({
  //         "id": id,
  //         "months": months,
  //         "user_id": this.user.id,
  //         "traffic": traffic,
  //         "is_reset": is_reset,
  //         "back_url": "http://mypadidar"
  //       }))
  //       reject()(error)
  //     });
  //   })
  // }

  // checkoutBank(token, discount){
  //   let req;
  //   if(!discount)
  //     req = AuthStore.webService+"bank/";
  //   else
  //     req = this.copon.url+"bank/";

  //   req += token;

  //   Communications.web(req);
  //   console.log(req)
  // }

  // checkoutDiscount(id, months, traffic, renew, code){
  //   let type;
  //   if(renew)
  //     type = "renew";
  //   else
  //     type = "charge";

  //   return new Promise((resolve, reject) => {
  //     let req = this.copon.url;
  //     fetch(req, {
  //       method: 'POST',
  //       headers:{
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //         'Token': AuthStore.userToken
  //       },
  //       body: JSON.stringify({
  //         "id": id,
  //         "months": months,
  //         "traffic": traffic,
  //         "type": type,
  //         "back_url": "http://mypadidar",
  //         "copon": code
  //       })
  //     })
  //     .then((response) => response.json().then(data => ({status: response.status, ...data})))
  //     .then((responseJson) => {
  //       if (responseJson.status > 399) {
  //         reject()
  //       } else {
  //         this.checkoutBank(responseJson.token, true)
  //         resolve(responseJson)
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("checkout error", false)
  //       reject()(error)
  //     });
  //   })
  // }

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

  // getServices(){
  //   return new Promise((resolve, reject) => {
  //     let req = AuthStore.webService+"services";
  //     fetch(req, {
  //       method: 'GET',
  //       headers:{
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //         'Token': AuthStore.userToken
  //       }
  //     })
  //     .then((response) => response.json().then(data => ({status: response.status, ...data})))
  //     .then((responseJson) => {
  //       if (responseJson.status == 401) {
  //         reject()
  //       } else {
  //         this.servicesInfo = responseJson;
  //         resolve(responseJson)
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("getServices error", error)
  //       reject()(error)
  //     });
  //   })
  // }
}

const DataStore = new DataStorage()
export default DataStore
