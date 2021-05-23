const _getTemplate = (data = [], placeholder = 'Select from here', defaultId) => {
    let text = placeholder
    const items = data.map(item => {
        let cls = 'select__item'
        if (item.id === defaultId) {
            text = item.value
            cls += ' selected'
        }
        return `<li class="${cls}" data-type="item" data-id="${item.id}">${item.value}</li>`
    }).join('')
    return `
        <div class="select__backdrop" data-type="backdrop"></div>
            <div class="select__input" data-type="input">
                <span id="value" data-type="input">${text}</span>
                <i class="fas dropdown-img fa-caret-down" data-type="arrow"></i>
            </div>
            <div class="select__dropdown">
                <ul class="select__list">                    
                    ${items}
                </ul>
            </div>
            `
}


export class Select {
    className = 'select'

    constructor(selector, options) {
        this.$el = document.querySelector(selector)
        this.options = options
        this.defaultItemId = options.defaultItemId

        this.#render()
        this.#setup()
    }

    #render() {
        const {data, placeholder} = this.options
        this.selectedId = null
        this.$el.classList.add(this.className)
        this.$el.innerHTML = _getTemplate(data, placeholder, this.defaultItemId)
    }

    #setup() {
        this.clickHandler = this.clickHandler.bind(this)
        this.$el.addEventListener('click', this.clickHandler)
        this.$arrow = this.$el.querySelector('[data-type="arrow"]')
        this.$value = this.$el.querySelector('#value')
    }

    clickHandler(event) {
        const {type, id} = event.target.dataset
        if (type === 'input' || type === 'arrow') {
            this.toggle()
        } else if (type === 'item') {
            this.select(id)
        } else if (type === 'backdrop') {
            this.close()
        }
    }

    select(id) {
        debugger
        this.$el.querySelectorAll('.select__item').forEach(item => item.classList.remove('selected'))

        this.selectedId = id
        this.$value.textContent = this.selected.value

        this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected')

        this.close()

        this.options?.onSelect(this.selected)
        console.trace()
    }

    get selected() {
        return this.options.data.find(item => item.id === this.selectedId)
    }

    get isOpen() {
        return this.$el.classList.contains('open')
    }


    toggle() {
        this.isOpen ? this.close() : this.open()
    }

    changeArrow() {
        const classToRemove= this.isOpen ? 'fa-caret-down' : 'fa-caret-up'
        const classToAdd = this.isOpen ? 'fa-caret-up' : 'fa-caret-down'
        this.$arrow.classList.remove(classToRemove)
        this.$arrow.classList.add(classToAdd)
    }

    open() {
        this.$el.classList.add('open')
        this.changeArrow()
    }

    close() {
        this.$el.classList.remove('open')
        this.changeArrow()
    }

    destroy() {
        this.$el.removeEventListener('click', this.clickHandler)
        this.$el.innerHTML = ''
    }
}