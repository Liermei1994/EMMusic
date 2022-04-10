// pages/home-music/index.js
import { getBanners } from '../../service/api_music'
import computedHeight from '../../utils/queryHeight'
import throttle from '../../utils/throttle'

const throttleQuery = throttle(computedHeight,1000)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList:[],
    swiperHeight:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDatas()
  },
  goSeacrh: function(){
    wx.navigateTo({
      url: '/pages/search/index',
    })
  },
  //api
  getDatas(){
    getBanners().then(res =>{
      this.setData({bannerList:res.banners})
    })
  },
  watchImg(){
    throttleQuery('.si-img').then(res =>{
      this.setData({swiperHeight:res[0].height})
    })
  }

})