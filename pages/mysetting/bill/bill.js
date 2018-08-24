// pages/mysetting/bill/bill.js

/**
 *@level  年份
 *@date   日期
 *@doller 金额  
 */

function Item(level,date,doller){
  this.level=level
  this.date=date
  this.doller=doller
}

function createItem(){
 var billlist=[]
 var tmplist = []

 var bill=new Object()
   for( var i=0;i<10;i++){
    var item=new Item("2018","2018-08-0"+i,"+20"+i);
    tmplist.push(item);
    bill.level="2018";
   }
  bill.datas = tmplist;
  billlist.push(bill)
  
  var bill2 = new Object()
  tmplist=[]
  for (var i = 0; i < 10; i++) {
    var item = new Item("2017", "2017-08-0" + i, "+20" + i);
    tmplist.push(item);
    bill2.level = "2017";
  }
  bill2.datas = tmplist;
  billlist.push(bill2)
  return billlist;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigation_title: "账单详情",
    is_back: true,
    iv_path: '../../../static/images/detail_back.png',
    list_data: [],
    level_data:["2018","2017"],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var data = createItem();
    this.setData({
      list_data:data,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})