import React from 'react';
import { Text, View, Dimensions, ImageBackground, Image, StatusBar } from "react-native";
import { Input, Form, Item, Button, Container, Spinner } from 'native-base';
import {inject, observer} from "mobx-react/native";
import Toast from 'react-native-easy-toast';

import cancerImg from '../assets/cancer.png';

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
        this.setState({loading: true})
        let phoneReq = this.props.store.AuthStore.webService + 'phone'; // set the phone request
        fetch(phoneReq, {
          method: 'POST',
          body: JSON.stringify({ 'phone': this.state.mobile }),
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then((response) => response.json().then(data => ({status: response.status, ...data})))
        .then((responseJson) => {
          
            this.setState({loading: false})
            if (!responseJson.success) {
              this.refs.toast.show(responseJson.error, 2000);
            } else {
                this.props.advanceToVerification(this.state.mobile);
            }
        })
        .catch((error) => {
          this.setState({loadingPhone: false})
          console.log(error)
          this.refs.toast.show("خطا در برقراری ارتباط با اینترنت", 2000);
        });
      } else {
        this.refs.toast.show("فیلد شماره همراه را کامل وارد کنید.", 2000);
      }
    }

    render() {
      return (
        <Container style={{ backgroundColor: '#ffffff' }}>
          <StatusBar
            backgroundColor="white"
            barStyle="dark-content"
            translucent={false} />
          <View padder style={{ margin:16, justifyContent: 'center', alignItems:"center", marginTop:40 }}>
            <Image style={{ width: 79.75, height: 128 }} source={ cancerImg } />
            <Form>
              <Item floatingLabel style={{ width: 160 }}>
                <Input value={this.state.mobile} style={{ fontFamily: "IRANSansMobile", fontSize: 14, marginTop: 40 }} keyboardType="numeric" placeholder="شماره موبایل" onChangeText={(text) => this.onChangeMobile(text)} />
              </Item>
            </Form>
            <View style={{alignItems:"center"}} >
              {this.state.loading?
                <Spinner color='#f47983'/>
              :
                <Button style={{ backgroundColor: '#f47983', justifyContent: 'center', marginTop: 120, width: 160 }} onPress={() => this.sendPhone()}>
                  <Text style={{ fontFamily: "IRANSansMobile", fontSize: 14, color: '#ffffff'}}>ارسال کد تایید</Text>
                </Button>
              }
            </View>
          </View>
          <Toast
            ref="toast"
            style={{backgroundColor:'red'}}
            position='top'
            positionValue={150}
            fadeInDuration={750}
            fadeOutDuration={1000}
            opacity={0.8}
            textStyle={{color:'white', fontFamily:"IRANSansMobile"}}
          />
        </Container>
      );
    }
}
