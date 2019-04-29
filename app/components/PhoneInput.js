import React from 'react';
import { Text, Dimensions, StyleSheet, Image, StatusBar } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Input, Form, Item, Button, Container, Spinner, View } from 'native-base';
import {inject, observer} from "mobx-react/native";
import Toast from 'react-native-easy-toast';
import LinearGradient from 'react-native-linear-gradient';

import phone from '../assets/phone.png';
import ribbon from '../assets/ribbon.png'

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
        <Container>
                <LinearGradient
        colors={['#77b4db', '#da62b7']}
        style={{flex: 1}}
      >
          <StatusBar
            backgroundColor="#77b4db"
            barStyle="dark-content"
            translucent={false} />
          <View padder style={{flex:1, justifyContent: 'center', alignItems:"center", margin: '10%', borderWidth: 4, borderColor: '#d8e4ec'}}>
            <Image style={styles.image} source={ phone } />
            <Form>
              <Item floatingLabel style={{ width: wp('50%') }}>
                <Input onSubmitEditing={() => this.sendPhone()} value={this.state.mobile} placeholderTextColor='#d8e4ec' style={{color: '#d8e4ec', fontFamily: "IRANSansMobile", fontSize: wp('60%') / hp('2.5%'), marginTop: wp('5%') }} keyboardType="numeric" placeholder="شماره موبایل" onChangeText={(text) => this.onChangeMobile(text)} />
              </Item>
            </Form>
            <View style={{alignItems:"center"}} >
              {this.state.loading?
                <Spinner color='#d8e4ec' style={{marginTop: wp('20%')}}/>
              :
                <Button style={{backgroundColor: '#d8e4ec', justifyContent: 'center', marginTop: wp('20%'), width: wp('50%'), height: hp('7%') }} onPress={() => this.sendPhone()}>
                  <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: wp('60%') / hp('2.5%'), color: '#da62b7'}}>ارسال کد تایید</Text>
                </Button>
              }
            </View>
          </View>
          <Toast
            ref="toast"
            style={{backgroundColor:'red'}}
            position='top'
            positionValue={hp('40%')}
            fadeInDuration={750}
            fadeOutDuration={1000}
            opacity={0.8}
            textStyle={{color:'white', fontFamily:"IRANSansMobile", fontSize: wp('3%')}}
          />
                  </LinearGradient>
        </Container>

      );
    }
}

const styles = StyleSheet.create({
  image: {
    
    width: wp('60%'), 
    height: wp('60%'), 
    resizeMode: 'contain'
  },
})