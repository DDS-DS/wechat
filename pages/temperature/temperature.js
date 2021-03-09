// pages/temperature/temperature.js
import dateFMT from '../../utils/http.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    post:[],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //onenet获取树莓派温度模块数据
    wx.request({
      url: 'https://api.heclouds.com/devices/578362376/datapoints',
      header: {'api-key':'kXqtemejsTWqn5HtJskE8sDywb0='},
      method: 'GET',
      success: (result)=>{
        console.log(result)
        that.setData({
          post:result.data.data.datastreams[0].datapoints[0]
        })
      }
    }),
    wx.request({
      url:'https://apis.map.qq.com/ws/location/v1/ip',
      data:{
        'key':'QTCBZ-E2P6D-MF44L-PU5E7-DTKTZ-VRBF2'
      },
      success (res) {
        console.log(res)
        that.setData({
          latitude: res.data.result.location.lat,
          longitude: res.data.result.location.lng
        })
        wx.request({
          url: 'https://devapi.qweather.com/v7/weather/now?',
          data:{
            'location':res.data.result.location.lng+','+res.data.result.location.lat,
            'key':'fe33d8ac68d64a6198de3df23c65be8e'
          },
          success(res){
            console.log(res)
            that.setData({
              text:res.data.now.text,
              temp:res.data.now.temp,
              humidity:res.data.now.humidity,
              update_time:dateFMT(res.data.updateTime,"Y-M-D h:m:s")
              
            })
          }
        }),
        wx.request({
          url: 'https://apis.map.qq.com/ws/geocoder/v1',
          data:{
            'location':res.data.result.location.lat+','+res.data.result.location.lng,
            'key':'QTCBZ-E2P6D-MF44L-PU5E7-DTKTZ-VRBF2'
          },
          success(res){
            console.log(res)
            that.setData({
              address:res.data.result.address,
              city:res.data.result.address_component.district
            })
          }
        })
      }
    })
      
    
    
  },
  
  

  
})