import React from 'react'
import PhoneInput from '../components/PhoneInput';
import VerificationInput from '../components/VerificationInput';
import ProfileInput from '../components/ProfileInput';

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mobile: null,
            stage: 0, // 0: entering the phoneNumber, 1: the verification code, 2: completing the profile, 3: the questions

        }
    }
    
    advanceToVerification(mobile) {
        this.setState({ stage: 1, mobile }, ()=>console.log(this.state));
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
                <PhoneInput advanceToVerification={(mobile)=>this.advanceToVerification(mobile)} />
            );
        } else if(stage == 1){
            return(
                <VerificationInput mobile={this.state.mobile} advanceToProfile={()=>this.advanceToProfile()} />
            )
        } else if(stage == 2){
            return(
                <ProfileInput advanceToQuestions={()=>this.advanceToQuestions()} />
            )
        }
    }
}