import React from 'react';
import { Text, View, Dimensions, StyleSheet, ScrollView, Image, StatusBar, AppRegistry } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Input, Item, Button, Container, Form, Spinner, Picker } from 'native-base';
import {inject, observer} from "mobx-react/native";
import Toast from 'react-native-easy-toast';
import LinearGradient from 'react-native-linear-gradient';
import profile from '../assets/profile.png';

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
            sex: 1,
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
      if(this.state.name.length>2 && this.state.phone2.length>6 && this.state.age.length>0 && this.state.sex.length>0 ){
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
              this.props.advanceToBSE(responseJson.data);
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
            <Image style={styles.image} source={ profile } />
            <ScrollView>
              <Form>
                <Item style={{ width: wp('50%') }}>
                <Input
                  value={this.state.name} 
                  placeholderTextColor='#d8e4ec' 
                  style={styles.input} 
                  placeholder="نام و نام خانوادگی" 
                  onChangeText={(text) => this.onChangeName(text)} />
                </Item>
                <Item style={{ width: wp('50%') }}>
                  <Input
                    value={this.state.phone2} 
                    placeholderTextColor='#d8e4ec'
                    keyboardType="numeric"
                    style={styles.input} 
                    placeholder="شماره فرد نزدیک" 
                    onChangeText={(text) => this.onChangePhone2(text)} />
                </Item>
                <Item style={{ width: wp('50%') }}>
                  <Input 
                    value={this.state.age} 
                    keyboardType="numeric"
                    placeholderTextColor='#d8e4ec' 
                    style={styles.input} placeholder="سن" 
                    onChangeText={(text) => this.onChangeAge(text)} />
                </Item>
                <Item style={{ width: wp('50%') }}>
                  <Picker
                    selectedValue={this.state.sex}
                    style={{ height: 40, color: '#d8e4ec', marginTop: 10 }}
                    itemStyle={styles.input}
                    placeholderStyle={{ color: "#d8e4ec" }}
                    placeholderIconColor="#d8e4ec"
                    onValueChange={(itemValue, itemIndex) => this.setState({sex: itemValue})}>
                    <Picker.Item label="آقا" value="2" />
                    <Picker.Item label="خانم" value="1" />
                    <Picker.Item label="تمایلی ندارم" value="-1" />
                  </Picker>
                </Item>
                  {this.state.sex == 1 ?
                    <Item style={{ width: wp('50%') }}>
                      <Input 
                        value={this.state.periodDay} 
                        placeholderTextColor='#d8e4ec' 
                        keyboardType="numeric"
                        style={styles.input} 
                        placeholder="روز شروع عادت ماهانه" 
                        onChangeText={(text) => this.onChangePeriodDay(text)} />
                    </Item>
                    :
                    null
                  }
              </Form>
            </ScrollView>
            <View style={{alignItems:"center"}} >
              {this.state.loading?
                <Spinner color='#d8e4ec' style={{marginTop: wp('20%')}}/>
              :
                <Button  style={{backgroundColor: '#d8e4ec', justifyContent: 'center', marginTop: wp('5%'), width: wp('50%'), height: hp('7%') }} onPress={() => this.sendProfile()}>
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
            textStyle={{color:'white', fontFamily:"IRANSansMobile", fontSize: wp('60%') / hp('2%')}}
          />
          </LinearGradient>
        </Container>
      );
    }
}

const styles = StyleSheet.create({
  input: {
    fontFamily: "IRANSansMobile", 
    fontSize: wp('60%') / hp('3%'),
    color: '#d8e4ec'
  },
  image: {
    
    width: wp('50%'), 
    height: wp('50%'), 
    resizeMode: 'contain'
  },
})
