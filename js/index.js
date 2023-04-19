// Variables
const next = document.querySelector('#forward')
const back = document.querySelector('#back')
const form = document.createElement('form')

let page = 1
let beginning = 1
let end = 50
let length

// Callbacks
function createForm() {
    const nameInput = document.createElement('input')
    nameInput.placeholder = 'name...'
    nameInput.id = 'name'

    const ageInput = document.createElement('input')
    ageInput.placeholder = 'age...'
    ageInput.id = 'age'

    const descriptionInput = document.createElement('input')
    descriptionInput.placeholder = 'description...'
    descriptionInput.id = 'description'

    const submit = document.createElement('button')
    submit.textContent = 'Create'
    submit.addEventListener('click', createMonster)

    form.appendChild(nameInput)
    form.appendChild(ageInput)
    form.appendChild(descriptionInput)
    form.appendChild(submit)

    document.querySelector('#create-monster').appendChild(form)
}

function nextPage(e) {
    if (end < length) {
        document.querySelector('#monster-container').innerHTML = ''

        beginning += 50
        end += 50
    
        loadMonsters()
    }
}

function previousPage(e) {
    if (beginning > 50) {
        document.querySelector('#monster-container').innerHTML = ''

        beginning -= 50
        end -= 50
    
        loadMonsters()
    }
}

function loadMonsters() {
    fetch('http://localhost:3000/monsters')
    .then(res => res.json())
    .then(data => {
        length = data.length
        for (const monster of data) {
            if (monster.id >= beginning) {
                if (monster.id <= end) {
                    addMonster(monster)
                }
            }
        }
    })
}

function addMonster(monster) {
    const monstersDiv = document.querySelector('#monster-container')
    const monsterDiv = document.createElement('div')

    const name = document.createElement('h2')
    name.textContent = monster.name
    monsterDiv.appendChild(name)

    const age = document.createElement('h4')
    age.textContent = `Age: ${monster.age}`
    monsterDiv.appendChild(age)

    const description = document.createElement('p')
    description.textContent = `Bio: ${monster.description}`
    monsterDiv.appendChild(description)

    monstersDiv.appendChild(monsterDiv)
}

function createMonster(e) {
    e.preventDefault()
    
    let monster = {
        name: document.querySelector('#name').value,
        age: document.querySelector('#age').value,
        description: document.querySelector('#description').value
    }

    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
			"Accept": "application/json"
        },
        body: JSON.stringify(monster)
    })
    .then(res => res.json())
    .then(monster => {
        length++
        let beginningReq = length - 49
        if (beginning > beginningReq) {
            if (length <= end) {
                console.log(monster)
                addMonster(monster)
            }
        }
    })

    form.reset()
}

// Event Listeners
document.addEventListener('DOMContentLoaded', createForm)
document.addEventListener('DOMContentLoaded', loadMonsters)

next.addEventListener('click', nextPage)
back.addEventListener('click', previousPage)



