const BASEURL = 'http://123.207.32.32:9001'
class EMRequest{
 request(url,params,methods){
  return new Promise((resolve,reject) =>{
    wx.request({
      url: BASEURL + url,
      data:params,
      method:methods,
      success:(res)=>{
        resolve(res)
      },
      fail:(err)=>{
        reject(err)
      }
    })
  })
 };
 get(url,params){
   return this.request(url,params,"GET")
 };
 post(url,params){
  return this.request(url,params,"POST")
}
}

const emRequest = new EMRequest()

export default emRequest