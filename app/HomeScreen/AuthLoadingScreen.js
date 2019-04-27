import React from 'react';
import { AsyncStorage, View, ToastAndroid, Image } from 'react-native';
import {Spinner, Text} from 'native-base';
import VersionNumber from 'react-native-version-number';
import {inject, observer} from "mobx-react/native";

import appIcon from '../assets/images/ic_launcher.png'

@inject('store') @observer
export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        loading: true
    }
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
        let req = this.props.store.webservice+"?version="+VersionNumber.buildVersion
        fetch(req)
        .then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.success){
            this.props.store.isRegistering = responseJson.isRegistering
            this.props.store.resigterationData = responseJson.resigteration
            this.props.store.linkdunyGrid = responseJson.linkduny
            this.props.store.communitiesList = responseJson.communities
            this.props.store.links = responseJson.links
            this.props.store.pins = responseJson.map.points
            this.props.store.bus = responseJson.map.bus
            this.props.store.initRegion = responseJson.initRegion
            this.props.store.resigsterText = responseJson.resigsterText

            if(responseJson.update!=null){
              this.props.store.modal_update_show = true
              this.props.store.update = responseJson.update
            }
            this.props.navigation.navigate('App')
          } else {
            this.setState({loading: false})
            ToastAndroid.show("خطا در دریافت داده", ToastAndroid.SHORT)
          }
        })
        .catch((error) => {
          this.setState({loading: false})
          ToastAndroid.show("خطا در اتصال", ToastAndroid.SHORT)
        });
  };

  render() {
    return (
      <View style={{flex:1, justifyContent:"center"}}>
        <View style={{flex:5, justifyContent:"center", flexDirection:"row"}} >
          <View style={{justifyContent:"center", flexDirection:"column"}} >
            <Image source={appIcon} style={{height:128, width:128, alignSelf:"center"}} />
            <Text style={{fontFamily:"IRANSansMobile_Bold", color:"#455a64", fontSize:24, margin:16, textAlign:"center"}} >دانشگاه علوم پزشکی کرمان</Text>
          </View>
        </View>
        <View style={{flex:2, justifyContent:"center", flexDirection:"row"}} >
          <View style={{justifyContent:"center", flexDirection:"column"}} >
            {this.state.loading &&
                <Spinner color="#534E79" style={{height:64, width:64}} />
            }
            
          </View>
        </View>
      </View>
    );
  }
}