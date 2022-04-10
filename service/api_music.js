import emRequest from './index'

export function getBanners(params){
  return emRequest.get('/banner',{type:2})
}