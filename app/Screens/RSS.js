import React, { Component } from 'react';
import { StatusBar, FlatList } from 'react-native';
import {inject, observer} from "mobx-react/native";
import {Container, Content, Header, Body, Button, Title, Icon, Text, ListItem, Spinner, View} from 'native-base';
import * as rssParser from 'react-native-rss-parser';
import {CustomTabs} from 'react-native-custom-tabs';

@inject('store') @observer
export default class RSS extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		};
	}

	open = url => {
		CustomTabs.openURL(url, {
			toolbarColor: 'white',
			enableUrlBarHiding: true,
			showPageTitle: true
		});
	}

	componentWillMount= () => {
		return fetch('http://news.kmu.ac.ir/App_Web/(Guest)/Feed/Generate/Default.aspx')
		.then((response) => response.text())
		.then((responseData) => rssParser.parse(responseData))
		.then((rss) => {
			this.setState({data: rss.items})
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
					<Body style={{alignItems:"flex-end"}} >
						<Title style={{fontFamily: "IRANSansMobile_Bold", textAlign: 'right', fontSize: 18, color:"black"}} >اخبار دانشگاه</Title>
					</Body>
					<Button transparent style={{right:-10, transform: [{ rotate: '180deg'},],}} onPress={() => this.props.navigation.goBack()}>
						<Icon name="arrow-round-back" style={{color:"black"}}  />
					</Button>
				</Header>
				<Content>
					{this.state.data.length>0
					?
						<FlatList
							contentContainerStyle={{justifyContent:"space-around", alignContent:"center"}}
							style={{marginBottom:64}}
							data={this.state.data}
							renderItem={item =>
								<ListItem noIndent> 
									<View style={{flex:1, flexDirection:"column", margin:8}} >
										<Text style={{fontFamily:"IRANSansMobile"}} >{item.item.title}</Text>
										<Text note style={{fontFamily:"IRANSansMobile"}} >{item.item.description}</Text>
										<Button transparent style={{alignSelf:"center"}} onPress={() => this.open(item.item.links[0].url)} >
											<Text style={{fontFamily:"IRANSansMobile"}} >ادامه...</Text>
										</Button>
									</View>
								</ListItem>
							}
						/>
					:
						<Spinner color='black'/>
					}
				</Content>
			</Container>
	  );
	}
}