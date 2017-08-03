//index.js
//获取应用实例
let app = getApp();
let a = null;
let pageParams = {
  data: {
    isLoading:true,
    userInfo: {},
    imgData:null
  },
  //事件处理函数
  bindViewTap: function () {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        console.log(res)
        let s = {};
        s.avatarUrl = res.tempFiles[0].path;
        s.nickName = a.nickName;
        this.setData({
          userInfo: s
        })
      },
      fail: res => {
        console.log(res)
      }
    })
  },
  /*
  1、微信小程序往后台请求二维码
  2、后台（java/php） 根据微信小程序信息往微信端请求tonken
  3、后台得到tonken后往微信端请求二维码图片
  4、后台得到图片后保存在服务器上，将路径返回给微信小程序
  5、微信小程序得到路径后，根据路径下载图片
  6、下载图片成功后再保存至本地
  7、保存成功后将路径给予image标签里面展示
  */ 
  getEWM:function(){
    let _this = this;
    wx.request({
      url: app.getUrl("getAccessToken"),
      data:{},
      header: {
        'content-type': 'json'
      },
      success:res=>{
        let asssssToken = res.data["access_token"];
        console.log(asssssToken)
        wx.request({
          url: app.getUrl("getwxa") + asssssToken,
          method:"POST",
          data:{
            path:'/pages/index/index'
          },
          header:{
            'content-type':'json'
          },
          success:res=>{
            _this.setData({
              imgData:res.data
            })
          }
        })
      }
    })
  },
  onShareAppMessage:function(options){
    console.log(options)
    let obj = {
      title:'测试版本',
      path: 'pages/logs/logs',
      success:res=>{
        console.log(res)
        wx.showToast({
          title: '转发成功',
          icon: 'success'
        })
      },
      fail:res=>{
        console.log(res);
        wx.showToast({
          title: '转发失败'
        })
      }
    };
    return obj;
  },
  onLoad: function (options) {
    console.log(options)
    var _this = this;
    
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      console.log(userInfo);
      a = userInfo;
      //更新数据
      _this.setData({
        userInfo: userInfo
      })
    });
    wx.showShareMenu({
      withShareTicket: true
    });
  },
  showNavigationBarLoading:function(e){
    if (this.data.isLoading){
      wx.showNavigationBarLoading();
      this.data.isLoading = false;
    }else{
      wx.hideNavigationBarLoading();
      this.data.isLoading = true;
    }
    
  },
  showActionSheet:function(){
    wx.showActionSheet({
      itemList: ['A', 'B', 'C'],
      success: function (res) {
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  setTopBarText:function(){
    wx.setTopBarText({
      text: '我是当前页面'
    })
  },
  getLocation:function(e){
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28
        })
      }
    })
  }
}
Page(pageParams);
