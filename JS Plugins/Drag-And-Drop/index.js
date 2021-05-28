`
Before adding this script:
1) Insert div with "dropbase" class
2) Connect styles
`


const $dropbase = document.querySelector('.dropbase')
class DragAndDrop {
    constructor() {
        this.destroyed = false
        this.activate()
    }

    activate() {
        if (!this.destroyed) {
            $dropbase.addEventListener('dragleave', this._dragLeavehandler)
            $dropbase.addEventListener('dragover', this._dragOverHandler)
            $dropbase.addEventListener('drop', this._dropHandler)

            $dropbase.textContent = 'Drag Files Here'
        }
    }

    deactivate() {
        if (!this.destroyed) {
            $dropbase.removeEventListener('dragleave', this._dragLeavehandler)
            $dropbase.removeEventListener('dragover', this._dragOverHandler)
            $dropbase.removeEventListener('drop', this._dropHandler)

            $dropbase.classList.remove('dropbase-hover')
            $dropbase.classList.remove('dropbase-valid')
            $dropbase.classList.remove('dropbase-invalid')

            $dropbase.textContent = 'Deactivated'
        }
    }

    destroy() {
        $dropbase.parentNode.removeChild($dropbase)
        this.destroyed = true
    }

    // *** Event handlers ***

    _dragLeavehandler() {
        $dropbase.classList.remove('dropbase-hover')
    }

    _dragOverHandler(event) {
        event.preventDefault()
        $dropbase.classList.add('dropbase-hover')
    }

    _dropHandler(event) {
        console.log('in drop', this)
        event.preventDefault()

        const files = event.dataTransfer.files
        const filesData = []
        let valid = true
        for (let file of files) {
            console.log(file)
            filesData.push(file)
        }

        if (valid) {
            dropbase.classList.add('dropbase-valid')
            dropbase.textContent = 'Great, submit image/images'
        } else {
            console.alert('Wrong file type')
            dropbase.classList.add('dropbase-invalid')
            dropbase.textContent = 'Wrong file type'
        }

        DragAndDrop._sendFilesToServer(filesData, 'Nothing')
    }

    // *** Send files bytes data via API ***
    static _sendFilesToServer(data, user_id) {}

}
const d = new DragAndDrop