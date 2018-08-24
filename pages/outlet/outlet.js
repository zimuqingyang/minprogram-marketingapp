// pages/outlet/outlet.js
var cityData = require('../../utils/city.js');
// 预定义的 item 数据类
function Item(img, name, total_keliu, total_cm_keliu, rate_cm){
  this.img=img;
  this.name=name;
  this.total_keliu = total_keliu;
  this.total_cm_keliu = total_cm_keliu;
  this.rate_cm = rate_cm;
}
// 测试，预生成数组， item
function createListDatas(){
  var list=[];
  for(var i=0;i<10;i++){
    var item = new Item("/asdas.png",i+"号店",i,i,i);
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
    qr_total_cm_class:"",
    qr_total_cm_rate_class: "",
    shownavindex: '',
    outletLists: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      class_total_cm: ['<1000人', '1000人-5000人', '5000人>'],
      class_total_cm_rate: ['默认排序', '进店率最高', '进店率最低'],
    })
    console.info("list数据为" )

    var lists=createListDatas()
    this.setData({
      outletLists:lists,
    })

    console.info("打印list")
    console.info(this.data.outletLists)
  },
  select_area: function (event){
    //toto 选中具体的区、县
    var select_area =event.currentTarget.dataset.area;
    console.info("选择的区域是：" + select_area);
    this.setData({
      select3:select_area,
    })
  },
  select_total_cm: function (e) {
    //todo  选中 到店客流量
    var select_total_cm = e.currentTarget.dataset.totalcm
    console.log("选择的到店客流量维度是："+select_total_cm)
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