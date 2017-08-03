let app = getApp();

let pageParams = {
  /**
   * 页面的初始数据
   */
  data: {
    bookListShow: false,
    getMoreShow: false,
    isShowTip: false,
    inputVal: '',
    num: 1,
    bookList: [
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLOad')
  },
  
  search: function () {
    let inputVal = this.data.inputVal, _this = this;
    this.setData({
      num: 1
    });
    if (inputVal) {
      app.showLoading();
      let url = app.getUrl("search") + inputVal,
        _this = this;
      this.getBookData(url, function (res) {
        wx.hideLoading();
        if (res.data.books.length) {
          _this.setData({
            isShowTip: false,
            bookListShow: true,
            bookList: res.data.books
          });
        } else {
          _this.setData({
            isShowTip: true,
            bookListShow: false
          })
        }
      });
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function (e) {
    let inputVal = this.data.inputVal, _this = this;
    if (!inputVal) {
      wx.stopPullDownRefresh()
    } else {
      if (this.data.isShowTip) {
        wx.stopPullDownRefresh();
      } else {
        app.showLoading();
        let url = app.getUrl("search") + inputVal + '&start=' + (20 * this.data.num)
        this.getBookData(url, function (res) {
          wx.hideLoading();
          _this.setData({
            bookListShow: true,
            bookList: res.data.books,
            num: ++(_this.data.num)
          });
          wx.stopPullDownRefresh();
        })
      }
    }
  },
  getBookData: function (url, callback) {
    wx.request({
      url: url,
      data: {},
      header: {
        'content-type': 'json'
      },
      success: (callback ? callback : {})
    })
  },
  tapName: function(e){
    let name = `你正在停留的书籍是 ${e.currentTarget.dataset["bookname"]}`;
    wx.showModal({
      title:'提示',
      content:name,
      success:function(res){
        if (res.confirm) {
          
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  clickTo:function(e){
    let id = e.currentTarget.id;
    wx.navigateTo({
      url: '../book/book?id='+id
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      inputVal: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onReady')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //每次进入页面都会加载
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload')
  },



  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('onReachBottom')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log('onShareAppMessage')
  }
}
Page(pageParams);