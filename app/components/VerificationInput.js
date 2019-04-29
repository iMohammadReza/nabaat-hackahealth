import React from 'react';
import { Text, View, Dimensions, StyleSheet, Image, StatusBar } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Input, Item, Button, Container, Form, Spinner } from 'native-base';
import {inject, observer} from "mobx-react/native";
import Toast from 'react-native-easy-toast';
import LinearGradient from 'react-native-linear-gradient';
import verification from '../assets/verification.png';

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
        let verifyReq = this.props.store.AuthStore.webService + 'verify'; // set the code validation
        fetch(verifyReq, {
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
            <Image style={styles.image} source={ verification } />
            <Form>
              <Item floatingLabel style={{ width: wp('50%') }}>
                <Input onSubmitEditing={() => this.sendVerification()} value={this.state.code} placeholderTextColor='#d8e4ec' style={{color: '#d8e4ec', fontFamily: "IRANSansMobile", fontSize: wp('60%') / hp('2.5%'), marginTop: wp('5%') }} keyboardType="numeric" placeholder="کد تایید" onChangeText={(text) => this.onChangeCode(text)} />
              </Item>
            </Form>
            <View style={{alignItems:"center"}} >
              {this.state.loading?
                <Spinner color='#d8e4ec' style={{marginTop: wp('20%')}}/>
              :
                <Button  style={{backgroundColor: '#d8e4ec', justifyContent: 'center', marginTop: wp('20%'), width: wp('50%'), height: hp('7%') }} onPress={() => this.sendVerification()}>
                  <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: wp('60%') / hp('2.5%'), color: '#da62b7'}}>ارسال</Text>
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