
const createElement = (tag, classes = [], content) => {
    const node = document.createElement(tag)

    classes.length ? node.classList.add(...classes) : noop()
    content ? node.textContent = content : noop()

    return node
}

function noop() {}

export function upload(selector, options) {
    let files = []

    const onUpload = options.onUpload ?? noop
    const input = document.querySelector(selector)

    const preview = createElement('div', ['preview'])
    const openBtn = createElement('button', ['btn'], 'Open')
    const uploadBtn = createElement('button', ['btn', 'btn-primary'], 'Upload')
    uploadBtn.style.display = 'none'

    options.multi ? input.setAttribute('multiple', true) : null
    options.acceptExtensions && Array.isArray(options.acceptExtensions) ? input.setAttribute('accept', options.acceptExtensions.map(ext => '.' + ext).join(',')) : null

    input.insertAdjacentElement('afterend', preview)
    input.insertAdjacentElement('afterend', uploadBtn)
    input.insertAdjacentElement('afterend', openBtn)

    const openFileInputWindow = () => input.click()
    const loadFilesHandler = event => {
        files = event.target.files
        if (!files.length) {
            return
        }

        preview.innerHTML = ''
        uploadBtn.style.display = 'inline'

        files = Array.from(files)
        files.forEach(file => {
            if (!file.type.match('image')) {
                return
            }

            const reader = new FileReader()

            reader.onload = ev => {
                const src = ev.target.result
                preview.insertAdjacentHTML('afterbegin', `
                <div class="preview-img">
                    <div class="preview-remove" data-name="${file.name}">&times;</div>
                    <img src="${src}" alt="${file.name}" />
                    <div class="preview-info">
                        <span>${file.name}</span>
                        ${bytesToSize(file.size)}
                    </div>
                </div>
                `)
            }

            reader.readAsDataURL(file)

        })
    }

    const removeFileHandler = event => {
        if (!event.target.dataset) {
            return
        }
        const {name} = event.target.dataset
        files = files.filter(file => file.name !== name)

        !files.length ? uploadBtn.style.display = 'none' : noop()

        const block = event.target.closest('.preview-img')
        block.classList.add('removing')
        setTimeout(() => block.remove(), 330)
    }

    const clearPreview = el => {
        el.style.bottom = '4px'
        el.innerHTML = `<div class="preview-info-progress"></div>`
    }

    const uploadFilesHandler = () => {
        if (!files.length) {
            return
        }
        uploadBtn.remove()

        preview.removeEventListener('click', removeFileHandler)
        preview.querySelectorAll('.preview-remove')
            .forEach(e => e.remove())
        const previewInfo = preview.querySelectorAll('.preview-info')
        previewInfo.forEach(clearPreview)

        onUpload(files, previewInfo)
    }

    // Triggers on button click -> opens file input window
    openBtn.addEventListener('click', openFileInputWindow)

    // Triggers, when file/files are chosen
    input.addEventListener('change', loadFilesHandler)

    // Triggers on preview click -> handling image removing
    preview.addEventListener('click', removeFileHandler)

    // Triggers, when user sends files
    uploadBtn.addEventListener('click', uploadFilesHandler)
}




function bytesToSize(bytes) {
    const sizeKb = Number(bytes) / 1024
    return sizeKb > 1024 ? (sizeKb / 1024).toFixed(2) + ' Mb' : sizeKb.toFixed(2) + ' Kb'
}
