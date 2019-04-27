import React from 'react';
import { StatusBar, View, StyleSheet } from "react-native";
import { Container, Body, Content, Header, Icon, Title, Button, Text, Card, Spinner, CardItem } from "native-base";
import {inject, observer} from "mobx-react/native";
import VersionNumber from 'react-native-version-number';
import HTMLView from 'react-native-htmlview';
import {CustomTabs} from 'react-native-custom-tabs';

@inject('store') @observer
export default class StudentActivity extends React.Component {
  constructor(props) {
		super(props)
		this.state = {
        loading: true,
        abouttext: ""
    }
  }

	open = url => {
		CustomTabs.openURL(url, {
			toolbarColor: 'white',
			enableUrlBarHiding: true,
			showPageTitle: true
		});
	}

  componentWillMount() {

    let req = this.props.store.webservice+"/about"
    fetch(req)
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.success==true){
        this.setState({abouttext:responseJson.data, loading:false})
      } else {
        this.setState({abouttext:"خطا در دریافت داده", loading:false})
      }
    })
    .catch((error) => {
      this.setState({abouttext:"خطا در دریافت داده", loading:false})
    });
  }

  showPersianNumber = (s) => {
    s= s.toString()
    const latinToPersianMap = ['۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '۰'];
    const latinNumbers = [/1/g, /2/g, /3/g, /4/g, /5/g, /6/g, /7/g, /8/g, /9/g, /0/g];
    for (let i = 0; i < 10; i++) {
      s = s.replace(latinNumbers[i], latinToPersianMap[i]);
    }
    return s;
  }
 

  render() {

    return (
      <Container>
        <View>
        <StatusBar
            backgroundColor="#fafafa"
            barStyle="dark-content"
            translucent={false} />
        </View>
        <Header androidStatusBarColor="#fafafa" iosBarStyle="dark-content" style={{backgroundColor:"#fafafa"}} >
            <Body style={{alignItems:"flex-end"}} >
              <Title style={{fontFamily: "IRANSansMobile_Bold", textAlign: 'right', fontSize: 18, color:"black"}} >درباره ما</Title>
            </Body>
            <Button transparent style={{right:-10, transform: [{ rotate: '180deg'},],}} onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-round-back" style={{color:"black"}}  />
            </Button>
        </Header>
        <Content padder>
        
          <Card style={{backgroundColor:"#534E79"}} >
            <Text style={{fontFamily:"IRANSansMobile_Bold", fontSize:24, textAlign:"center", height:70, color:"white", marginTop:10}} >
              دانشگاه علوم پزشکی کرمان
            </Text>
            <Text style={{fontFamily:"IRANSansMobile", fontSize:12, textAlign:"center", height:40, color:"white"}} >نسخه {this.showPersianNumber(VersionNumber.appVersion)} </Text>
          </Card>

          {this.state.loading
            ?
              <Spinner color='black'/>
            :
              <Card>
                <CardItem >
                  <HTMLView
                    style={{flex:1}}
                    value={this.state.abouttext}
                    onLinkPress={(url) => this.open(url)}
                    stylesheet={styles}
                  />
                </CardItem>
              </Card>
          }
          
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  a: {
    fontFamily: "IRANSansMobile",
    color: "blue"
  },
  p: {
    fontFamily: "IRANSansMobile",
    color: "black"
  },
  h1: {
    fontFamily: "IRANSansMobile_Bold",
    color: "black"
  },
});