import React from 'react'
import {View, ScrollView, ImageBackground, Image, Text} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import desk from '../assets/game/desk.png';
import tank from '../assets/game/tank.png';
import fish01 from '../assets/game/fish01.png';
import khaze from '../assets/game/khaze.png';
import books from '../assets/game/books.png';
import chair from '../assets/game/chair.png';
import komod from '../assets/game/komod.png';
import lamp from '../assets/game/lamp.png';
import pot from '../assets/game/pot.png';

const gameObjects = {
  desk: {src: desk, point: 10},
  tank: {src: tank, point: 20},
  fish01: {src: fish01, point: 15},
  khaze: {src: khaze, point: 20},
  books: {src: books, point: 20},
  chair: {src: chair, point: 20},
  komod: {src: komod, point: 20},
  lamp: {src: lamp, point: 20},
  pot: {src: pot, point: 20},
}

export default class Game extends React.Component {
     render() {
        return (
          <View style={{
            backgroundColor: '#ffffff',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}>
            <View style={{ flex: 2, margin: '7%', borderWidth: 4, borderColor: '#ed8687', backgroundColor: '#ffffff' }}>

            </View>
            <View style={{width: wp('100%'), height: hp('20%'), backgroundColor: '#ed8687'}}>
              <ScrollView horizontal={true}>
                <View style={{backgroundColor: '#ffffff', paddingTop: 10, paddingBottom: 10, marginTop: 20, marginBottom: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={ gameObjects.desk.src } style={{ flex: 1, width: 240, height: 240, resizeMode: 'contain'}} />
                  <Text style={{color: '#ed8687', fontFamily: "IRANSansMobile_Bold", fontSize: 20 }}> {gameObjects.desk.point} </Text>
                </View>
                <View style={{backgroundColor: '#ffffff', paddingTop: 10, paddingBottom: 10,marginTop: 20, marginBottom: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={ gameObjects.tank.src } style={{ flex: 1, width: 240, height: 240, resizeMode: 'contain'}} />
                  <Text style={{color: '#ed8687', fontFamily: "IRANSansMobile_Bold", fontSize: 20 }}> {gameObjects.tank.point} </Text>
                </View>
                <View style={{backgroundColor: '#ffffff', paddingTop: 10, paddingBottom: 10,marginTop: 20, marginBottom: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={ gameObjects.fish01.src } style={{ flex: 1, width: 240, height: 240, resizeMode: 'contain'}} />
                  <Text style={{color: '#ed8687', fontFamily: "IRANSansMobile_Bold", fontSize: 20 }}> {gameObjects.fish01.point} </Text>
                </View>
                <View style={{backgroundColor: '#ffffff', paddingTop: 10, paddingBottom: 10,marginTop: 20, marginBottom: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={ gameObjects.khaze.src } style={{ flex: 1, width: 240, height: 240, resizeMode: 'contain'}} />
                  <Text style={{color: '#ed8687', fontFamily: "IRANSansMobile_Bold", fontSize: 20 }}> {gameObjects.khaze.point} </Text>
                </View>
                <View style={{backgroundColor: '#ffffff', paddingTop: 10, paddingBottom: 10,marginTop: 20, marginBottom: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={ gameObjects.books.src } style={{ flex: 1, width: 240, height: 240, resizeMode: 'contain'}} />
                  <Text style={{color: '#ed8687', fontFamily: "IRANSansMobile_Bold", fontSize: 20 }}> {gameObjects.books.point} </Text>
                </View>
                <View style={{backgroundColor: '#ffffff', paddingTop: 10, paddingBottom: 10,marginTop: 20, marginBottom: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={ gameObjects.chair.src } style={{ flex: 1, width: 240, height: 240, resizeMode: 'contain'}} />
                  <Text style={{color: '#ed8687', fontFamily: "IRANSansMobile_Bold", fontSize: 20 }}> {gameObjects.chair.point} </Text>
                </View>
                <View style={{backgroundColor: '#ffffff', paddingTop: 10, paddingBottom: 10,marginTop: 20, marginBottom: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={ gameObjects.komod.src } style={{ flex: 1, width: 240, height: 240, resizeMode: 'contain'}} />
                  <Text style={{color: '#ed8687', fontFamily: "IRANSansMobile_Bold", fontSize: 20 }}> {gameObjects.komod.point} </Text>
                </View>
                <View style={{backgroundColor: '#ffffff', paddingTop: 10, paddingBottom: 10,marginTop: 20, marginBottom: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={ gameObjects.lamp.src } style={{ flex: 1, width: 240, height: 240, resizeMode: 'contain'}} />
                  <Text style={{color: '#ed8687', fontFamily: "IRANSansMobile_Bold", fontSize: 20 }}> {gameObjects.lamp.point} </Text>
                </View>
                <View style={{backgroundColor: '#ffffff', paddingTop: 10, paddingBottom: 10,marginTop: 20, marginBottom: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={ gameObjects.pot.src } style={{ flex: 1, width: 240, height: 240, resizeMode: 'contain'}} />
                  <Text style={{color: '#ed8687', fontFamily: "IRANSansMobile_Bold", fontSize: 20 }}> {gameObjects.pot.point} </Text>
                </View>
              </ScrollView>
            </View>
          </View>
        );
     }
}