// parcel index.html
const {Select} = require('./plugins/select')
import './style.scss'

document.addEventListener('DOMContentLoaded', main)

function main() {
    const select = new Select('#select', {
        placeholder: 'Choose one from the following',
        data: [
            {id: '1', value: 'Football'},
            {id: '2', value: 'Racing'},
            {id: '3', value: 'Volleyball'},
            {id: '4', value: 'Hockey'},
            {id: '5', value: 'Basketball'},
            {id: '6', value: 'Table tennis'},
        ],
        defaultItemId: '2',
        onSelect(item) {
            console.log('Do something when selected item:', item)
        }
    })

    window.s = select

}

