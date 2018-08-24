// pages/outlet/details/details.js

import * as echarts from '../../../ec-canvas/echarts';


const app = getApp();
function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: "#ffffff",
    color: ["#37A2DA", "#32C5E9"],
    series: [{
      label: {
        normal: {
          fontSize: 14
        }
      },
      type: 'pie',
      center: ['50%', '50%'],
      radius: [0, '60%'],
      data: [{
        value: 55,
        name: '男'
      }, {
        value: 20,
        name: '女'
      }
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 2, 2, 0.3)'
        }
      }
    }]
  };

  chart.setOption(option);
  return chart;
}

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
// 年龄分布
function setOption(chart) {

  var option = {
    title: {
      text: '年龄分布',
      top: 'top',
      left: 'center'
    },
    color: ['#37a2da'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data: ['今天']
    },
    
    xAxis: [
      {
        splitLine: { show: false },//去除网格线
        type: 'category',
        axisTick: { show: false },
        data: ['18岁以下', '18-24岁', '25-34岁', '35-44岁', '45-54岁','55-64岁','65岁以上'],
      }
    ],
    yAxis: [
      {
        splitLine: { show: false },//去除网格线
        type: 'value',
        axisLabel: {
          show: true,
          interval: 'auto',
          formatter: '{value} %'
        }
      }
    ],
    series: [
      {
        type: 'bar',
        barWidth: 15,//固定柱子宽度,
        color:"#4b77e5",
        label: {
          normal: {
            show: true,
            position: 'inside',
          }
        },
        labelLine:{
          normal:{
            show:false,
          }
        },
        data: [300, 270, 340, 344, 300,200,100],
        itemStyle: {
          emphasis: {
            color: '#e5a3f8',
            barBorderRadius: 8
          },
          normal: {
            //柱形图圆角，初始化效果
            barBorderRadius: [8, 8, 8, 8],
            label: {
              show: true,//是否展示
              textStyle: {
                fontWeight: 'bolder',
                fontSize: '12',
                fontFamily: '微软雅黑',
              }
            }
          }
        }
      },
    ]
  };
  chart.setOption(option);
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoaded: false,
    isDisposed: false,
    navigation_title: "门店加载中",
    is_back: true,
    iv_path: '../../../static/images/detail_back.png',
    imgUrls: [
      '../../../static/images/index_one.png',
      '../../../static/images/index_two.png',
      '../../../static/images/index_three.png',
      '../../../static/images/index_four.png',
    ],
    dashbord_titles: [
      '总客流量',
      '到店客流量',
      '进店率',
      '新老顾客'
    ],
    dashbord_details: [
      '12938',
      '8932',
      '8.9%',
      '63.8%'
    ],
    tabs: ['到店客流', '新顾客', '老顾客'],
    stv: {
      windowWidth: 0,
      lineWidth: 0,
      offset: 0,
      tStart: false
    },
    activeTab: 0,
    ec_0: {
      onInit: initChart
    },
    ec_1: {
      onInit: initChart
    },
    ec_2: {
      onInit: initChart
    },
    ec: {
      lazyLoad: true
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.info(options.shopid)
    this.setData({
      navigation_title: options.shopid
    })
    try {
      let { tabs } = this.data;
      var res = wx.getSystemInfoSync()
      this.windowWidth = res.windowWidth;
      this.data.stv.lineWidth = this.windowWidth / this.data.tabs.length;
      this.data.stv.windowWidth = res.windowWidth;
      this.setData({ stv: this.data.stv })
      this.tabsCount = tabs.length;
    } catch (e) {
    }
  },
  onReady:function(){
    // 获取组件
    this.ecComponent = this.selectComponent('#mychart-dom-bar');
    // todo :  显示loading-》请求接口数据，组装-》初始化chart-》完成显示
    init(this);
     
  },
  handlerStart(e) {
    let { clientX, clientY } = e.touches[0];
    this.startX = clientX;
    this.tapStartX = clientX;
    this.tapStartY = clientY;
    this.data.stv.tStart = true;
    this.tapStartTime = e.timeStamp;
    this.setData({ stv: this.data.stv })
  },
  handlerMove(e) {
    let { clientX, clientY } = e.touches[0];
    let { stv } = this.data;
    let offsetX = this.startX - clientX;
    this.startX = clientX;
    stv.offset += offsetX;
    if (stv.offset <= 0) {
      stv.offset = 0;
    } else if (stv.offset >= stv.windowWidth * (this.tabsCount - 1)) {
      stv.offset = stv.windowWidth * (this.tabsCount - 1);
    }
    this.setData({ stv: stv });
  },
  handlerCancel(e) {

  },
  handlerEnd(e) {
    let { clientX, clientY } = e.changedTouches[0];
    let endTime = e.timeStamp;
    let { tabs, stv, activeTab } = this.data;
    let { offset, windowWidth } = stv;
    //快速滑动
    if (endTime - this.tapStartTime <= 300) {
      //向左
      if (Math.abs(this.tapStartY - clientY) < 50) {
        if (this.tapStartX - clientX > 5) {
          if (activeTab < this.tabsCount - 1) {
            this.setData({ activeTab: ++activeTab })
          }
        } else {
          if (activeTab > 0) {
            this.setData({ activeTab: --activeTab })
          }
        }
        stv.offset = stv.windowWidth * activeTab;
      } else {
        //快速滑动 但是Y距离大于50 所以用户是左右滚动
        let page = Math.round(offset / windowWidth);
        if (activeTab != page) {
          this.setData({ activeTab: page })
        }
        stv.offset = stv.windowWidth * page;
      }
    } else {
      let page = Math.round(offset / windowWidth);
      if (activeTab != page) {
        this.setData({ activeTab: page })
      }
      stv.offset = stv.windowWidth * page;
    }
    stv.tStart = false;
    this.setData({ stv: this.data.stv })
  },
  _updateSelectedPage(page) {
    let { tabs, stv, activeTab } = this.data;
    activeTab = page;
    this.setData({ activeTab: activeTab })
    stv.offset = stv.windowWidth * activeTab;
    this.setData({ stv: this.data.stv })
  },
  handlerTabTap(e) {
    this._updateSelectedPage(e.currentTarget.dataset.index);
  }
})