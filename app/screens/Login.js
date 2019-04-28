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
            q: {
                "id": 1,
                "title": "آیا سرطان شما تشخیص داده شده است؟",
                "options": [
                    {
                        "text": "بله",
                        "qid": 1
                    },
                    {
                        "text": "خیر!",
                        "qid": 2
                    }
                ],
                "fvalue": 0
            },
            stage: 3 // 0: entering the phoneNumber, 1: the verification code, 2: completing the profile, 3: the questions

        }
    }
    
    advanceToVerification(mobile) {
        this.setState({ stage: 1, mobile }, ()=>console.log(this.state));
    }

    advanceToProfile() {
        this.setState({ stage: 2 });
    }

    advanceToQuestions(q) {
        this.setState({ stage: 3, q });
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
                <ProfileInput advanceToQuestions={(q)=>this.advanceToQuestions(q)} />
            )
        } else if(stage == 3){
            return(
                <QuestionsInput q={this.state.q} />
            )
        }
    }
}