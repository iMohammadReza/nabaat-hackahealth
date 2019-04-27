import React, { Component } from 'react';
import { StatusBar, View, Image } from 'react-native';
import {inject, observer} from "mobx-react/native";
import MapView, {Marker} from 'react-native-maps';



@inject('store') @observer
export default class Map extends Component {
	constructor(props) {
		super(props);
	}
	
	renderMarkers(marker) {
		switch(marker.type) {
			case 'book':
				return 	<MapView.Marker
							coordinate={{latitude: marker.lat, longitude: marker.lng}}
							key={marker.lat}>
							<View style={{alignItems:"center"}} >
								<Image source={require('../assets/images/book.png')} style={{height:40, width:40}}/>
							</View>
						</MapView.Marker>
			case 'car':
				return 	<MapView.Marker
							coordinate={{latitude: marker.lat, longitude: marker.lng}}
							key={marker.lat}>
							<View style={{alignItems:"center"}} >
								<Image source={require('../assets/images/car.png')} style={{height:40, width:40}}/>
							</View>
						</MapView.Marker>
			case 'd':
				return 	<MapView.Marker
							coordinate={{latitude: marker.lat, longitude: marker.lng}}
							key={marker.lat}>
							<View style={{alignItems:"center"}} >
								<Image source={require('../assets/images/d.png')} style={{height:40, width:40}}/>
							</View>
						</MapView.Marker>
			case 'h':
				return 	<MapView.Marker
							coordinate={{latitude: marker.lat, longitude: marker.lng}}
							key={marker.lat}>
							<View style={{alignItems:"center"}} >
								<Image source={require('../assets/images/h.png')} style={{height:40, width:40}}/>
							</View>
						</MapView.Marker>
			case 'home':
				return 	<MapView.Marker
							coordinate={{latitude: marker.lat, longitude: marker.lng}}
							key={marker.lat}>
							<View style={{alignItems:"center"}} >
								<Image source={require('../assets/images/home.png')} style={{height:40, width:40}}/>
							</View>
						</MapView.Marker>
			case 'speichoo':
				return 	<MapView.Marker
							coordinate={{latitude: marker.lat, longitude: marker.lng}}
							key={marker.lat}>
							<View style={{alignItems:"center"}} >
								<Image source={require('../assets/images/speichoo.png')} style={{height:40, width:40}}/>
							</View>
						</MapView.Marker>
			case 'spoon':
				return 	<MapView.Marker
							coordinate={{latitude: marker.lat, longitude: marker.lng}}
							key={marker.lat}>
							<View style={{alignItems:"center"}} >
								<Image source={require('../assets/images/spoon.png')} style={{height:40, width:40}}/>
							</View>
						</MapView.Marker>
			case 'star':
				return 	<MapView.Marker
							coordinate={{latitude: marker.lat, longitude: marker.lng}}
							key={marker.lat}>
							<View style={{alignItems:"center"}} >
								<Image source={require('../assets/images/star.png')} style={{height:40, width:40}}/>
							</View>
						</MapView.Marker>
			case 'tea':
				return 	<MapView.Marker
							coordinate={{latitude: marker.lat, longitude: marker.lng}}
							key={marker.lat}>
							<View style={{alignItems:"center"}} >
								<Image source={require('../assets/images/tea.png')} style={{height:40, width:40}}/>
							</View>
						</MapView.Marker>
			case 'uni':
				return 	<MapView.Marker
							coordinate={{latitude: marker.lat, longitude: marker.lng}}
							key={marker.lat}>
							<View style={{alignItems:"center"}} >
								<Image source={require('../assets/images/uni.png')} style={{height:40, width:40}}/>
							</View>
						</MapView.Marker>
			default:
				return 	<Marker
							coordinate={{latitude: marker.lat, longitude: marker.lng}}
							title={marker.text}
							pinColor={marker.color}
						/>
		}
	}

	render() {
	    return (
			<MapView
				style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
				// onRegionChange={reg => console.log(reg)}
				initialRegion={this.props.store.initRegion}
			>
				<StatusBar
					backgroundColor="transparent"
					barStyle="dark-content"
					translucent={true} />
				{this.props.store.pins.map(marker => this.renderMarkers(marker))}
			</MapView>
		);
	}
}