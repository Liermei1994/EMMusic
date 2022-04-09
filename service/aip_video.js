import emRequest from './index'

export function topMv(params){
  return emRequest.get('/top/mv',{limit:10,...params})
}