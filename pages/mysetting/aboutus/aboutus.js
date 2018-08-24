// pages/mysetting/aboutus/aboutus.js

function Item(name,date){
  this.name=name;
  this.date=date;
}

function createItem(){
  console.log('create item啦')
  var listdata=[]
  for (var i = 0; i < 10;i++) {
    var item=new Item("name"+i,"2018-8-"+i);
    listdata.push(item);
  }
  return listdata;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigation_title: "功能介绍",
    is_back: true,
    iv_path: '../../../static/images/detail_back.png',
    list_data:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var data = createItem();
    console.log(data)
    this.setData({
      list_data:data,
    })

  },

})