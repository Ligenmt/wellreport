import request from '@/utils/request'

export function uploadFile(formData) {
    return request({
        url: '/api/upload/pdf',
        headers: {"Content-type": "multipart/form-data"},
        method: 'POST',
        data: formData,
    })
}