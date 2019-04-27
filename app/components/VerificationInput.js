import React from 'react';
import { Text, View, Dimensions, ImageBackground, Image, StatusBar } from "react-native";
import { Input, Item, Button, Container, Form, Spinner } from 'native-base';
import {inject, observer} from "mobx-react/native";
import Toast from 'react-native-easy-toast';

const win = Dimensions.get('window');

@inject('store') @observer
export default class VerificationInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            code: '',
            loading: false,
        }
    }

    onChangeCode = (code) => {
      this.setState({ code });
    }

    sendVerification = async () => {
      if(this.state.code.length>3){
        this.setState({loading: true})
        console.log({ token: this.state.code, phone: this.props.mobile })
        let phoneReq = this.props.store.AuthStore.webService + 'verify'; // set the code validation
        fetch(phoneReq, {
          method: 'POST',
          body: JSON.stringify({ token: this.state.code, phone: this.props.mobile }),
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then((response) => response.json().then(data => ({status: response.status, ...data})))
        .then((responseJson) => {
          if(responseJson.success){
            this.props.store.AuthStore.addUserToken(responseJson.token)
            this.props.advanceToProfile()
          } else {
            this.refs.toast.show(responseJson.error, 2000);
            this.setState({loading: false})
          }
        })
        .catch((error) => {
          console.log(error)
          this.setState({loadingPhone: false})
          this.refs.toast.show("خطا در برقراری ارتباط با اینترنت", 2000);
        });
      } else {
        this.refs.toast.show("فیلد کد را کامل وارد کنید.", 2000);
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
            <Text style={{ textAlign: 'center', fontFamily: "IRANSansMobile_Bold", fontSize: 16, color: '#f47983', padding: 32 }}>بوووب اپ</Text>
            <Form>
              <Item floatingLabel style={{ width: 160 }}>
                <Input value={this.state.code} style={{ fontFamily: "IRANSansMobile", fontSize: 14, marginTop: 50 }} keyboardType="numeric" placeholder="کد فعال سازی" onChangeText={(text) => this.onChangeCode(text)} />
              </Item>
            </Form>
            <View style={{alignItems:"center"}} >
              {this.state.loading?
                <Spinner color='#f47983'/>
              :
                <Button style={{ backgroundColor: '#f47983', justifyContent: 'center', marginTop: 120, width: 160 }} onPress={() => this.sendVerification()}>
                  <Text style={{ fontFamily: "IRANSansMobile", fontSize: 14, color: '#ffffff'}}>ارسال</Text>
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
