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
        <View style={{ flex: 2, margin: '7%', borderWidth: 4, borderColor: '#54819e', backgroundColor: '#b3f8f5' }}>

          <Image source={ gameObjects.desk.src } style={{ flex: 1, position: 'absolute', top: hp('12%'), right: wp('3%'), width: wp('75%'), height: hp('75%'), resizeMode: 'contain'}} />
          <Image source={ framePF } style={{ flex: 1, position: 'absolute', left: 450, bottom: 450, width: 125, height: 125, resizeMode: 'contain'}} />

          {this.state.khaze &&
          <Image source={ gameObjects.khaze.src } style={{ flex: 1, position: 'absolute', left: 230, bottom: 305, width: 75, height: 75, resizeMode: 'contain'}} />}
          {this.state.fish01 &&
          <Image source={ gameObjects.fish01.src } style={{ flex: 1, position: 'absolute', left: 210, bottom: 318, width: 70, height: 70, resizeMode: 'contain'}} />}
          <Image source={ gameObjects.tank.src } style={{ flex: 1, position: 'absolute', left: 200, bottom: 280, width: 120, height: 120, resizeMode: 'contain'}} />
          {this.state.books &&
          <Image source={ gameObjects.books.src } style={{ flex: 1, position: 'absolute', left: 300, bottom: 20, width: 110, height: 110, resizeMode: 'contain'}} />}
          {this.state.chair &&
          <Image source={ gameObjects.chair.src } style={{ flex: 1, position: 'absolute', right: 350, bottom: 25, width: 330, height: 330, resizeMode: 'contain'}} />}
          {this.state.komod &&
          <Image source={ gameObjects.komod.src } style={{ flex: 1, position: 'absolute', left: 445, bottom: 40, width: 180, height: 180, resizeMode: 'contain'}} />}
          {this.state.lamp &&
          <Image source={ gameObjects.lamp.src } style={{ flex: 1, position: 'absolute', left: 300, bottom: 280, width: 160, height: 160, resizeMode: 'contain'}} />}
          {this.state.pot &&
          <Image source={ gameObjects.pot.src } style={{ flex: 1, position: 'absolute', left: 110, bottom: 280, width: 90, height: 90, resizeMode: 'contain'}} />}

        </View>

        <View style={{width: wp('100%'), height: hp('20%'), backgroundColor: '#54819e'}}>
          <ScrollView horizontal={true}>

            <TouchableWithoutFeedback onPress={() => this.onPressItem('fish01')}>
              <View style={styles.itemView}>
                <Image source={ gameObjects.fish01.src } style={{ flex: 1, width: 240, height: 240, resizeMode: 'contain'}} />
                <Text style={styles.pointText}> {gameObjects.fish01.point} </Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => this.onPressItem('khaze')}>
              <View style={styles.itemView}>
                <Image source={ gameObjects.khaze.src } style={{ flex: 1, width: 240, height: 240, resizeMode: 'contain'}} />
                <Text style={styles.pointText}> {gameObjects.khaze.point} </Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => this.onPressItem('books')}>
              <View style={styles.itemView}>
                <Image source={ gameObjects.books.src } style={{ flex: 1, width: 240, height: 240, resizeMode: 'contain'}} />
                <Text style={styles.pointText}> {gameObjects.books.point} </Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => this.onPressItem('chair')}>
              <View style={styles.itemView}>
                <Image source={ gameObjects.chair.src } style={{ flex: 1, width: 240, height: 240, resizeMode: 'contain'}} />
                <Text style={styles.pointText}> {gameObjects.chair.point} </Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => this.onPressItem('komod')}>
              <View style={styles.itemView}>
                <Image source={ gameObjects.komod.src } style={{ flex: 1, width: 240, height: 240, resizeMode: 'contain'}} />
                <Text style={styles.pointText}> {gameObjects.komod.point} </Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => this.onPressItem('lamp')}>
              <View style={styles.itemView}>
                <Image source={ gameObjects.lamp.src } style={{ flex: 1, width: 240, height: 240, resizeMode: 'contain'}} />
                <Text style={styles.pointText}> {gameObjects.lamp.point} </Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => this.onPressItem('pot')}>
              <View style={styles.itemView}>
                <Image source={ gameObjects.pot.src } style={{ flex: 1, width: 240, height: 240, resizeMode: 'contain'}} />
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
  }
})
