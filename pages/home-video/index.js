// pages/home-video/index.js
// import emRequest from '../../service/index'
import { topMv } from '../../service/aip_video.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topArr:[],
    hasMore:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDatas(0)
  },

  getDatas:function(offset){
    if(!this.data.hasMore) return
    topMv({offset:offset}).then(res =>{
      let newArr = this.data.topArr
      if(offset === 0 ){
       newArr = res.data
      }else{
       newArr = newArr.concat(res.data)
      }
      this.setData({topArr:newArr})
      this.setData({hasMore:res.hasMore})
      if(offset === 0){
        wx.stopPullDownRefresh()
      }
    })
  },

  //详情
  goToVideoDetails(event){
    const id = event.currentTarget.dataset.item.id
    wx.navigateTo({
      url: '/pages/video-details/index?id='+id,
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getDatas(0)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getDatas(this.data.topArr.length)
  }
})