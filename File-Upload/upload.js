export function upload(selector, options) {
    const input = document.querySelector(selector)

    const preview = document.createElement('div')
    preview.classList.add('preview')

    const openBtn = document.createElement('button')
    openBtn.classList.add('btn')
    openBtn.textContent = 'Open'

    options.multi ? input.setAttribute('multiple', true) : null
    options.acceptExtensions && Array.isArray(options.acceptExtensions) ? input.setAttribute('accept', options.acceptExtensions.map(ext => '.' + ext).join(',')) : null

    input.insertAdjacentElement('afterend', preview)
    input.insertAdjacentElement('afterend', openBtn)

    const triggerInput = () => input.click()
    const changeHandler = (event) => {
        let {files} = event.target
        if (!files.length) {
            return
        }

        preview.innerHTML = ''

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
                    <div class="preview-remove">&times;</div>
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

    // Triggers on button click
    openBtn.addEventListener('click', triggerInput)
    // Triggers, when file/files are chosen
    input.addEventListener('change', changeHandler)
}


function bytesToSize(bytes) {
    const sizeKb = Number(bytes) / 1024
    return sizeKb > 1024 ? (sizeKb / 1024).toFixed(2) + ' Mb' : sizeKb.toFixed(2) + ' Kb'
}
