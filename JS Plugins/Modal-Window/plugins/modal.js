const DEFAULT_WIDTH = 400
const ANIMATION_SPEED = 350
const SAFE_TIME_TO_WAIT = 10


function _closeModalWindow(event) {
    event.target.dataset.close ? myModal.close() : void(0)
}

function _removeEventListeners() {
    document.querySelector('.vmodal').removeEventListener('click', _closeModalWindow)
}

function _addEventListeners() {
    document.querySelector('.vmodal').addEventListener('click', _closeModalWindow)
}

function _createFooterButtons(buttons) {
    let footerButtons = []
    for (let button of buttons) {
        const $btn = document.createElement('button')
        $btn.innerHTML = button.text
        $btn.classList.add('btn')
        $btn.classList.add(`btn-${button.class}`)
        $btn.onclick = button.handler || void(0)
        footerButtons.push($btn)
    }
    return footerButtons
}

function _insertFooterButtons(buttons) {
    const footer = document.querySelector('.modal-footer')
    footer.innerHTML = ''
    for (let button of buttons) {
        footer.appendChild(button)
    }
}

function _createModal(options) {
    const modal = document.createElement('div')
    modal.classList.add('vmodal')
    modal.insertAdjacentHTML('afterbegin', ` 
            <div class="modal-overlay" data-close="true">
                <div class="modal-window" style="width: ${options.width || DEFAULT_WIDTH}px">
                    <div class="modal-header">
                        <span class="modal-title">${options.title || ''}</span>
                        ${options.closable ? `<span class="modal-close" data-close="true">&times;</span>` : ''}
                        
                    </div>
    
                    <div class="modal-body">
                        ${options.content || ''}
                    </div>
    
                    <div class="modal-footer">
                    </div>
                </div>
            </div>`)

    if (options.footerButtons) {
        const footerButtons = _createFooterButtons(options.footerButtons)
        _insertFooterButtons(footerButtons)
    }

    document.body.appendChild(modal)
    return modal
}

$.modal = (options) => {
    const $modal = _createModal(options)
    let closing = false
    let destroyed = false

    return {
        id: null,
        open() {
            if (destroyed) {
                return console.warn('Modal is destroyed and cannot be opened')
            }
            if (closing) {
                setTimeout(() => this.open(), ANIMATION_SPEED + SAFE_TIME_TO_WAIT)
                console.log('It is closing wait!')
            } else {
                $modal.classList.add('open')
            }
            _addEventListeners()
        },

        close() {
            if (destroyed) {
                return console.warn('Modal is destroyed and cannot be closed')
            }
            _removeEventListeners()

            closing = true
            $modal.classList.remove('open')
            $modal.classList.add('hiding')
            setTimeout(() => {
                $modal.classList.remove('hiding')
                closing = false
            }, ANIMATION_SPEED)
        },

        destroy() {
            $modal.parentNode.removeChild($modal)
            destroyed = true
        },

        set content(content) {
            if (destroyed) {
                return console.warn('Modal is destroyed and its content cannot be changed')
            }
            const body = $modal.querySelector('.modal-body')
            body.innerHTML = content
        },

        set title(string) {
            if (destroyed) {
                return console.warn('Modal is destroyed and its title cannot be changed')
            }
            const title = $modal.querySelector('.modal-title')
            title.innerHTML = string
        },

        set footerButtons(buttons) {
            const $btns = _createFooterButtons(buttons)
            _insertFooterButtons($btns)
        },
    }
}
