// pages/mysetting/userinfo/userinfo.js

/**
 * @company 公司名称
 * @post 职位
 * @username 姓名
 * @phone 手机号
 * @sex 性别
 */
function Item(company,post,username,phone,sex) {
  this.company = company;
  this.post = post;
  this.username = username;
  this.phone = phone;
  this.sex = sex;
}

function createItem() {
  console.log('create item啦')
  var item = new Item("无限讯奇信息技术有限公司" , "项目经理","吕江瑞","19333333333","男");
  return item;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigation_title: "个人信息",
    is_back: true,
    iv_path: '../../../static/images/detail_back.png',
    user_data: 'null',
  },
  /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function (options) {
    var data = createItem();
    console.log(data.company)
    this.setData({
      user_data: data,
    })

  },
  toastShow: function (str,str2) {
    var _this = this;
    _this.setData({
      isShow: true,
      txt: str,
      txt2:str2,
    });
    setTimeout(function () {    //toast消失
      _this.setData({
        isShow: false
      });
    }, 1500);
  },
  showError:function(){
    this.toastShow("修改信息","请通过PC后台管理修改")
  },
  onReady: function () {
  }
})