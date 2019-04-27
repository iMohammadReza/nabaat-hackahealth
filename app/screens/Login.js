import React from 'react'
import PhoneInput from '../components/PhoneInput';
import VerificationInput from '../components/VerificationInput';
import ProfileInput from '../components/ProfileInput';

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stage: 0, // 0: entering the phoneNumber, 1: the verification code, 2: completing the profile, 3: the questions

        }
    }
    
    advanceToVerification() {
        this.setState({ stage: 1 });
    }

    advanceToProfile() {
        this.setState({ stage: 2 });
    }

    advanceToQuestions() {
        this.setState({ stage: 3 });
    }

    render() {
        let { stage } = this.state;
        if(stage == 0){
            return(
                <PhoneInput advanceToVerification={this.advanceToVerification} />
            );
        } else if(stage == 1){
            return(
                <VerificationInput advanceToProfile={this.advanceToProfile} />
            )
        } else if(stage == 2){
            return(
                <ProfileInput advanceToQuestions={this.advanceToQuestions} />
            )
        }
    }
}