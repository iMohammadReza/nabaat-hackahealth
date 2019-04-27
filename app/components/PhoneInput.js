import React from 'react';
import { Text, View, Dimensions, ImageBackground, Image, StatusBar } from "react-native";
import {inject, observer} from "mobx-react/native";
import Toast from 'react-native-easy-toast';

const win = Dimensions.get('window');

@inject('store') @observer
export default class PhoneInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mobile: '',
            loading: false,
        }
    }

    onChangeMobile = (mobile) => {
      this.setState({ mobile });
    }

    sendPhone = async () => {
      if(this.state.mobile.length>6){
        this.setState({loadingPhone: true})
        let phoneReq = this.props.store.AuthStore.webService + 'new_token';
        fetch(phoneReq, {
          method: 'POST',
          body: JSON.stringify({ 'mobile': this.state.mobile }),
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then((response) => response.json().then(data => ({status: response.status, ...data})))
        .then((responseJson) => {
          
            this.setState({loadingPhone: false})
            if (responseJson.status == 404) {
              this.refs.toast.show(responseJson.error, 2000);
            } else if (responseJson.status == 422) {
              this.refs.toast.show(responseJson.mobile[0], 2000);
            } else {
              this.setState({ firstStage: false });
            }
        })
        .catch((error) => {
          
          this.setState({loadingPhone: false})
          this.refs.toast.show("خطا در برقراری ارتباط با اینترنت", 2000);
        });
      } else {
        this.refs.toast.show("فیلد شماره همراه را کامل وارد کنید.", 2000);
      }
    }

    render() {
      return (
        <Container style={{ backgroundColor: '#f47983' }}>
          <StatusBar
            backgroundColor="white"
            barStyle="dark-content"
            translucent={false} />
          <ImageBackground
            style={{
              backgroundColor: '#ffffff',
              flex: 1,
              position: 'absolute',
              width: win.width,
              height: win.height / 3,
              bottom:0,
              left:0,
            }}
            source={ bubbles } />
          <View padder style={{ margin:16, alignItems:"center", marginTop:40 }}>
            <Image source={padidar} style={{height:106.5, width:100}}/>
            <Text style={{ textAlign: 'center', fontFamily: "IRANSansMobile_Bold", fontSize: 16, color: '#1780AC', padding: 32 }}>نرم افزار همراه پدیدار</Text>
            <Item>
              <Input value={this.state.mobile} style={{fontFamily: "IRANSansMobile", fontSize: 12}} keyboardType="numeric" placeholder="شماره موبایل" onChangeText={(text) => this.onChangeMobile(text)} />
            </Item>
            <View style={{alignItems:"center"}} >
              {this.state.loadingPhone?
                <Spinner color='#179BBA'/>
              :
                <GradientButton style={{marginTop:32}} onPress={() => this.sendPhone()} text="ارسال کد تایید" />
              }
            </View>
          </View>
          <Toast
            ref="toast"
            style={{backgroundColor:'red'}}
            position='top'
            positionValue={200}
            fadeInDuration={750}
            fadeOutDuration={1000}
            opacity={0.8}
            textStyle={{color:'white', fontFamily:"IRANSansMobile"}}
          />
        </Container>
      );
    }
}
