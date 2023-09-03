import request from '@/utils/request'

export const pictureUpload = (params) => request.post('/upload', params)

export const pictureIdentify = (params) => request.post('/predict', params)

export const pictureClear = (params) => request.post('/clear', params)

export const statusCheck = () => request.get('/status')
