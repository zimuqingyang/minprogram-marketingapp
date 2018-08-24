var api=require("../../config/api.js")
import * as echarts from '../../ec-canvas/echarts';
const app=getApp();

// 点击按钮后初始化图表
 function init(that) {
   that.ecComponent.init((canvas, width, height) => {
    // 获取组件的 canvas、width、height 后的回调函数
    // 在这里初始化图表
    const chart = echarts.init(canvas, null, {
      width: width,
      height: height
    });
    setOption(chart);

    // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
     that.chart = chart;

     that.setData({
      isLoaded: true,
      isDisposed: false
    });

    // 注意这里一定要返回 chart 实例，否则会影响事件处理等
    return chart;
  });
};

function dispose(that) {
  if (that.chart) {
    that.chart.dispose();
  }

  that.setData({
    isDisposed: true
  });
};
function setOption(chart){

  var option = {
    color: ['#37a2da', '#32c5e9'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data: ['今天', '昨天']
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true
    },
    xAxis: [
      {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: ['永辉超市', '河马1号店', '优选1号店', '家乐福1号店', '家乐福2号店'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    series: [
      {
        name: '今天',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        },
        data: [300, 270, 340, 344, 300],
        itemStyle: {
          emphasis: {
            color: '#e5a3f8'
          }
        }
      },
      {
        name: '昨天',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true
          }
        },
        data: [120, 102, 141, 174, 190],
        itemStyle: {
          emphasis: {
            color: '#5a87f5'
          }
        }
      },

    ]
  };
  chart.setOption(option);
}


// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      lazyLoad:true
    },
    isLoaded:false,
    isDisposed:false,
    navigation_title: "门店营销系统",
    is_back:false,
    iv_path:'../../static/images/detail_back.png',
    imgUrls: [
      '../../static/images/index_one.png',
      '../../static/images/index_two.png',
      '../../static/images/index_three.png',
      '../../static/images/index_four.png',
    ],
    dashbord_titles:[
      '总客流量',
      '到店客流量',
      '进店率',
      '新老顾客'
    ],
    dashbord_details:[
      '12938',
      '8932',
      '8.9%',
      '63.8%'
    ],
  
  },
  to_sttdetails:function(){
    wx.navigateTo({
      url: '/pages/home/sttdetails/sttdetails',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('页面加载完了--onload')
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 获取组件
    this.ecComponent = this.selectComponent('#mychart-dom-bar');
    // todo :  显示loading-》请求接口数据，组装-》初始化chart-》完成显示
    init(this);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})