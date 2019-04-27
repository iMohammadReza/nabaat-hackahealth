import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import {Container, Content, Header, View, Thumbnail, Button, Title, Separator, Text, ListItem, Body, Icon} from 'native-base'
import {inject, observer} from "mobx-react/native";
import {CustomTabs} from 'react-native-custom-tabs';

@inject('store') @observer
export default class Communities extends Component {
	constructor(props) {
		super(props);
		this.state = {
			section: null
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
				{this.state.section==null
				?
					<Header androidStatusBarColor="#f0f0f0" iosBarStyle="dark-content" style={{backgroundColor:"#fafafa"}} >
						<Title style={{fontFamily: "IRANSansMobile_Bold", textAlign: 'center', textAlignVertical:"center", fontSize: 18, color:"black"}} >مجامع</Title>
					</Header>
				:
					<Header androidStatusBarColor="#f0f0f0" iosBarStyle="dark-content" style={{backgroundColor:"#fafafa"}} >
						<Body style={{alignItems:"flex-end"}} >
							<Title style={{fontFamily: "IRANSansMobile_Bold", textAlign: 'right', fontSize: 18, color:"black"}} >{this.state.section.title}</Title>
						</Body>
						<Button transparent style={{right:-10, transform: [{ rotate: '180deg'},],}} onPress={() => this.setState({section: null})}>
							<Icon name="arrow-round-back" style={{color:"black"}}  />
						</Button>
					</Header>
				}
				<Content>
					{this.state.section==null
					?
						this.props.store.communitiesList.map(item => {
							if(item.type=="separator"){
								return	<Separator bordered style={{height:48}} >
											<Text style={{margin:16, fontSize:20, fontFamily:"IRANSansMobile_Bold"}} >{item.title}</Text>
										</Separator>
							} else if (item.type=="list"){
								return	<ListItem noIndent >
											<Button transparent style={{alignSelf:"center"}} onPress={() => this.setState({section: item})} >
												<Text style={{fontFamily:"IRANSansMobile"}} >بیشتر</Text>
											</Button>
											<View style={{flex:1, flexDirection:"column", margin:16}} >
												<Text style={{fontFamily:"IRANSansMobile"}} >{item.title}</Text>
											</View>
											<Thumbnail source={{ uri: item.image }} />
										</ListItem>
							}
						})
					:
							<View>
								<View style={{flex:1, alignItems:"center", margin:16, marginBottom:8}} >
									<Thumbnail large source={{ uri: this.state.section.image }} />
								</View>
								<View style={{flex:1, flexDirection:"column", margin:16}} >
									{this.state.section.url &&
										<Button transparent style={{alignSelf:"center"}} onPress={() => this.open(this.state.section.url)} >
											<Text style={{fontFamily:"IRANSansMobile"}} >پایگاه</Text>
										</Button>
									}
									<Text style={{fontFamily:"IRANSansMobile", fontSize:15, color:"greys"}} >{this.state.section.description}</Text>
								</View>
							</View>
					}
				</Content>
			</Container>
		);
	}
}