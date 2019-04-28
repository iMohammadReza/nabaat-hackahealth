import React from 'react';
import { Text, View, Dimensions, ImageBackground, Image, StatusBar } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Input, Form, Item, Button, Container, Spinner } from 'native-base';
import {inject, observer} from "mobx-react/native";
import Toast from 'react-native-easy-toast';

import cancerImg from '../assets/cancer.png';

const win = Dimensions.get('window');

@inject('store') @observer
export default class QuestionInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            q: this.props.q,
            loading: false,
        }
    }

    // componentWillMount = () => {
    //   this.setState({q: this.props.q})
    // }

    sendAnswer = async (id, qid, fvalue) => {
        this.setState({loading: true})
        let askReq = this.props.store.AuthStore.webService + 'ask'; // set the phone ask
        console.log({askReq, token: this.props.store.AuthStore.userToken, id, value: qid, fvalue})
        fetch(askReq, {
          method: 'POST',
          body: JSON.stringify({ token: this.props.store.AuthStore.userToken, id, value: qid, fvalue}),
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
              if(responseJson.status=="finished")
                this.goToHome()
              else {
                this.setState({q: responseJson.data})
              }
            }
        })
        .catch((error) => {
          this.setState({loading: false})
          console.log(error)
          this.refs.toast.show("خطا در برقراری ارتباط با اینترنت", 2000);
        });
    }

    goToHome = () => {
      this.props.store.AuthStore.saveToken()
    }

    render() {
      return (
        <Container>
          <StatusBar
            backgroundColor="white"
            barStyle="dark-content"
            translucent={false} />
          <View padder style={{ justifyContent: 'center', alignItems:"center", marginTop:wp("10%")}}>
            
            <View style={{alignItems:"center"}} >
              {this.state.loading?
                <Spinner color='#f47983'/>
              :
                <View style={{marginTop: wp('10%'), alignContent:"center"}} >
                  <Text style={{fontFamily: "IRANSansMobile_Bold", fontSize:  wp('4.4%'), width:wp('90%'), color: 'grey'}}>{this.state.q.title}</Text>
                  <View >
                    {this.state.q.options.map(item=>{
                      return  <Button style={{ alignSelf:"center", backgroundColor: '#f47983', justifyContent: 'center', marginTop: wp('8%'), width: wp('60%'), height: hp('7%') }} onPress={() => this.sendAnswer(this.state.q.id, item.qid, this.state.q.fvalue)}>
                                <Text style={{ fontFamily: "IRANSansMobile", fontSize:  wp('4%'), color: '#ffffff'}}>{item.text}</Text>
                              </Button>
                    })}
                  </View>
                </View>
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
