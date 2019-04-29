import React from 'react';
import { AsyncStorage, View, Image, StatusBar } from 'react-native';
import {Spinner, Text} from 'native-base';
import {inject, observer} from "mobx-react/native";
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import splash from '../assets/girl.json'
import name from '../assets/name.png'

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
    //  this._bootstrapAsync()
      setTimeout(() => {
          this._bootstrapAsync()
      }, 1000)
    }
    _bootstrapAsync = async () => {
      try {
        const userToken = await AsyncStorage.getItem("token")
        this.props.store.AuthStore.userToken = userToken;
        if(userToken) {
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
        <LinearGradient
        colors={['#77b4db', '#da62b7']}
        style={{flex: 1}}
        >
          <StatusBar
            backgroundColor="#77b4db"
            barStyle="dark-content"
            translucent={false} />
          <Image style={{alignSelf: 'center', marginTop: 50}} source={name} />
          <LottieView
            style={{marginTop: 50}}
            source={splash}
            autoPlay
            loop
          />
        </LinearGradient>
      );
    }
}
  