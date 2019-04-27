import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, TouchableOpacity, FlatList, Dimensions, Image } from 'react-native';
import {inject, observer} from "mobx-react/native";
import {Container, Content, Header, Title, Text, Spinner, Body, Button, Icon, ListItem} from 'native-base';
import GridView from 'react-native-super-grid';
import {CustomTabs} from 'react-native-custom-tabs';
import AutoHeightImage from 'react-native-auto-height-image';
import FastImage from 'react-native-fast-image'

const win = Dimensions.get('window');

@inject('store') @observer
export default class Linkduny extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			section: null,
			data: null,
			loading: true
		};
	}

	open = url => {
		CustomTabs.openURL(url, {
			toolbarColor: 'white',
			enableUrlBarHiding: true,
			showPageTitle: true
		});
	}

	inside = (section, title) => {
		this.setState({section, loading: true, title})
		let req = this.props.store.webservice+"/linkduny?id="+section
		fetch(req)
		.then((response) => response.json())
		.then((responseJson) => {
			this.setState({loading: false, data: responseJson})
		})
		.catch((error) => {
			this.setState({loading: false})
			ToastAndroid.show("خطا در اتصال", ToastAndroid.SHORT)
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
						<Title style={{fontFamily: "IRANSansMobile_Bold", textAlign: 'center', textAlignVertical:"center", fontSize: 18, color:"black"}} >قاموس</Title>
					</Header>
				:
					<Header androidStatusBarColor="#f0f0f0" iosBarStyle="dark-content" style={{backgroundColor:"#fafafa"}} >
						<Body style={{alignItems:"flex-end"}} >
							<Title style={{fontFamily: "IRANSansMobile_Bold", textAlign: 'right', fontSize: 18, color:"black"}} >{this.state.title}</Title>
						</Body>
						<Button transparent style={{right:-10, transform: [{ rotate: '180deg'},],}} onPress={() => this.setState({section: null})}>
							<Icon name="arrow-round-back" style={{color:"black"}}  />
						</Button>
					</Header>
				}
				<Content>
					{this.state.section==null
					?
						<GridView
							itemDimension={130}
							items={this.props.store.linkdunyGrid}
							style={styles.gridView}
							renderItem={item => (
								<TouchableOpacity style={styles.itemContainer} onPress={() => this.inside(item.id, item.title)} >
									<Image source={{uri: item.image}} resizeMethod="resize" style={{position:"absolute", top:2, left:2, right:2, bottom:2, borderRadius: 5}}/>
									{/* <FastImage
										// resizeMethod={FastImage.resizeMode.resize}
										style={{position:"absolute", top:2, left:2, right:2, bottom:2, borderRadius: 5}}
										source={{
										uri: item.image
										}}
										resizeMode={FastImage.resizeMode.contain}
									/> */}
									<Text style={{fontSize: 16, color: item.color, backgroundColor:"#80808088", fontFamily:"IRANSansMobile_Bold", padding:4, paddingRight:16, borderBottomLeftRadius:5, borderBottomRightRadius:5}}>{item.title}</Text>
								</TouchableOpacity>
							)}
						/>
					:
						this.state.loading
						?
							<Spinner color='black'/>
						:
							this.state.data.length>0
							?
								<FlatList
									contentContainerStyle={{justifyContent:"space-around", alignContent:"center"}}
									style={{marginBottom:64}}
									data={this.state.data}
									renderItem={item =>
										<ListItem noIndent> 
											<View style={{flex:1, flexDirection:"column", margin:8}} >
												{item.item.title!=null &&
													<View style={{flex:1, flexDirection:"row", marginBottom:8}} >
														<Text style={{flex:1, fontFamily:"IRANSansMobile", textAlign:"right"}} >{item.item.title}</Text>
													</View>
												}

												{item.item.text!=null &&
													<View style={{flex:1, flexDirection:"row"}} >
														<Text note style={{flex:1, fontFamily:"IRANSansMobile", textAlign:"right"}} >{item.item.text}</Text>
													</View>
												}
												
												{item.item.photo!=null &&
													<View style={{flex:1, flexDirection:"row", marginTop:16, marginBottom:16}} >
														<AutoHeightImage
															width={win.width-48}
															source={{uri:item.item.photo}}
														/>
													</View>
													
												}
												
												{item.item.link!=null &&
													<Button transparent style={{alignSelf:"center"}} onPress={() => this.open(item.item.link)} >
														<Text style={{fontFamily:"IRANSansMobile"}} >{item.item.linkText}</Text>
													</Button>
												}

												{item.item.date!=null &&
													<View style={{flex:1, flexDirection:"row"}} >
														<Text style={{flex:1, fontFamily:"IRANSansMobile", textAlign:"right", flex:1, fontSize:12}} >{item.item.date}</Text>
													</View>
												}
											</View>
										</ListItem>
									}
								/>
								:
								<Text style={{flex:1, textAlign: "center", fontFamily: "IRANSansMobile", margin: 4, marginTop:32}} >متاسفانه چیزی در قاموس برای شما پیدا نکردیم :(</Text>
					}
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	gridView: {
	  paddingTop: 25,
		flex: 1,
		backgroundColor:"white"
	},
	itemContainer: {
	  justifyContent: 'flex-end',
		borderRadius: 5,
		elevation:2,
	  height: 150,
	},
	itemCode: {
	  fontWeight: '600',
	  fontSize: 12,
	  color: '#fff',
	},
  });