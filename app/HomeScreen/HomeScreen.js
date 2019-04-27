import React, { Component } from 'react';
import { View, Dimensions, TouchableOpacity } from 'react-native';
import {Text, Button} from 'native-base'
import {inject, observer} from "mobx-react/native";
import BottomNavigation, { FullTab } from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import communications from 'react-native-communications';

import Registeration from '../Tabs/Registeration'
import Map from '../Tabs/Map'
import Linkduny from '../Tabs/Linkduny'
import Communities from '../Tabs/Communities'
import More from '../Tabs/More'

const win = Dimensions.get('window');

@inject('store') @observer
export default class HomeScreen extends Component {
  constructor(props) {
		super(props);
	  this.state = {
    };
    if(this.props.store.isRegistering) {
      tabs = [
        {
          key: 'more',
          icon: 'dots-vertical',
          label: 'بیشتر',
          barColor: 'white',
          pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
          key: 'communities',
          icon: 'account-group',
          label: 'مجامع',
          barColor: 'white',
          pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
          key: 'linkduny',
          icon: 'view-dashboard',
          label: 'قاموس',
          barColor: 'white',
          pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
          key: 'map',
          icon: 'map',
          label: 'نقشه',
          barColor: 'white',
          pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
          key: 'registration',
          icon: 'account-check',
          label: 'فرایند ثبت نام',
          barColor: 'white',
          pressColor: 'rgba(255, 255, 255, 0.16)'
        }
      ]
    } else {
      tabs = [
        {
          key: 'more',
          icon: 'dots-vertical',
          label: 'بیشتر',
          barColor: 'white',
          pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
          key: 'communities',
          icon: 'account-group',
          label: 'قاموس',
          barColor: 'white',
          pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
          key: 'linkduny',
          icon: 'view-dashboard',
          label: 'قاموس',
          barColor: 'white',
          pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
          key: 'map',
          icon: 'map',
          label: 'نقشه',
          barColor: 'white',
          pressColor: 'rgba(255, 255, 255, 0.16)'
        }
      ]
    }
  }
  
  renderIcon = icon => ({ isActive }) => (
    <Icon size={20} color="black" name={icon} />
  )

  renderTab = ({tab, isActive}) => (
    <FullTab
      style={{marginLeft:-4, marginRight:-4}}
      isActive={isActive}
      key={tab.key}
      label={tab.label}
      labelStyle={{fontFamily: "IRANSansMobile", color:"black"}}
      renderIcon={this.renderIcon(tab.icon)}
    />
  )

  switchTabs = () => {
    if(this.state.activeTab!=null){
      switch (this.state.activeTab.key) {
        case "registration":
          return <Registeration  {...this.props}/>
        case "map":
          return <Map {...this.props}/>
        case "linkduny":
          return <Linkduny {...this.props}/>
        case "communities":
          return <Communities {...this.props}/>
        case "more":
          return <More {...this.props}/>
      }
    }
    else
      if(this.props.store.isRegistering) {
        return <Registeration {...this.props}/>
      } else {
        return <Linkduny {...this.props}/>
      }
      
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {this.switchTabs()}
        </View>
        <BottomNavigation
          onTabPress={activeTab => this.setState({ activeTab })}
          renderTab={this.renderTab}
          tabs={tabs}
        />
        {this.props.store.modal_update_show &&
          <View style={{position:"absolute", top:0, left:0, right:0, bottom: 0, backgroundColor:"transparent", zIndex:12, elevation:12, justifyContent:"center"}} >
              <TouchableOpacity activeOpacity={.7} style={{position:"absolute", top:0, left:0, right:0, bottom: 0, backgroundColor:"black", opacity:0.7, flex:1}} onPress={() => this.props.store.modal_update_show=this.props.store.update.must||false} />
              <View style={{backgroundColor: "white", borderRadius:10, margin:16}}>
                <Text style={{color:"black", fontSize:16, fontFamily: "IRANSansMobile", textAlignVertical:"center", textAlign:"center", margin:14}}>این برنامه از هر زمانی بهتر شده است.</Text>
                <Text style={{color:"black", fontSize:16, fontFamily: "IRANSansMobile", textAlignVertical:"center", textAlign:"center", margin:14}}>{this.props.store.update.text}</Text>
                <View style={{flexDirection: 'row', height:50}}>
                  {!this.props.store.update.must
                    ?
                      <View style={{flex:1, height:50, flexDirection:"row"}}>
                        <Button full style={{flex: 1, height:50, borderBottomLeftRadius: 10, backgroundColor:"#BDBDBD"}}  onPress={() => {this.props.store.modal_update_show=false}}>
                          <Text  style={{color:"black", fontFamily: "IRANSansMobile"}}>بعدا</Text>
                        </Button>
                        <Button full style={{flex: 4, height:50, borderBottomRightRadius:10, backgroundColor:"#7359a6"}} onPress={() => {communications.web(this.props.store.update.link)}}>
                          <Text  style={{color:"white", textAlignVertical:"center", fontSize:18, fontFamily: "IRANSansMobile"}}>بروزرسانی
                          </Text>
                        </Button>
                      </View>
                    :
                      <Button full style={{flex: 4, height:50, borderBottomRightRadius:10, borderBottomLeftRadius:10, backgroundColor:"#7359a6"}} onPress={() => {communications.web(this.props.store.update.link)}}>
                        <Text  style={{color:"white", textAlignVertical:"center", fontSize:18, fontFamily: "IRANSansMobile"}}>بروزرسانی
                        </Text>
                      </Button>
                  }
                </View>
              </View>
            </View>
          }
      </View>
    );
  }
}
