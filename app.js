//app.js
let api = {
  "search":"https://api.douban.com/v2/book/search?q=",
  "book":"https://api.douban.com/v2/book/",
  "getAccessToken":"https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxbb77690103cdf93f&secret=2845f479a2750574703e87311f6d6178",
  "getwxa":"https://api.weixin.qq.com/wxa/getwxacode?access_token="
}
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success:function(){
          wx.getUserInfo({
            withCredentials: true,
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  getUrl:function(name){
    return api[name];
  },
  showLoading: function () {
    wx.showLoading({
      title: '加载中',
      mask: true
    });
  },
  globalData: {
    userInfo: null
  }
})
