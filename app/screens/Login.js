import React from 'react'
import PhoneInput from '../components/PhoneInput';
import VerificationInput from '../components/VerificationInput';
import ProfileInput from '../components/ProfileInput';
import QuestionsInput from '../components/QuestionsInput';

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mobile: null,
            q: null,
            stage: 3 // 0: entering the phoneNumber, 1: the verification code, 2: completing the profile, 3: bse, 4: the questions
        }
    }
    
    advanceToVerification(mobile) {
        this.setState({ stage: 1, mobile }, ()=>console.log(this.state));
    }

    advanceToProfile() {
        this.setState({ stage: 2 });
    }

    advanceToBSE(q) {
        this.setState({ stage: 3, q });
    }

    advanceToQuestions() {
        this.setState({ stage: 4});
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
                <ProfileInput advanceToBSE={(q)=>this.advanceToBSE(q)} />
            )
        } else if(stage == 3){
            return(
                <QuestionsInput advanceToQuestions={(q)=>this.advanceToQuestions(q)} />
            )
        } else if(stage == 4){
            return(
                <QuestionsInput  navigation={this.props.navigation}  q={this.state.q} />
            )
        }
    }
}