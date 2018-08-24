# 项目介绍

一款主打门店营销的小程序，本来要独立完成整个项目包括前后端要的，有些意外因素，项目临时收尾。索性将成果拿出来给各位分享了，旨在总结经验教训。

# 项目截图

## 截图1

![](https://raw.githubusercontent.com/ShaunSheep/minprogram-marketingapp/master/%E6%BC%94%E7%A4%BA%E5%9B%BE%E7%89%87/%E6%88%AA%E5%9B%BE1.jpg)

## 截图2

![](https://raw.githubusercontent.com/ShaunSheep/minprogram-marketingapp/master/%E6%BC%94%E7%A4%BA%E5%9B%BE%E7%89%87/%E6%88%AA%E5%9B%BE2.jpg)

## 截图3

![](https://raw.githubusercontent.com/ShaunSheep/minprogram-marketingapp/master/%E6%BC%94%E7%A4%BA%E5%9B%BE%E7%89%87/%E6%88%AA%E5%9B%BE3.jpg)



# 项目经验总结

##  第一步  收集项目需求

| 收集任务                                                    |                                            |
| ----------------------------------------------------------- | ------------------------------------------ |
| 按照原型图，提取UI元素，上网找寻web UI组件。                | 信息来源：文档3                            |
| 根据UI元素提取组件/插件关键字及下载链接、组件demo、组件源码 | 搜索引擎、  小程序开发文档、  文档1、文档2 |

##第二步小程序知识储备

| 第二步：根据任务预备开发知识 |                                                              |
| ---------------------------- | ------------------------------------------------------------ |
| 知识点总结                   | 链接                                                         |
| 小程序开发文档               | [小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/) |
| 文档链接1                    | [Github  小程序开源组件库](https://github.com/justjavac/awesome-wechat-weapp)： |
| 文档链接2                    | [Github 小程序开源组件库](https://github.com/opendigg/awesome-github-wechat-weapp) |
| 文档链接3                    | [css教程](http://www.w3school.com.cn/css/css_syntax_class_selector.asp) |
| wxml                         | view、左右滑动、上下滑动、九宫格、复用                       |
| wxss                         | 上下排列、左右排列、均分、内边距、外边距、                   |
| js                           | 本地缓存、点击事件、渲染事件、网络请求                       |
| 异步                         | worker组件  多线程                                           |
| chart                        | [echart小程序版介绍链接](http://echarts.baidu.com/tutorial.html#%E5%9C%A8%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F%E4%B8%AD%E4%BD%BF%E7%94%A8%20ECharts)     备选方案  [wx-chart](https://github.com/xiaolin3303/wx-charts) |
| 产品需求                     | ![重要](file:///C:/Users/lenovo/AppData/Local/Temp/msohtmlclip1/01/clip_image001.png) 饼图   ![重要](file:///C:/Users/lenovo/AppData/Local/Temp/msohtmlclip1/01/clip_image001.png) 柱状图   ![重要](file:///C:/Users/lenovo/AppData/Local/Temp/msohtmlclip1/01/clip_image001.png) 折线图   ![重要](file:///C:/Users/lenovo/AppData/Local/Temp/msohtmlclip1/01/clip_image001.png) 延迟加载   ![重要](file:///C:/Users/lenovo/AppData/Local/Temp/msohtmlclip1/01/clip_image001.png) 页面不阻塞滚动   ![重要](file:///C:/Users/lenovo/AppData/Local/Temp/msohtmlclip1/01/clip_image001.png) 页面创建多图表 |
| 下拉选择                     | ![重要](file:///C:/Users/lenovo/AppData/Local/Temp/msohtmlclip1/01/clip_image001.png) 类似文字识别底部action-sheet |
| 多类型list                   | [citySelect](https://github.com/chenjinxinlove/citySelect)             备选方案     [wx-alphabetical-listview](https://github.com/zhongjie-chen/wx-alphabetical-listview) |
|                              | <https://github.com/zhongjie-chen/wx-scrollable-tab-view>    |
| 下拉弹框                     | [menudown](https://github.com/didiaohu/xiaoxiaoxiao/tree/master/drop-down-menu/menudown)  备选方案：  [下拉1](https://blog.csdn.net/qq_31604363/article/details/78305235)     [下拉2](https://blog.csdn.net/github_39371177/article/details/80251211) |
| 左滑删除                     | [minapp-slider-left](https://github.com/bigmeow/minapp-slider-left) |
| 图片预加载                   | [img-loader](https://github.com/o2team/wxapp-img-loader)     |
| 请求队列管理库               | [wx-promise-request](https://github.com/zhengjunxin/wx-promise-request) |
| md5加密                      | [wxmd5](https://github.com/youngjuning/wxMD5)                |
| base64                       | [wxbase64](https://github.com/youngjuning/wxBase64)          |
| websocket                    | [weapp.socket.io](https://github.com/weapp-socketio/weapp.socket.io) |
| 富文本                       | [wxparse](https://github.com/icindy/wxParse)                 |
| 联动等常见样式               | youzan-ui                                                    |
| 时间+日期选择器              | <https://blog.csdn.net/m0_38082783/article/details/78921283> |

## 参考历史项目——商城小程序

 ![](https://raw.githubusercontent.com/ShaunSheep/minprogram-marketingapp/master/%E6%BC%94%E7%A4%BA%E5%9B%BE%E7%89%87/%E5%8F%82%E8%80%8301.jpg)

## 历时时长总结

| 拿到UI，制定开发计划 | 预计1天  实际0.5天                                       |
| -------------------- | -------------------------------------------------------- |
| 纯页面开发           | 预计7工作日  实际4工作日                                 |
| 小程序开发总时长     | 4.5工作日，实际25小时                                    |
| 总结：               | 23个页面，如果能全力开发，应该能缩短至20个小时左右完成。 |
|                      |                                                          |

