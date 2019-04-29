import React from 'react'
import {View, ScrollView, ImageBackground, Image, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {inject, observer} from 'mobx-react/native';

import desk from '../assets/game/desk.png';
import tank from '../assets/game/tank.png';
import fish01 from '../assets/game/fish01.png';
import khaze from '../assets/game/khaze.png';
import books from '../assets/game/books.png';
import chair from '../assets/game/chair.png';
import komod from '../assets/game/komod.png';
import lamp from '../assets/game/lamp.png';
import pot from '../assets/game/pot.png';
import framePF from '../assets/game/framePF.png';

import deskf from '../assets/game/desk_full.png';
import tankf from '../assets/game/tank_full.png';
import fish01f from '../assets/game/fish01_full.png';
import khazef from '../assets/game/khaze_full.png';
import booksf from '../assets/game/books_full.png';
import chairf from '../assets/game/chair_full.png';
import komodf from '../assets/game/komod_full.png';
import lampf from '../assets/game/lamp_full.png';
import potf from '../assets/game/pot_full.png';
import framePFf from '../assets/game/framePF_full.png';

const gameObjects = {
  desk: {src: deskf, point: 10},
  tank: {src: tankf, point: 20},
  fish01: {src: fish01f, point: 15},
  khaze: {src: khazef, point: 20},
  books: {src: booksf, point: 20},
  chair: {src: chairf, point: 20},
  komod: {src: komodf, point: 20},
  lamp: {src: lampf, point: 20},
  pot: {src: potf, point: 20},
}

@inject('store') @observer
export default class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fish01: this.props.store.DataStore.user.game[0],
      khaze: this.props.store.DataStore.user.game[1],
      books: this.props.store.DataStore.user.game[2],
      chair: this.props.store.DataStore.user.game[3],
      komod: this.props.store.DataStore.user.game[4],
      lamp: this.props.store.DataStore.user.game[5],
      pot: this.props.store.DataStore.user.game[6],
      point: this.props.store.DataStore.user.score,
    }
    this.onPressItem = this.onPressItem.bind(this);
    console.log("state", this.state)
  }

  updateTheGame=()=>{
    let data = "";
    if(this.state.fish01 != '0') data += '1'; else data += '0';
    if(this.state.khaze != '0') data += '1'; else data += '0';
    if(this.state.books != '0') data += '1'; else data += '0';
    if(this.state.chair != '0') data += '1'; else data += '0';
    if(this.state.komod != '0') data += '1'; else data += '0';
    if(this.state.lamp != '0') data += '1'; else data += '0';
    if(this.state.pot != '0') data += '1'; else data += '0';
    console.log(data, this.state.point)
    this.props.store.DataStore.updateGame(data,this.state.point);
  }

  onPressItem(item) {
    let {user} = this.props.store.DataStore;
    let {game} = user
    console.log(game[0] == '0' && user.score > gameObjects.fish01.point, game[0],user.score, gameObjects.fish01.point, game[0] == '0', user.score > gameObjects.fish01.point)

    switch(item) {
      case 'fish01':
        if(game[0] == '0' && user.score > gameObjects.fish01.point)
          this.setState({ fish01: '1', point: user.score - gameObjects.fish01.point }, ()=>this.updateTheGame());
        break;
      case 'khaze':
        if(game[1] == '0' && user.score > gameObjects.khaze.point)
          this.setState({ khaze: '1', point: user.score - gameObjects.khaze.point }, ()=>this.updateTheGame());
        break;
      case 'books':
        if(game[2] == '0' && user.score > gameObjects.books.point)
          this.setState({ books: '1', point: user.score - gameObjects.books.point }, ()=>this.updateTheGame());
        break;
      case 'chair':
        if(game[3] == '0' && user.score > gameObjects.chair.point)
          this.setState({ chair: '1', point: user.score - gameObjects.chair.point }, ()=>this.updateTheGame());
        break;
      case 'komod':
        if(game[4] == '0' && user.score > gameObjects.komod.point)
          this.setState({ komod: '1', point: user.score - gameObjects.komod.point }, ()=>this.updateTheGame());
        break;
      case 'lamp':
        if(game[5] == '0' && user.score > gameObjects.lamp.point)
          this.setState({ lamp: '1', point: user.score - gameObjects.lamp.point }, ()=>this.updateTheGame());
        break;
      case 'pot':
        if(game[6] == '0' && user.score > gameObjects.pot.point)
          this.setState({ pot: '1', point: user.score - gameObjects.pot.point }, ()=>this.updateTheGame());
        break;
    }
  }

  render() {
    return (
      <View style={{
        backgroundColor: '#b3f8f5',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
        <View style={{flex: 1, width:wp('90%'), height:wp('90%'), alignSelf:'center', margin: 20, borderWidth: 4, borderColor: '#54819e', backgroundColor: '#b3f8f5' }}>

          <Image source={ gameObjects.desk.src } style={styles.image} />
          <Image 
            source={ framePFf } 
            style={{
              flex: 1, 
              position: 'absolute', 
              top: hp('0%'), 
              right: wp('0%'), 
              width: wp('100%'), 
              height: wp('100%'), 
              resizeMode: 'contain'}}
            />

          {this.state.khaze != '0' &&
          <Image source={ gameObjects.khaze.src } style={styles.image} />}
          {this.state.fish01 != '0' &&
          <Image source={ gameObjects.fish01.src } style={styles.image} />}

          <Image source={ gameObjects.tank.src } style={styles.image} />
          
          {this.state.books != '0' &&
          <Image source={ gameObjects.books.src } style={styles.image} />}
          {this.state.chair != '0' &&
          <Image source={ gameObjects.chair.src } style={styles.image} />}
          {this.state.komod != '0' &&
          <Image source={ gameObjects.komod.src } style={styles.image} />}
          {this.state.lamp != '0' &&
          <Image source={ gameObjects.lamp.src } style={styles.image} />}
          {this.state.pot != '0' &&
          <Image source={ gameObjects.pot.src } style={styles.image} />}
        </View>

        <View style={{width: wp('100%'), height: hp('20%'), backgroundColor: '#54819e'}}>
          <ScrollView horizontal={true}>

            <TouchableWithoutFeedback onPress={() => this.onPressItem('fish01')}>
              <View style={styles.itemView}>
                <Image source={ fish01 } style={ styles.thumbnail } />
                <Text style={styles.pointText}> {gameObjects.fish01.point} </Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => this.onPressItem('khaze')}>
              <View style={styles.itemView}>
                <Image source={ khaze } style={ styles.thumbnail } />
                <Text style={styles.pointText}> {gameObjects.khaze.point} </Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => this.onPressItem('books')}>
              <View style={styles.itemView}>
                <Image source={ books } style={ styles.thumbnail } />
                <Text style={styles.pointText}> {gameObjects.books.point} </Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => this.onPressItem('chair')}>
              <View style={styles.itemView}>
                <Image source={ chair } style={ styles.thumbnail } />
                <Text style={styles.pointText}> { gameObjects.chair.point} </Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => this.onPressItem('komod')}>
              <View style={styles.itemView}>
                <Image source={ komod } style={ styles.thumbnail } />
                <Text style={styles.pointText}> {gameObjects.komod.point} </Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => this.onPressItem('lamp')}>
              <View style={styles.itemView}>
                <Image source={ lamp } style={ styles.thumbnail } />
                <Text style={styles.pointText}> {gameObjects.lamp.point} </Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => this.onPressItem('pot')}>
              <View style={styles.itemView}>
                <Image source={ pot } style={ styles.thumbnail } />
                <Text style={styles.pointText}> {gameObjects.pot.point} </Text>
              </View>
            </TouchableWithoutFeedback>

          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemView: {
    backgroundColor: '#b3f8f5',
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointText: {
    color: '#54819e', 
    fontFamily: "IRANSansMobile_Bold", 
    fontSize: 14
  },
  image: {
    flex: 1, 
    position: 'absolute', 
    top: hp('15%'), 
    left: wp('5%'), 
    width: wp('90%'), 
    height: wp('90%'), 
    resizeMode: 'contain'
  },
  thumbnail: {
    flex: 1,
    width: wp('50%'),
    height: hp('50%'),
    resizeMode: 'contain'
  }
})
