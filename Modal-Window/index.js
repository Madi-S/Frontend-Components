const cardsData = [
    {title: 'Xyrella', imgSrc: 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/22b09bb0b44dcac9e1cff1b0c3c981e61e7ab7120dab00a5d8af27d57e11beae.png', content: `Battlecry: If you've restored Health this turn, deal that much damage to all enemy minions.`},
    {title: 'Kor\'vas Bloodthorn', imgSrc: 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/2ed6edb556268d525c6f7d74902cab04a7b90f858fc6229da36b301e5701e45e.png', content: `Charge, Lifesteal After you play a card with Outcast, return this to your hand.`},
    {title: 'Varden Dawngrasp', imgSrc: 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/fe6a31a10a5b80f9aa51e079cfee56ddbec6bbecff6f1dec9b2a3c87a84e88e7.png', content: `Battlecry: Freeze all enemy minions. If any are already Frozen, deal 4 damage to them instead.`},
    {title: 'Firemancer Flurgl', imgSrc: 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/de00d2db46b09041d271dcfd83f1934274cd9450d7aa50cf1ae735b88a5c8370.png', content: `After you play a Murloc, deal 1 damage to all enemies.`}
]

function showCardsDynamically() {
    const cardsDiv = document.getElementById('cards')
    for (let i = 0; i < cardsData.length; i++) {
        const card = document.createElement('div')
        card.classList.add('col')
        card.insertAdjacentHTML('afterbegin',
            `<div class="card">
                      <img src="${cardsData[i].imgSrc}" class="card-img-top" alt="${cardsData[i].title}">
                      <div class="card-body">
                          <h5 class="card-title">${cardsData[i].title}</h5>
                          <p class="card-text">There is nothing to read. Just click the button to see additional information about the card.</p>
                          <a class="btn btn-primary btn-card" id="${'card' + i}">Details</a>
                      </div>
                  </div>`)
        cardsDiv.appendChild(card)
    }
}

function showModalWithCardData(event, id = undefined) {
    console.log('Showing modal with card data', event.target, id)
    let buttons

    if (!id) {
        id = event.target.id
        id = Number(id.replace('card',''))
    }

    const {title, content} = cardsData[id]
    if (id === 0) {
        buttons = [{text: 'Next', class: 'primary', handler: openNextCardModal}]
    } else if (id === cardsData.length - 1) {
        buttons = [{text: 'Back', class: 'primary', handler: openPreviousCardModal}]
    } else {
        buttons = [
            {text: 'Back', class: 'primary', handler: openPreviousCardModal},
            {text: 'Next', class: 'primary', handler: openNextCardModal}
        ]
    }

    myModal.id = id
    myModal.title = title
    myModal.content = content
    myModal.footerButtons = buttons
    myModal.open()
}

function makeButtonsShowModal(buttons) {
    for (let btn of buttons) {
        btn.addEventListener('click', showModalWithCardData)
    }
}

function openNextCardModal(event) {
    myModal.close()
    const nextCardId = myModal.id + 1
    console.log('In open next card modal', nextCardId)
    nextCardId >= 0 && nextCardId < cardsData.length ? showModalWithCardData(event, nextCardId) : event.preventDefault()
}

function openPreviousCardModal(event) {
    myModal.close()
    const prevCardId = myModal.id - 1
    console.log('In open previous card modal', prevCardId)
    prevCardId >= 0 && prevCardId < cardsData.length ? showModalWithCardData(event, prevCardId) : event.preventDefault()
}

showCardsDynamically()
const footerButtons = [
        {text: 'Back', class: 'primary', handler: openNextCardModal},
        {text: 'Next', class: 'primary', handler: openPreviousCardModal},
]
const myModal = $.modal({closable: true})
const cardButtons = document.querySelectorAll('.btn-card')

makeButtonsShowModal(cardButtons)