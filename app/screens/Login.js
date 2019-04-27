import React from 'react'
import PhoneInput from '../components/PhoneInput';

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stage: 0, // 0: entering the phoneNumber, 1: the verification code, 2: completing the profile, 3: the questions

        }
    }
     render() {
        return (
          <PhoneInput />
        );
     }
}