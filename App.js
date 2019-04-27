import React, { Component } from "react";
import HomeScreen from "./app/HomeScreen/index";
import Push from 'appcenter-push';
import {AppState} from 'react-native'
import communications from "react-native-communications";

export default class baharestan extends Component {
  render() {
    return (
      <HomeScreen />
    );
  }
}

Push.setListener({
  onPushNotificationReceived: function (pushNotification) {
    console.log(pushNotification.message)
    let message = pushNotification.message;
    let title = pushNotification.title;

    if (message === null || message === undefined) {
      // Android messages received in the background don't include a message. On Android, that fact can be used to
      // check if the message was received in the background or foreground. For iOS the message is always present.
      title = 'پیام';
      message = '';
    }

    if (AppState.currentState === 'active') {
      //alert, web, telegram, cafebazaar, cafebazaarRate
      if (pushNotification.customProperties && Object.keys(pushNotification.customProperties).length > 0) {
        switch (pushNotification.customProperties.type) {
          case "alert":
            title = pushNotification.customProperties.title;
            message += pushNotification.customProperties.data;
            Alert.alert(title, message);
            break;
          case "web":
            communications.web(pushNotification.customProperties.data)
          default:
            break;
        }
      }
    }
    else {
      // Sometimes the push callback is received shortly before the app is fully active in the foreground.
      // In this case you'll want to save off the notification info and wait until the app is fully shown
      // in the foreground before displaying any UI. You could use AppState.addEventListener to be notified
      // when the app is fully in the foreground.
    }
  }
});