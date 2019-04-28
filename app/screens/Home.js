import React from 'react'
import {Text, View, FlatList, StatusBar} from 'react-native'
import {inject, observer} from "mobx-react/native"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Container, Card, Button } from 'native-base';

@inject('store') @observer
export default class Home extends React.Component {
      constructor(props) {
        super(props)
        this.state = {
        }
      }

      goGame = () => {
        console.log("kir")
        this.props.navigation.navigate('Game')
      }

      render() {
        let {user, tips, actions} = this.props.store.DataStore
        return (
          <Container padder style={{backgroundColor:"white"}} >
            <StatusBar
              backgroundColor="white"
              barStyle="dark-content"
              translucent={false} />
            <View style={{flexDirection:"row", margin: wp('8%')}} >
              <Text style={{borderColor:"#ed8687", borderRadius:50, borderWidth: wp('1%'), padding:  wp('4%'), height:  wp('14%'), width:  wp('14%'), fontSize:  wp('4%'), textAlign: "center", textAlignVertical: "center"}} >27</Text>
              <Text style={{alignSelf:"center", flex:1, textAlign:"left", fontFamily:"IRANSansMobile_Bold", fontSize:  wp('6%')}} >سلام {user.name}</Text>
            </View>
            <View style={{flex:1, padding: wp('8%'), paddingTop:0}}>
              <Card style={{flex:1}} >
                <FlatList
                  data={[...this.props.store.DataStore.actions,...this.props.store.DataStore.tips]}
                  ListEmptyComponent={
                      <Card style={{flex: 1, margin:48, borderRadius: 8 }}>
                          <Text style={{fontFamily:"IRANSansMobile", fontSize:12, margin:12, marginBottom:16}} >شما هیچ تیکتی ندارید</Text>
                      </Card>
                  }
                  renderItem={({item}) => 
                      <Card style={{flex: 1, margin:48, borderRadius: 8 }}>
                          <View style={{flex:1, flexDirection:"row", margin:12, justifyContent:"space-between"}}>
                              <View style={{flexDirection:"row"}} >
                                  <Text style={{flex:0, backgroundColor:item.color, borderRadius:50, color:"white", fontFamily:"IRANSansMobile", fontSize:12, padding:1, paddingLeft:12, paddingRight:12}} >{item.priority}</Text>
                                  {/* <Text style={{fontFamily:"IRANSansMobile", fontSize:12, marginRight:8, marginLeft:8, color:"grey"}} >گروه: {item.group}</Text> */}
                              </View>
                              <Text style={{fontFamily:"IRANSansMobile", fontSize:12, color:"grey"}} >{item.changed}</Text>
                          </View>
                          <Text style={{fontFamily:"IRANSansMobile", fontSize:12, margin:12, marginTop:0, marginBottom:16}} >{item.subject}</Text>
                      </Card>
                  }
                />
              </Card>
            </View>
            <Button style={{margin: wp('8%'), marginTop:0, backgroundColor:"#ed8687"}} onPress={this.goGame} >
              <Text style={{alignSelf:"center", flex:1, textAlign:"center", fontFamily:"IRANSansMobile_Bold", fontSize:  wp('6%'), color:"white"}} >آکواریوم</Text>
            </Button>
          </Container>
        );
     }
}