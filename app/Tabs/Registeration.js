import React, { Component } from 'react';
import { Dimensions, StatusBar } from 'react-native';
import {inject, observer} from "mobx-react/native";
import { Container, Header, Title, Text, Content } from 'native-base';
import Timeline from 'react-native-timeline-listview'
const win = Dimensions.get('window');

@inject('store') @observer
export default class Registeration extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
	    return (
			<Container style={{backgroundColor:"white"}} >
				<StatusBar
					backgroundColor="#f0f0f0"
					barStyle="dark-content"
					translucent={false} />
				<Header androidStatusBarColor="#f0f0f0" iosBarStyle="dark-content" style={{backgroundColor:"#fafafa"}} >
						<Title style={{fontFamily: "IRANSansMobile_Bold", textAlign: 'center', textAlignVertical:"center", fontSize: 18, color:"black"}} >فرایند ثبت نام</Title>
				</Header>
				<Content style={{flex:1}}>
					{this.props.store.resigsterText &&
						<Text style={{fontFamily:"IRANSansMobile", color:"black", margin:8, fontSize:15}} >{this.props.store.resigsterText}</Text>
					}
					<Timeline
						data={this.props.store.resigterationData}
						circleSize={20}
						circleColor='black'
						lineColor='black'
						innerCircle={'dot'}
						columnFormat='single-column-right'
						timeContainerStyle={{minWidth:72, marginTop: -5}}
						timeStyle={{textAlign: 'center', backgroundColor:'#534E79', color:'white', padding:5, borderRadius:13, fontFamily: "IRANSansMobile_Bold", marginRight: 16, marginTop:6}}
						titleStyle={{fontWeight:'normal', fontFamily: "IRANSansMobile_Bold"}}
						descriptionStyle={{marginLeft: 32,color:'gray', fontFamily: "IRANSansMobile"}}
						options={{
							style:{paddingTop:16}
						}}
					/>
				</Content>
			</Container>
	  );
	}
}
