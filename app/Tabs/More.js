import React, { Component } from 'react';
import { StatusBar, ToastAndroid } from 'react-native';
import {inject, observer} from "mobx-react/native";
import {Container, Content, Header, Title, Text, ListItem} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CustomTabs} from 'react-native-custom-tabs';

@inject('store') @observer
export default class More extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	open = url => {
		CustomTabs.openURL(url, {
			toolbarColor: 'white',
			enableUrlBarHiding: true,
			showPageTitle: true
		});
	}

	render() {
	    return (
			<Container style={{backgroundColor:"white"}} >
				<StatusBar
					backgroundColor="#f0f0f0"
					barStyle="dark-content"
					translucent={false} />
				<Header androidStatusBarColor="#f0f0f0" iosBarStyle="dark-content" style={{backgroundColor:"#fafafa"}} >
						<Title style={{fontFamily: "IRANSansMobile_Bold", textAlign: 'center', textAlignVertical:"center", fontSize: 18, color:"black"}} >بیشتر</Title>
				</Header>
				<Content>
					<ListItem noIndent style={{height:56}} onPress={() => ToastAndroid.showWithGravity("به زودی...", ToastAndroid.SHORT, ToastAndroid.CENTER) } >
						<Text  style={{flex:1, fontSize:16, fontFamily:"IRANSansMobile", textAlign:"right", textAlignVertical:"center", marginRight:16}} >سرویس دانشگاه</Text>
						<Icon size={24} color="black" name="bus" />
					</ListItem>
					<ListItem noIndent style={{height:56}} onPress={() => this.props.navigation.navigate("RSS")} >
						<Text style={{flex:1, fontSize:16, fontFamily:"IRANSansMobile", textAlign:"right", textAlignVertical:"center", marginRight:16}} >اخبار دانشگاه</Text>
						<Icon size={24} color="black" name="rss-box" />
					</ListItem>
					{this.props.store.links.map(item => {
						return	<ListItem noIndent style={{height:56}} onPress={() => this.open(item.link)} >
									<Text  style={{flex:1, fontSize:16, fontFamily:"IRANSansMobile", textAlign:"right", textAlignVertical:"center", marginRight:16}} >{item.title}</Text>
									<Icon size={24} color="black" name={item.icon} />
								</ListItem>
					})}
					<ListItem noIndent style={{height:56}} onPress={() => this.props.navigation.navigate("About")} >
						<Text style={{flex:1, fontSize:16, fontFamily:"IRANSansMobile", textAlign:"right", textAlignVertical:"center", marginRight:16}} >درباره ما</Text>
						<Icon size={24} color="black" name="information-outline" />
					</ListItem>
				</Content>
			</Container>
	  );
	}
}
