import firebase from 'firebase/app'
import 'firebase/storage'
import {upload} from './upload.js'

const firebaseConfig = {
apiKey: "AIzaSyByCbn29WTw0WudKo5GpbIeyvjzrkrzG_w",
    authDomain: "file-upload-1f5b4.firebaseapp.com",
    projectId: "file-upload-1f5b4",
    storageBucket: "file-upload-1f5b4.appspot.com",
    messagingSenderId: "1046104791834",
    appId: "1:1046104791834:web:64de8c215afcbfa2eeeaa3"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

upload('#file', {
    multi: true,
    acceptExtensions: ['png', 'jpeg', 'jpg'],
    onUpload(files, blocks) {
        files.forEach((file, index) => {
            const ref = storage.ref(`user-images/${file.name}`)
            const task = ref.put(file)

            task.on('state_changed', snapshot => {
                const loadPercentage = (snapshot.bytesTransferred / snapshot.totalBytes * 100).toFixed(0) + '%'
                const block = blocks[index].querySelector('.preview-info-progress')
                block.textContent = loadPercentage
                block.style.width = loadPercentage


            },
                error => console.log('Error with Firebase:', error),
                () => {
                task.snapshot.ref.getDownloadURL().then(url => {
                    console.log('Download from:', url)
                })

                })
        })
    }
})