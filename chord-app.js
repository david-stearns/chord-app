let ddNote = 'C'
let ddNoteMod = 0
let scalesShown = [
[majorScale,true],
[minorScale,false]
]

renderScale()

// Create Note Dropdown
const rootNotes = [
[0,'C'],
[1,'C#'],
[1,'Db'],
[2,'D'],
[3,'D#'],
[3,'Eb'],
[4,'E'],
[5,'F'],
[5,'E#'],
[6,'F#'],
[6,'Gb'],
[7,'G'],
[8,'G#'],
[8,'Ab'],
[9,'A'],
[10,'A#'],
[11,'B'],
[11,'Cb']
]
const rootDropdown = document.querySelector("#note-dropdown")

rootNotes.forEach((item) => {
    var option = document.createElement("option")
    option.text = item[1]
    rootDropdown.add(option)

})
// Listener for Note Dropdown
rootDropdown.addEventListener('change', (e) => {
    ddNote = e.target.value.charAt(0)
    
    if (e.target.value.charAt(1)==='b') {
        ddNoteMod = -1
    } else if (e.target.value.charAt(1)==='#') {
        ddNoteMod = 1
    } else {
        ddNoteMod = 0
    }
    renderScale()    
})

// Scale Checkboxes
const checkMajor = document.querySelector("#major-checkbox")
const checkMinor = document.querySelector("#minor-checkbox")

checkMajor.addEventListener('change', (e) => {
    scalesShown[0][1] = e.target.checked
    renderScale()
})

checkMinor.addEventListener('change', (e) => {
    scalesShown[1][1] = e.target.checked
    renderScale()
})


function renderScale() {
    // Clear div
    const scaleDiv = document.querySelector('.scale-div')
    scaleDiv.innerHTML = ''

    scalesShown.forEach((item) => {
        if (item[1]) {
            let scale = getScale(ddNote,ddNoteMod,item[0])
            scale.forEach((item)=>{
                const chordEl = document.createElement('div')
                chordEl.textContent = item
                chordEl.classList.add('note-div')
                scaleDiv.appendChild(chordEl)
                chordEl.addEventListener('click', (e) => {
                    console.log(`${item} clicked`)  
                })
            })
        scaleDiv.appendChild(document.createElement('br'))
            
        }
    })
}

