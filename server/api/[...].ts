import {joinURL} from 'ufo'

export default defineEventHandler(async(event)=>{
  const {myProxyUrl} = useRuntimeConfig()
  const path = event.path.replace(/^\/api\//,'')
  const target = joinURL(myProxyUrl,path)
  return proxyRequest(event,target)
})