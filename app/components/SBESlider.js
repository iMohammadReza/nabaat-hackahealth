import React, { Component } from 'react';
import { View, Text, Image, StatusBar, StyleSheet } from 'react-native';
import { Card, CardItem, Body, Container, Button } from 'native-base';
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import step1 from '../assets/learning/learn_step1.gif';
import step2 from '../assets/learning/learn_step2.gif';
import step3 from '../assets/learning/learn_step3.gif';
import step4 from '../assets/learning/learn_step4.gif';
import step5 from '../assets/learning/learn_step5.gif';

const steps = [
    {
      img: step1,
      text: "توی آینه نگاه کن و ببین چه خبره. دستات رو بالای سرت ببر و بعدش روی پهلوهات بذار."
    }, {
      img: step2,
      text: "بعد، همینطور که به آینه نگاه می کنی یک دستت رو بذار پشت سرت. حالا سه تا از انگشتات رو روی سینت بذار و ببین چیزی به نظرت عجیب و غیر طبیعی نمیاد."
    }, {
      img: step3,
      text: "سه تا انگشتت رو با فشار متفاوت به صورت دایره‌ای تکون بده. همینطور که دستت رو به منطقه‌ی بعدی می‌بری، به جای برداشتن دستت از روی سینه، فشار رو کم و متوسط و زیاد کن"
    }, {
      img: step4,
      text: "تمام سینه‌ها تا زیر بغل رو پوشش بده. هیچ جایی رو بررسی نشده باقی نذار. زمان بیشتری روی فرورفتگی‌ها ی جایی که سیستم لنفاویت، جایی که سرطان‌های سینه‌ی زیادی گسترش پیدا می‌کن، بذار. اونجاها ممکنه به ماساژهای دایره‌ای بیشتری نیاز داشته باشن."
    }, {
      img: step5,
      text: "در آخر، هر نوک سینه رو فشار بده. اگه هر ترشح یا دردی وجود داشت، حتما به دکتر مراجعه کن."
    }
  ]
export default class SBESlider extends Component {

  _renderItem ({item, index}) {
    return (
      <Card style={{borderRadius: 10, marginTop: 50}}>
        <CardItem cardBody style={{borderTopRightRadius: 10, borderTopLeftRadius: 10, overflow: 'hidden'}}>
            <Image source={ item.img } style={{borderRadius: 10, height: wp('75%'), width: null, flex: 1}}/>
        </CardItem>
        <CardItem style={{borderRadius: 10}}>
          <Body style={{alignItems: 'center'}}>
            {index == 0 && <Text style={styles.headerText}>مرحله اول</Text>}
            {index == 1 && <Text style={styles.headerText}>مرحله دوم</Text>}
            {index == 2 && <Text style={styles.headerText}>مرحله سوم</Text>}
            {index == 3 && <Text style={styles.headerText}>مرحله چهارم</Text>}
            {index == 4 && <Text style={styles.headerText}>مرحله پنجم</Text>}
            <Text style={styles.text}>{item.text}</Text>
          </Body>
        </CardItem>
        {index == 4 &&
          <CardItem style={{borderRadius: 10, justifyContent: 'center'}}>
            <View style={{alignItems: 'center', alignContent: 'center'}}>
              <Button style={{backgroundColor: '#ffffff', borderColor: '#ed8687', borderWidth: 3, justifyContent: 'center', width: wp('50%'), height: hp('7%') }} onPress={() => this.sendPhone()}>
                <Text style={{ fontFamily: "IRANSansMobile_Bold", fontSize: wp('60%') / hp('2.5%'), color: '#ed8687'}}>تماس با پزشک</Text>
              </Button>
            </View>
          </CardItem>}
      </Card>
    );
}

  render () {
      return (
        <Container>
                <LinearGradient
        colors={['#77b4db', '#da62b7']}
        style={{flex: 1}}
      >
          <StatusBar
            backgroundColor="#77b4db"
        barStyle="dark-content"
        translucent={false} />
          <Carousel
            ref={(c) => { this._carousel = c; }}
            data={steps}
            renderItem={this._renderItem}
            sliderWidth={400}
            itemWidth={ wp('75%')}
          />
          </LinearGradient>
        </Container>
      );
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily:"IRANSansMobile"
  },
  headerText: {
    textAlign: 'center',
    fontFamily:"IRANSansMobile_Bold"
  }
})