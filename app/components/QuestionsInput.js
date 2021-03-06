import React from 'react';
import { Text, View, Dimensions, ScrollView, Image, StatusBar } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Input, Form, Item, Button, Container, Spinner } from 'native-base';
import {inject, observer} from "mobx-react/native";
import Toast from 'react-native-easy-toast';
import LinearGradient from 'react-native-linear-gradient';

import cancerImg from '../assets/cancer.png';

const win = Dimensions.get('window');

@inject('store') @observer
export default class QuestionsInput extends React.Component {
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
        id = id.toString();
        qid = qid.toString()
        fvalue = fvalue.toString()
        console.log({askReq, token: this.props.store.AuthStore.userToken, id, value: qid, fvalue})
        fetch(askReq, {
          method: 'POST',
          body: JSON.stringify({ "token": this.props.store.AuthStore.userToken, id, value: qid, fvalue }),
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
              if(responseJson.finished)
                this.goToHome(responseJson)
              else
                this.setState({ q: responseJson.data });
            } else
              this.refs.toast.show(responseJson.error, 2000);
        })
        .catch((error) => {
          console.log(error)
          this.setState({loading: false})
          this.refs.toast.show("خطا در برقراری ارتباط با اینترنت", 2000);
        });

    }

    goToHome = (home) => {
      this.props.store.DataStore.user = home.user
      this.props.store.DataStore.tips = home.tips
      this.props.store.DataStore.actions = home.actions
      this.props.store.AuthStore.saveToken()
      this.props.navigation.navigate('App')
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
            <View padder style={{flex:1, margin: '10%', borderWidth: 4, borderColor: '#d8e4ec'}}>
              {this.state.loading?
                <Spinner color='#d8e4ec'/>
              :
                <View style={{flex: 1, alignItems:'center', margin: wp('10%'), flexDirection: 'column'}} >
                  <Text style={{marginBottom: 10, fontFamily: "IRANSansMobile_Bold", fontSize: wp('65%') / hp('2%'), color: '#d8e4ec'}}>{this.state.q.title}</Text>
                  <ScrollView>
                    {this.state.q.options.map(item=>{
                      return <Button  style={{backgroundColor: '#d8e4ec', justifyContent: 'center', marginTop: hp('5%'), width: wp('50%'), height: hp('7%') }} onPress={() => this.sendAnswer(this.state.q.id, item.qid, this.state.q.fvalue)}>
                                <Text style={{ fontFamily: "IRANSansMobile", fontSize: wp('60%') / hp('2%'), color: '#da62b7'}}>{item.text}</Text>
                              </Button>
                    })}
                  </ScrollView>
                </View>
              }
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
          </LinearGradient>
        </Container>
      );
    }
}
