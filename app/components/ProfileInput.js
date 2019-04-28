import React from 'react';
import { Text, View, Dimensions, ImageBackground, Image, StatusBar } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Input, Item, Button, Container, Form, Spinner } from 'native-base';
import {inject, observer} from "mobx-react/native";
import Toast from 'react-native-easy-toast';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import cancerImg from '../assets/cancer.png';

const win = Dimensions.get('window');

@inject('store') @observer
export default class ProfileInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            phone2: '',
            periodDay: '',
            age: '',
            sex: '',
            loading: false,
        }
    }

    onChangeName = (name) => {
      this.setState({ name });
    }

    onChangePhone2 = (phone2) => {
        this.setState({ phone2 });
    }

    onChangePeriodDay = (periodDay) => {
    this.setState({ periodDay });
    }

    onChangeAge = (age) => {
        this.setState({ age });
    }

    onChangeSex = (sex) => {
        this.setState({ sex });
    }

    sendProfile = async () => {
      if(this.state.name.length>2 && this.state.phone2.length>6 && this.state.periodDay.length>0 && this.state.age.length>0 && this.state.sex.length>0 ){
        this.setState({loading: true})
        let {name, phone2, periodDay, age, sex } = this.state
        let profileReq = this.props.store.AuthStore.webService + 'profile'; // set the profile
        console.log(sex)
        fetch(profileReq, {
          method: 'POST',
          body: JSON.stringify({ token: this.props.store.AuthStore.userToken, name, phone2, age, sex, periodDay }),
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then((response) => response.json().then(data => ({status: response.status, ...data})))
        .then((responseJson) => {
          console.log(responseJson)
            this.setState({loading: false})
            if (responseJson.success) {
              this.props.advanceToQuestions(responseJson.data);
            } else {
              this.refs.toast.show(responseJson.error, 2000);
            }
        })
        .catch((error) => {
          console.log(error)
          this.setState({loading: false})
          this.refs.toast.show("خطا در برقراری ارتباط با اینترنت", 2000);
        });
      } else {
        this.refs.toast.show("فیلد ها را کامل وارد کنید.", 2000);
      }
    }

    render() {
      return (
        <Container style={{ flex:1, backgroundColor: '#ffffff' }}>
          <StatusBar
            backgroundColor="white"
            barStyle="dark-content"
            translucent={false} />
          <View padder style={{ justifyContent: 'center', alignItems:"center" }}>
            <Image style={{margin: wp('5%'), width: wp('20%'), height: hp('25%') }} source={ cancerImg } />
            <Form>
              <Item floatingLabel style={{ width: wp('50%') }}>
                <Input value={this.state.phone2} style={{fontFamily: "IRANSansMobile", fontSize: wp('60%') / hp('2%'), marginTop: wp('4%')}} placeholder="شماره فرد نزدیک" onChangeText={(text) => this.onChangePhone2(text)} />
              </Item>
              <Item floatingLabel style={{ width: wp('50%') }}>
                <Input value={this.state.name} style={{fontFamily: "IRANSansMobile", fontSize: wp('60%') / hp('2%'), marginTop: wp('4%')}} placeholder="نام و نام خانوادگی" onChangeText={(text) => this.onChangeName(text)} />
              </Item>
              <Item floatingLabel style={{ width: wp('50%') }}>
                <Input value={this.state.age} style={{fontFamily: "IRANSansMobile", fontSize: wp('60%') / hp('2%'), marginTop: wp('4%')}} placeholder="سن" onChangeText={(text) => this.onChangeAge(text)} />
              </Item>
              <Item floatingLabel style={{ width: wp('50%') }}>
                <Input value={this.state.sex} style={{fontFamily: "IRANSansMobile", fontSize: wp('60%') / hp('2%'), marginTop: wp('4%')}} placeholder="جنسیت" onChangeText={(text) => this.onChangeSex(text)} />
              </Item>
                {this.state.sex == 1 ?
                  <Item floatingLabel style={{ width: wp('50%') }}>
                    <Input value={this.state.periodDay} style={{fontFamily: "IRANSansMobile", fontSize: wp('60%') / hp('2%'), marginTop: wp('4%')}} placeholder="روز شروع عادت ماهانه" onChangeText={(text) => this.onChangePeriodDay(text)} />
                  </Item>
                  :
                  null
                }
            </Form>
            <View style={{alignItems:"center"}} >
              {this.state.loading?
                <Spinner color='#f47983' style={{marginTop: wp('20%')}}/>
              :
                <Button style={{ backgroundColor: '#f47983', justifyContent: 'center', marginTop: wp('20%'), width: wp('30%'), height: hp('7%') }} onPress={() => this.sendProfile()}>
                  <Text style={{ fontFamily: "IRANSansMobile", fontSize:  wp('60%') / hp('2%'), color: '#ffffff'}}>ارسال</Text>
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
            textStyle={{color:'white', fontFamily:"IRANSansMobile", fontSize: wp('60%') / hp('2%')}}
          />
        </Container>
      );
    }
}
