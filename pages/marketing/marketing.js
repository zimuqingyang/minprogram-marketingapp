// pages/marketing/marketing.js
var cityData = require('../../utils/city.js');
var util = require('../../utils/util.js');



// 预定义的 item 数据类
function Item(img, name, time,sub_title,content) {
  this.img = img;
  this.name = name;
  this.time = time;
  this.sub_title = sub_title;
  this.content = content;

}
// 测试，预生成数组， item
function createListDatas() {
  var list = [];
  for (var i = 0; i < 10; i++) {
    var d = util.formatTime(new Date);
    
    var item = new Item("/asdas.png", "河马" + i + "号店", d,"[每日河马一会儿]","尊敬的vip顾客，西凤上金銮，百鸟看过来，本店全场8折优惠。全场满998，送充气娃娃一个！回T退订。");
   
    list.push(item)
  }

  return list;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {

    isLoaded: false,
    isDisposed: false,
    navigation_title: "门店",
    is_back: false,
    content: [],
    class_total_cm: [],
    class_total_cm_rate: [],
    qyopen: false,
    qyshow: false,
    nzopen: false,
    pxopen: false,
    nzshow: false,
    pxshow: false,
    isfull: false,
    cityleft: cityData.getCity(),
    citycenter: {},
    cityright: {},
    select1: '',
    select2: '',
    select3: "",
    qr_total_cm_class: "",
    qr_total_cm_rate_class: "",
    shownavindex: '',
    outletLists: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      class_total_cm: ['最近一周', '最近一月', '最近一年'],
      class_total_cm_rate: ['默认排序', '状态1：已创建', '状态2：已发送','状态3：未发送'],
    })
    console.info("list数据为")

    var lists = createListDatas()
    this.setData({
      outletLists: lists,
    })

    console.info("打印list")
    console.info(this.data.outletLists)
  },

  btn_new_marketing:function(){
    //todo 新建营销事件
    wx.navigateTo({
      url: '/pages/marketing/historymarket/historymarket',
    })
  },

  select_area: function (event) {
    //toto 选中具体的区、县
    var select_area = event.currentTarget.dataset.area;
    console.info("选择的区域是：" + select_area);
    this.setData({
      select3: select_area,
    })
  },
  select_total_cm: function (e) {
    //todo  选中 到店客流量
    var select_total_cm = e.currentTarget.dataset.totalcm
    console.log("选择的到店客流量维度是：" + select_total_cm)
    //qr_total_cm_class 解释：三种到店客流量
    this.setData({
      qr_total_cm_class: select_total_cm
    })
  },
  select_total_cm_rate: function (e) {
    console.info('select_total_cm_rate click')
    //todo  选中 进店率
    var select_total_cm_rate = e.currentTarget.dataset.totalcmrate
    console.log("选择的进店率 维度是：" + select_total_cm_rate)
    //qr_total_cm_rate_class 解释：三种进店率（无序（按数据库的时间顺序）、点击率降序、点击率升序）
    this.setData({
      qr_total_cm_rate_class: select_total_cm_rate
    })
  },
  listqy: function (e) {
    if (this.data.qyopen) {
      this.setData({
        qyopen: false,
        nzopen: false,
        pxopen: false,
        nzshow: true,
        pxshow: true,
        qyshow: false,
        isfull: false,
        shownavindex: 0
      })
    } else {
      this.setData({
        qyopen: true,
        pxopen: false,
        nzopen: false,
        nzshow: true,
        pxshow: true,
        qyshow: false,
        isfull: true,
        shownavindex: e.currentTarget.dataset.nav
      })
    }

  },
  list: function (e) {
    if (this.data.nzopen) {
      this.setData({
        nzopen: false,
        pxopen: false,
        qyopen: false,
        nzshow: false,
        pxshow: true,
        qyshow: true,
        isfull: false,
        shownavindex: 0
      })
    } else {
      this.setData({
        content: this.data.class_total_cm,
        nzopen: true,
        pxopen: false,
        qyopen: false,
        nzshow: false,
        pxshow: true,
        qyshow: true,
        isfull: true,
        shownavindex: e.currentTarget.dataset.nav
      })
    }
  },
  listpx: function (e) {
    if (this.data.pxopen) {
      this.setData({
        nzopen: false,
        pxopen: false,
        qyopen: false,
        nzshow: true,
        pxshow: false,
        qyshow: true,
        isfull: false,
        shownavindex: 0
      })
    } else {
      this.setData({
        content: this.data.class_total_cm_rate,
        nzopen: false,
        pxopen: true,
        qyopen: false,
        nzshow: true,
        pxshow: false,
        qyshow: true,
        isfull: true,
        shownavindex: e.currentTarget.dataset.nav
      })
    }
    console.log(e.target)
  },


  selectleft: function (e) {

    this.setData({
      cityright: {},
      citycenter: this.data.cityleft[e.currentTarget.dataset.city],
      select1: e.target.dataset.city,
      select2: ''
    });
  },
  selectcenter: function (e) {

    this.setData({
      cityright: this.data.citycenter[e.currentTarget.dataset.city],
      select2: e.target.dataset.city
    });
  },
  hidebg: function (e) {

    this.setData({
      qyopen: false,
      nzopen: false,
      pxopen: false,
      nzshow: true,
      pxshow: true,
      qyshow: true,
      isfull: false,
      shownavindex: 0
    })
  }
})