const date = [
    {
        type: 'day',
        placeholder: 'DD'
    },
    {
        type: 'month',
        placeholder: 'MM'
    },
    {
        type: 'year',
        placeholder: 'YYYY'
    }
]

let inputTags = ''
date.forEach(date => {
    inputTags += `
        <div class="d-flex flex-column text-uppercase">
        <label id="${date.type}-label">${date.type}</label>
        <input type="number" name="${date.type}" id="${date.type}" placeholder="${date.placeholder}" class="rounded p-2 fs-3 fw-bold mt-2">
        <p class="error" id="${date.type}-error"></p>
      </div>
    `
})
document.querySelector('form').innerHTML = inputTags

let results = ''
const dateReverse = date.reverse()
dateReverse.forEach(date => {
    results += `
        <p class="fst-italic text-dark m-0"><span class="${date.type}-result"></span> ${date.type}s</p>
    `
})
document.querySelector('.results').innerHTML = results

document.querySelector('.img-section img').addEventListener('click', _ => {
    if(checkInputValues()){
        const date = getInputValues()
        calculateInputValues(date)
    }
})

setDefault()

const allInput = document.querySelectorAll('input')

// current day, month, year
const currentDate = new Date()
const currentDay = currentDate.getDate()
const currentMonth = currentDate.getMonth() + 1
const currentYear = currentDate.getFullYear()


const form = document.querySelector('form')
form.addEventListener('submit', e => {
    e.preventDefault()
    if(checkInputValues()){
        const date = getInputValues()
        calculateInputValues(date)
    }
})

document.addEventListener('keydown', e => {
    if(e.key === 'Enter'){
        if(checkInputValues()){
            const date = getInputValues()
            calculateInputValues(date)
        }
    }
})

function checkInputValues(){
    let valid = true
    allInput.forEach(input => {
        const errorElement = document.querySelector(`#${input.name}-error`)
        const labelElement = document.querySelector(`#${input.id}-label`)
        console.log(labelElement)
        const inputValue = parseInt(input.value.trim())
        if(!inputValue){
            errorElement.textContent = `This field is required`
            input.classList.add('red-border')
            labelElement.classList.add('red-font')
            valid = false
            setDefault()
        }
        else if(input.name === 'year' && (inputValue < 1500 || inputValue >= currentYear)){
            errorElement.innerHTML = 'Must be in the past'
            input.classList.add('red-border')
            labelElement.classList.add('red-font')
            valid = false
            setDefault()
        }
        else if(input.name === 'month' && (inputValue < 1 || inputValue > 12)){
            errorElement.innerHTML = `Must be a valid ${input.name}`
            input.classList.add('red-border')
            labelElement.classList.add('red-font')
            valid = false
            setDefault()
        }
        else if(input.name === 'day' && (inputValue < 0 || inputValue > 31)){
            errorElement.innerHTML = `Must be a valid ${input.name}`
            input.classList.add('red-border')
            labelElement.classList.add('red-font')
            valid = false
            setDefault()
        }
        else{
            errorElement.textContent = ''
            input.classList.remove('red-border')
            labelElement.classList.remove('red-font')
        }
    })
    return valid
}

function getInputValues(){
    const date = {}
    allInput.forEach(input => {
        date[input.name] = input.value
    })
    return date
}


function calculateInputValues(data){
    const day = data.day
    const month = data.month
    const year = data.year

    let yearResult = currentYear - year
    let monthResult = currentMonth - month
    let dayResult = currentDay - day

    if(monthResult < 0){
        yearResult -= 1
        monthResult += 12
    }

    if(dayResult < 0){
        monthResult -= 1
        const prevMonth = (currentMonth - 1 + 12) % 12;
        const prevYear = prevMonth === 11 ? currentDate.getFullYear() - 1 : currentDate.getFullYear()
        const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate()
        dayResult += daysInPrevMonth; 
    }

    document.querySelector('.year-result').innerHTML = yearResult
    document.querySelector('.month-result').innerHTML = monthResult
    document.querySelector('.day-result').innerHTML = dayResult
}


function attachValidation(input) {
    input.addEventListener('input', () => {
        checkInputValues()
    })
}


document.querySelectorAll('input').forEach(input => {
    attachValidation(input);
});


function setDefault(){
    document.querySelector('.year-result').innerHTML = '--'
    document.querySelector('.month-result').innerHTML = '--'
    document.querySelector('.day-result').innerHTML = '--'
}



