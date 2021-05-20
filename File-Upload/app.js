import {upload} from './upload.js'

upload('#file', {
    multi: true,
    acceptExtensions: ['png', 'jpeg', 'jpg']
})