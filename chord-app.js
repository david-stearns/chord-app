// myScale = getScale('C',0,majorScale)
// renderScale()


// Create Note Dropdown
const rootNotes = [
[0,'C'],
[1,'C#'],
[1,'Db'],
[2,'D'],
[3,'D#'],
[3,'Eb'],
[4,'E'],
[5,'F']
]
const rootDropdown = document.querySelector("#note-dropdown")

rootNotes.forEach((item) => {
    var option = document.createElement("option")
    option.text = item[1]
    rootDropdown.add(option)

})

rootDropdown.addEventListener('change', (e) => {
    const ddNote = e.target.value.charAt(0)
    let ddNoteMod = 0
    if (e.target.value.charAt(1)==='b') {
        ddNoteMod = -1
    } else if (e.target.value.charAt(1)==='#') {
        ddNoteMod = 1
    }
    let myScale = getScale(ddNote,ddNoteMod,majorScale)
    renderScale(myScale)
})

// Create Scale Dropdown
//https://www.youtube.com/watch?v=yMKTRn_THeA


function renderScale(scale) {
    const scaleDiv = document.querySelector('.scale-div')
    scaleDiv.innerHTML = ''

    // add code here to get selected note
    // get which boxes are checked
    // for each over array to render each scale

    scale.forEach((item)=>{
        const chordEl = document.createElement('div')
        chordEl.textContent = item
        chordEl.classList.add('note-div')
        scaleDiv.appendChild(chordEl)
        chordEl.addEventListener('click', (e) => {
            console.log(`${item}`)    
        })

    })
}
