const dropbase = document.querySelector('.dropbase')

dropbase.addEventListener('dragover', event => {
    event.preventDefault()
    dropbase.classList.add('dropbase-hover')
})

dropbase.addEventListener('dragleave', event => {
    dropbase.classList.remove('dropbase-hover')
})

dropbase.addEventListener('drop', event => {
    event.preventDefault()


    const files = event.dataTransfer.files
    let valid = true
    for (let file of files) {
        console.log(file.type)
        if (!file.type.includes('image')) {
            valid = false
        }
    valid ? console.log('Files have valid extension') : console.warn('Only images are accepted')
    valid ? dropbase.classList.add('dropbase-valid') : dropbase.classList.add('dropbase-invalid')
    dropbase.textContent = valid ? 'Great, submit the image/images' : 'Wrong file format'
    }
})