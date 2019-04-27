import {observable} from 'mobx'

class ObservableListStore {
  @observable webservice = "https://baharestan-imohammadrezaa.fandogh.cloud/api/appApi/v1"

  @observable isRegistering = true

  @observable resigsterText = null

  resigterationData = []

  @observable linkdunyGrid = []

  @observable communitiesList = []

  /* [{type:"separator", title:"انجمن ها"}, {type:"list", title:"تیتر", description:"توضیخ", image:"data:image/jpeg;base64,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"}, {type:"separator", title:"2"}, {type:"list", title:"11", description:"33"}, {type:"list", title:"11", description:"33"}, {type:"separator", title:"تشکل ها"}, {type:"list", title:"11", description:"33"}, {type:"list", title:"11", description:"33"}, {type:"list", title:"تیتر", description:"لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد.", image:"", url: "https://github.com/anarchicknight/react-native-communications"}] */

  @observable links = [{title: "سيستم اتوماسيون تغذيه", link:"http://jeton.kmu.ac.ir", icon:"food-fork-drink"}, {title: "انتخاب واحد و ثبت نمرات", link:"http://edu.kmu.ac.ir/SamaWeb/Login.aspx", icon:"calendar-edit"}, {title: "خدمات اینترنت", link:"http://account.kmu.ac.ir/IBSng/user/", icon:"web"}]

  @observable bus = null

  @observable update = null

  @observable modal_update_show = false

  @observable initRegion = {longitudeDelta: 0.11657986789941788, latitudeDelta: 0.15772479073662637, longitude: 57.07000410184264, latitude: 30.27973645418784}

  @observable pins = [{lat:30.288878, lng:57.063227, color:"red", text:""},{lat:30.256056, lng:57.082538, color:"red", text:""},{lat:30.279753, lng:57.070156, color:"red", text:""},{lat:30.243132, lng:57.110062, color:"red", text:""},{lat:30.291121, lng:57.025322, color:"red", text:""},{lat:30.276595, lng:57.078080, color:"red", text:""},{lat:30.263584, lng:57.085934, color:"red", text:""},{lat:30.288353, lng:57.067760, color:"red", text:""},{lat:30.257428, lng:57.098168, color:"red", text:""},{lat:30.254669, lng:57.097259, color:"red", text:""},{lat:30.290695, lng:57.027317, color:"red", text:""},{lat:30.243765, lng:57.107210, color:"red", text:""}]
}
const observableListStore = new ObservableListStore()
export default observableListStore