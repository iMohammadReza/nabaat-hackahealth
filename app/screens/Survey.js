import React, { Component } from 'react';
import SBESlider from '../components/SBESlider';

export default class Survey extends Component {
  render() {
    return(
      <SBESlider navigation={this.props.navigation} first={false}/>
    )
  }
}false