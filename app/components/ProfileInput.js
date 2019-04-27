import React from 'react';
import { Text, View, Button, Dimensions, ImageBackground, Image, StatusBar } from "react-native";
import {inject, observer} from "mobx-react/native";
import Toast from 'react-native-easy-toast';

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
      if(this.state.code.length>6){
        this.setState({loading: true})
        let phoneReq = this.props.store.AuthStore.webService + 'new_token'; // set the profile
        fetch(phoneReq, {
          method: 'POST',
          body: JSON.stringify({ 'code': this.state.code }),
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then((response) => response.json().then(data => ({status: response.status, ...data})))
        .then((responseJson) => {
          
            this.setState({loading: false})
            if (responseJson.status == 404) {
              this.refs.toast.show(responseJson.error, 2000);
            } else {
                this.props.advanceToProfile();
            }
        })
        .catch((error) => {
          
          this.setState({loadingPhone: false})
          this.refs.toast.show("خطا در برقراری ارتباط با اینترنت", 2000);
        });
      } else {
        this.refs.toast.show("فیلد ها را کامل وارد کنید.", 2000);
      }
    }

    render() {
      return (
        <Container style={{ backgroundColor: '#f47983' }}>
          <StatusBar
            backgroundColor="white"
            barStyle="dark-content"
            translucent={false} />
          <View padder style={{ margin:16, alignItems:"center", marginTop:40 }}>
            <Text style={{ textAlign: 'center', fontFamily: "IRANSansMobile_Bold", fontSize: 16, color: '#1780AC', padding: 32 }}>بوووب اپ</Text>
            <Item>
              <Input value={this.state.name} style={{fontFamily: "IRANSansMobile", fontSize: 12}} placeholder="نام و نام خانوادگی" onChangeText={(text) => this.onChangeName(text)} />
              <Input value={this.state.phone2} style={{fontFamily: "IRANSansMobile", fontSize: 12}} placeholder="شماره فرد نزدیک" onChangeText={(text) => this.onChangePhone2(text)} />
              <Input value={this.state.age} style={{fontFamily: "IRANSansMobile", fontSize: 12}} placeholder="سن" onChangeText={(text) => this.onChangeAge(text)} />
              <Input value={this.state.sex} style={{fontFamily: "IRANSansMobile", fontSize: 12}} placeholder="جنسیت" onChangeText={(text) => this.onChangeSex(text)} />
              {sex == 1 ?
                <Input value={this.state.periodDay} style={{fontFamily: "IRANSansMobile", fontSize: 12}} placeholder="روز شروع عادت ماهانه" onChangeText={(text) => this.onChangePeriodDay(text)} />
                :
                null
              }
            </Item>
            <View style={{alignItems:"center"}} >
              {this.state.loading?
                <Spinner color='#179BBA'/>
              :
                <Button style={{marginTop:32}} onPress={() => this.sendProfile()} text="ارسال" />
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
