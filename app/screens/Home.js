import React from 'react'
import {Text, View, FlatList, StatusBar, ToastAndroid} from 'react-native'
import {inject, observer} from "mobx-react/native"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Container, Card, Button } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

@inject('store') @observer
export default class Home extends React.Component {
      constructor(props) {
        super(props)
        this.state = {
        }
      }

      goGame = () => {
        this.props.navigation.navigate('Game')
      }

      gobse = () => {
        this.props.navigation.navigate('Survey')
      }

      commit = (type, value, commit_id, point) => {
        let commitReq = this.props.store.AuthStore.webService + 'commit'; 
        fetch(commitReq, {
          method: 'POST',
          body: JSON.stringify({ token: this.props.store.AuthStore.userToken, type, value, commit_id}),
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
              this.props.store.DataStore.user.score=this.props.store.DataStore.user.score+point
              ToastAndroid.show(point+" امتیاز گرفتی", ToastAndroid.SHORT)
              this.props.store.DataStore.useCommit(commit_id)
            } else {
              ToastAndroid.show("خطا", ToastAndroid.SHORT)
            }
        })
        .catch((error) => {
          console.log(error)
          this.setState({loading: false})
          ToastAndroid.show("خطا در برقراری ارتباط با اینترنت", ToastAndroid.SHORT)
        });
      }

      render() {
        let {user, tips, actions} = this.props.store.DataStore
        return (
          <Container padder style={{backgroundColor:"white"}} >
                            <LinearGradient
        colors={['#77b4db', '#da62b7']}
        style={{flex: 1}}
      >
          <StatusBar
            backgroundColor="#77b4db"
              barStyle="dark-content"
              translucent={false} />
            <View style={{flexDirection:"row", margin: wp('6%')}} >
              <Text style={{borderColor:"#ed8687", borderRadius:50, borderWidth: wp('2%'), padding:  wp('4%'), height:  wp('16%'), width:  wp('16%'), fontSize:  wp('4%'), textAlign: "center", textAlignVertical: "center"}} >{user.score}</Text>
              <Text style={{alignSelf:"center", flex:1, textAlign:"left", fontFamily:"IRANSansMobile_Bold", fontSize:  wp('6%')}} >سلام {user.name}</Text>
            </View>
            <View style={{flex:1, padding: wp('6%'), paddingTop:0}}>
              <Card style={{flex:1}} >
                <FlatList
                  data={this.props.store.DataStore.list}
                  ListEmptyComponent={
                      <Card style={{flex: 1, margin:48, borderRadius: 8 }}>
                          <Text style={{fontFamily:"IRANSansMobile", fontSize:12, margin:12, marginBottom:16}} >برای امروز کافیه</Text>
                      </Card>
                  }
                  renderItem={({item}) => 
                      <View style={{flex: 1, margin:16, borderRadius: 5, borderColor:"#ed8687", borderWidth:2}}>
                          <View style={{flex:1, flexDirection:"row", margin:12, justifyContent:"space-between"}}>
                            {item.text?
                              <View style={{flexDirection:"column", flex:1}} >
                                <Text style={{flex:1, margin:4, borderRadius:50, color:"black", fontFamily:"IRANSansMobile", fontSize:14, padding:1, paddingLeft:12, paddingRight:12}} >{item.text.trim()}</Text>
                                <View style={{flexDirection:"row"}} >
                                  <Button style={{flex:1,margin: wp('2%'), marginTop:0, backgroundColor:"#ed8687"}} onPress={()=>this.commit('action', "ok", item._id, item.point)} >
                                    <Text style={{alignSelf:"center", flex:1, textAlign:"center", fontFamily:"IRANSansMobile_Bold", fontSize:  16, color:"white"}} >نه</Text>
                                  </Button>
                                  <Button style={{flex:1,margin: wp('2%'), marginTop:0, backgroundColor:"#ed8687"}} onPress={()=>this.commit('action', "nok", item._id, item.point)} >
                                    <Text style={{alignSelf:"center", flex:1, textAlign:"center", fontFamily:"IRANSansMobile_Bold", fontSize: 16, color:"white"}} >بله</Text>
                                  </Button>
                                </View>
                                <Text style={{flex:1, margin:4, borderRadius:50, color:"black", fontFamily:"IRANSansMobile", fontSize:14, padding:1, paddingLeft:12, paddingRight:12}} >{item.point} امتیاز</Text>
                              </View>
                            :
                              <View style={{flexDirection:"column", flex:1}} >
                                <Text style={{flex:1, margin:4, borderRadius:50, color:"black", fontFamily:"IRANSansMobile", fontSize:14, padding:1, paddingLeft:12, paddingRight:12}} >{item.context.trim()}</Text>

                                <Button style={{flex:1,margin: wp('2%'), marginTop:0, backgroundColor:"#ed8687"}} onPress={()=>this.commit('tip', "ok", item._id, item.point)} >
                                  <Text style={{alignSelf:"center", flex:1, textAlign:"center", fontFamily:"IRANSansMobile_Bold", fontSize:  wp('6%'), color:"white"}} >خواندم</Text>
                                </Button>
                                <Text style={{flex:1, margin:4, borderRadius:50, color:"black", fontFamily:"IRANSansMobile", fontSize:14, padding:1, paddingLeft:12, paddingRight:12}} >{item.point} امتیاز</Text>
                              </View>
                            }
                          </View>
                          <Text style={{fontFamily:"IRANSansMobile", fontSize:12, margin:12, marginTop:0, marginBottom:16}} >{item.subject}</Text>
                      </View>
                  }
                />
              </Card>
            </View>
            <Button style={{margin: wp('6%'), marginTop:0, marginBottom: wp('4%'), backgroundColor:"#ed8687"}} onPress={this.goGame} >
              <Text style={{alignSelf:"center", flex:1, textAlign:"center", fontFamily:"IRANSansMobile_Bold", fontSize:  wp('6%'), color:"white"}} >آکواریوم</Text>
            </Button>
            <Button style={{margin: wp('6%'), marginTop:0, marginBottom: wp('4%'), backgroundColor:"white"}} onPress={this.gobse} >
              <Text style={{alignSelf:"center", flex:1, textAlign:"center", fontFamily:"IRANSansMobile", fontSize:  wp('6%'), color:"#ed8687"}} >راهنمای خود تستی</Text>
            </Button>
            </LinearGradient>
          </Container>
        );
     }
}