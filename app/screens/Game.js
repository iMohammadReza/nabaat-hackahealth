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
      fish01: this.props.store.DataStore.game.fish01,
      khaze: this.props.store.DataStore.game.khaze,
      books: this.props.store.DataStore.game.books,
      chair: this.props.store.DataStore.game.chair,
      komod: this.props.store.DataStore.game.komod,
      lamp: this.props.store.DataStore.game.lamp,
      pot: this.props.store.DataStore.game.pot,
      point: this.props.store.DataStore.user.point,
    }
    this.onPressItem = this.onPressItem.bind(this);
  }
  
  onPressItem(item) {
    let { game, user } = this.props.store.DataStore;
    let { point } = user;
    switch(item) {
      case 'fish01':
        if(!game.fish01 && user.point > gameObjects.fish01.point){
          this.setState({ fish01: true, point: point - gameObjects.fish01.point });
          this.props.store.DataStore.updateGame({
            value: {
              fish01: this.state.fish01,
              khaze: this.state.khaze,
              books: this.state.books,
              chair: this.state.chair,
              komod: this.state.komod,
              lamp: this.state.lamp,
              pot: this.state.pot,
            },
            point: this.state.point
          });
        }
        break;
      case 'khaze':
        if(!game.khaze && user.point > gameObjects.khaze.point)
          this.setState({ khaze: true, point: point - gameObjects.khaze.point});
          this.props.store.DataStore.updateGame({
            value: {
              fish01: this.state.fish01,
              khaze: this.state.khaze,
              books: this.state.books,
              chair: this.state.chair,
              komod: this.state.komod,
              lamp: this.state.lamp,
              pot: this.state.pot,
            },
            point: this.state.point
          });
        break;
      case 'books':
        if(!game.books && user.point > gameObjects.books.point)
          this.setState({ books: true, point: point - gameObjects.books.point });
          this.props.store.DataStore.updateGame({
            value: {
              fish01: this.state.fish01,
              khaze: this.state.khaze,
              books: this.state.books,
              chair: this.state.chair,
              komod: this.state.komod,
              lamp: this.state.lamp,
              pot: this.state.pot,
            },
            point: this.state.point
          });
        break;
      case 'chair':
        if(!game.chair && user.point > gameObjects.chair.point)
          this.setState({ chair: true, point: point - gameObjects.chair.point });
          this.props.store.DataStore.updateGame({
            value: {
              fish01: this.state.fish01,
              khaze: this.state.khaze,
              books: this.state.books,
              chair: this.state.chair,
              komod: this.state.komod,
              lamp: this.state.lamp,
              pot: this.state.pot,
            },
            point: this.state.point
          });
        break;
      case 'komod':
        if(!game.komod && user.point > gameObjects.komod.point)
          this.setState({ komod: true, point: point - gameObjects.komod.point });
          this.props.store.DataStore.updateGame({
            value: {
              fish01: this.state.fish01,
              khaze: this.state.khaze,
              books: this.state.books,
              chair: this.state.chair,
              komod: this.state.komod,
              lamp: this.state.lamp,
              pot: this.state.pot,
            },
            point: this.state.point
          });
        break;
      case 'lamp':
        if(!game.lamp && user.point > gameObjects.lamp.point)
          this.setState({ lamp: true, point: point - gameObjects.lamp.point });
          this.props.store.DataStore.updateGame({
            value: {
              fish01: this.state.fish01,
              khaze: this.state.khaze,
              books: this.state.books,
              chair: this.state.chair,
              komod: this.state.komod,
              lamp: this.state.lamp,
              pot: this.state.pot,
            },
            point: this.state.point
          });
        break;
      case 'pot':
        if(!game.pot && user.point > gameObjects.pot.point)
          this.setState({ pot: true, point: point - gameObjects.pot.point });
          this.props.store.DataStore.updateGame({
            value: {
              fish01: this.state.fish01,
              khaze: this.state.khaze,
              books: this.state.books,
              chair: this.state.chair,
              komod: this.state.komod,
              lamp: this.state.lamp,
              pot: this.state.pot,
            },
            point: this.state.point
          });
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
        <View style={{position: 'absolute', top: 0, width:wp('90%'), height:wp('90%'), alignSelf:'center', margin: 20, borderWidth: 4, borderColor: '#54819e', backgroundColor: '#b3f8f5' }}>

          <Image source={ gameObjects.desk.src } style={styles.image} />
          <Image source={ framePFf } style={styles.image} />

          {this.state.khaze &&
          <Image source={ gameObjects.khaze.src } style={styles.image} />}
          {this.state.fish01 &&
          <Image source={ gameObjects.fish01.src } style={styles.image} />}

          <Image source={ gameObjects.tank.src } style={styles.image} />
          
          {this.state.books &&
          <Image source={ gameObjects.books.src } style={styles.image} />}
          {this.state.chair &&
          <Image source={ gameObjects.chair.src } style={styles.image} />}
          {this.state.komod &&
          <Image source={ gameObjects.komod.src } style={styles.image} />}
          {this.state.lamp &&
          <Image source={ gameObjects.lamp.src } style={styles.image} />}
          {this.state.pot &&
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
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointText: {
    color: '#54819e', 
    fontFamily: "IRANSansMobile_Bold", 
    fontSize: 20 
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
    width: wp('10%'),
    height: wp('10%'),
    resizeMode: 'contain'
  }
})
