// index/test.js
import * as echarts from "../../../ec-canvas/echarts";
const app = getApp();
// 新老顾客

function setOption(chart){
  var option = {
    title: {
      text: '新老顾客',
      left: 'center'
    },
    color: ["#37A2DA", "#67E0E3", "#9FE6B8"],

    grid: {

      grid: {
        left: 20,
        right: 20,
        bottom: 15,
        top: 0,
        containLabel: true
      },
    },

    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日', '周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      // show: false
    },
    axisLabel: {
      //X轴刻度配置
      interval: 0 //0：表示全部显示不间隔；auto:表示自动根据刻度个数和宽度自动设置间隔个数
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
      // show: false
    },
    series: [{
      name: 'A',
      type: 'line',
      smooth: true,
      data: [18, 36, 65, 18, 36, 65, 30, 78, 40, 33, 30, 78, 40, 33]
    }, {
      name: 'B',
      type: 'line',
      smooth: true,
        data: [12, 50, 51, 35, 70, 18, 36, 65, 30, 78, 40, 33,30, 20]
    }, {
      name: 'C',
      type: 'line',
      smooth: true,
        data: [10, 18, 36, 65, 30, 78, 40, 33,30, 31, 50, 40, 20, 10]
    }]
  };

  chart.setOption(option);
  chart.resize();
  return chart;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: 0,
    windowWidth: 0,
    chartHeight: 0,
    chartWidth: 0,
    navigation_title: "统计数据",
    is_back: true,
    iv_path: '../../../static/images/detail_back.png',
    tabs: ['总客流量', '到店客流量','333','4444'],
    stv: {
      windowWidth: 0,
      lineWidth: 0,
      offset: 0,
      tStart: false
    },
    activeTab: 0,
    page:0,
    ec_line_user: {
      lazyLoad: true ,
      disableTouch: true,

    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var sys = wx.getSystemInfoSync();
    var tmptHeight = (sys.windowWidth)*2;
    var tmpWidth = (sys.windowHeight)*2-200;//旋转之后view有平移，减去适量的值，使之对齐。
    var that=this;
    
    this.setData({
      windowHeight: sys.windowHeight,
      windowWidth: sys.windowWidth,
      chartHeight: tmptHeight,
      chartWidth: tmpWidth,
    });

    
    try {
      let { tabs } = this.data;
      var res = wx.getSystemInfoSync()
      this.windowWidth = res.windowWidth;
      this.data.stv.lineWidth = this.windowWidth / this.data.tabs.length;
      this.data.stv.windowWidth = res.windowWidth;
      this.data.stv.windowHeight = res.windowHeight;
      this.setData({ stv: this.data.stv })
      this.tabsCount = tabs.length;
    } catch (e) {
    }

    // 获取组件
    this.ecComponent = this.selectComponent('#mychart-dom-line-user');
    this.ecComponent.init((canvas, tmpWidth, tmptHeight) => {
      /**
       * init 函数会裁剪 width和height,所以，通过外部的值强制设置它的宽高
       */
      const chart = echarts.init(canvas, null, {
        width:600,
        height: 350
      });
      setOption(chart);

      this.chart = chart;

      this.setData({
        isLoaded: true,
        isDisposed: false
      });
       // 如果想要禁止触屏事件，以保证在图表区域内触摸移动仍能滚动页面，
      // 就将 disableTouch 设为 true
      // disableTouch: true,

      return chart;
    });
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