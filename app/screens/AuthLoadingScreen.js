import React from 'react';
import { AsyncStorage, View, ToastAndroid, StatusBar } from 'react-native';
import {Spinner, Text} from 'native-base';
import {inject, observer} from "mobx-react/native";
import LottieView from 'lottie-react-native';

import splash from '../assets/splash.json'

@inject('store') @observer
export default class AuthLoadingScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true
      }
    }
    break;
  
    componentDidMount = () => {
     this._bootstrapAsync()
      // setTimeout(() => {
      //     this._bootstrapAsync()
      // }, 4000)
    }
    _bootstrapAsync = async () => {
      try {
        const userToken = await AsyncStorage.getItem("token")
        this.props.store.AuthStore.userToken = userToken;
        if(!userToken) {
          this.props.store.DataStore.getInit().then(()=>{
            this.props.navigation.navigate('App')
          }).catch((e)=> {
            if(e==401)
              this.props.navigation.navigate('Auth')
            else
              this.setState({loading: false})
          })
        } else {
          console.log("not user token")
          this.props.navigation.navigate('Auth')
        }
      } catch(error) {
        console.log(error.message)
        this.props.navigation.navigate('Auth')
      }

  
    };
  
    render() {
      return (
        <View style={{flex:1, justifyContent:"center", backgroundColor:"white"}}>
          <StatusBar
            backgroundColor="white"
            barStyle="dark-content"
            translucent={false} />
          <View style={{flex:5, justifyContent:"center", flexDirection:"row"}} >
            <View style={{justifyContent:"center", flexDirection:"column"}} >
              <LottieView
                  source={splash}
                  autoPlay
                  style={{ width: 500, height:500}}
              />
              <Text style={{fontFamily:"IRANSansMobile_Bold", color:"#22b4c5", fontSize:28, margin:16, textAlign:"center"}} > من</Text>
            </View>
          </View>
          <View style={{flex:2, justifyContent:"center", flexDirection:"row"}} >
            <View style={{justifyContent:"center", flexDirection:"column"}} >
              {this.state.loading&&
                <Spinner color="#22b4c5" style={{height:64, width:64}} />
              }
            </View>
          </View>
        </View>
      );
    }
}
  