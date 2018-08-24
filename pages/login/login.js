// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoaded: false,
    isDisposed: false,
    navigation_title: "登录",
    is_back: true,
    iv_path: '../../static/images/detail_back.png',
    panid:0,
  },

  onLoad:function(options){
    var id=options.panid;
    this.setData({
        panid:id,
    })
  },
 resetpswd:function(){
    wx.navigateTo({
      url: '/pages/resetpswd/resetpswd'
    })
 },
  vcodelogin:function(){
    wx.navigateTo({
      url: '/pages/login/login?panid=1'
    })
  },
})