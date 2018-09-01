let getId = selector => {
    return document.getElementById(selector)
}

// Create Random Number
let randomNumber = upperLimit => {
    return Math.floor(Math.random() * upperLimit) + 1
}

// create rgba Random color 
let randomColorGenarator = () => {
    return `rgb(${randomNumber(255)}, ${randomNumber(255)}, ${randomNumber(255)})`
}



let welcomeWrapper = getId('welcome')
let title = getId('title')
let pra = getId('pra')
let inputText
let flag = true
let intervalID

// Content for Title
let content = [
    { title: title.innerHTML.trim() }, { title: 'Welcome to our world' }
]

// Change background color and title content
let start = () => {
    let intervalID = setInterval(function() {
        // Genarate random color 
        welcomeWrapper.style.background = randomColorGenarator();

        if (flag) {
            title.innerHTML = content[0].title
            flag = false;
        } else {
            title.innerHTML = content[1].title
            flag = true
        }
    }, 300)

    return intervalID
}

// Initiate background color change and title change functionality
intervalID = start()


// Stop background color change and title change functionality when mouse enter into the welcomeWrapper
welcomeWrapper.addEventListener('mouseenter', function() {
    clearInterval(intervalID)
})


// Start background color change and title change functionality when mouse leave from the welcomeWrapper
welcomeWrapper.addEventListener('mouseleave', function() {
    intervalID = start()
})

// Fuction for edit the pragrap text
function editText(event) {
    let target = event.target
        // Create new textarea Element
    let textareaElement = document.createElement("textarea")
        // Insert content of the existing paragraph
    textareaElement.value = target.innerHTML
        // Add event to the textareaElement
    textareaElement.addEventListener('keypress', saveText)
    textareaElement.addEventListener('blur', saveText)
        // Select the welcomeWrapper element
    var parentDiv = target.parentNode;
    // Insert new textareaElement into the welcomeWrapper before paragraph
    parentDiv.insertBefore(textareaElement, target);
    // Remove the existing paragraph
    target.remove()
    textareaElement.focus()

}

function saveText(event) {

    if (event.type == 'blur' || event.keyCode == 13) {

        // If the paragraph doesn't exist create a new paragraph and insert it into the welcomeWrapper
        if (!getId('pra')) {
            // Select the textarea input
            let target = event.target
                // Select the welcomeWrapper element
            var parentDiv = target.parentNode;
            // Create new p Element
            let newPra = document.createElement("p")
                // Set ID to the p element
            newPra.setAttribute('id', 'pra')
                // Get textarea value and assign it into the p element
            newPra.innerHTML = target.value

            // Add event to the p element
            newPra.addEventListener('click', editText)
                //  Insert p into the welcomeWrapper
            parentDiv.insertBefore(newPra, target);
            // Remove the existing paragraph
            target.remove()
        }
    }


}


pra.addEventListener('click', editText)