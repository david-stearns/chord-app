class Scale {
    constructor(name, show, show2, chords) {
        this.name = name // scale name (string)
        this.show = show // show in first group
        this.show2 = show2 // show in second group
        this.chords = chords // chord definition [[root number, chord type, chord number], ...]
        this.checkboxEl = document.querySelector(`#${this.name}-checkbox`)
        this.checkboxEl2 = document.querySelector(`#${this.name}-checkbox-2`)
    }
}

const majorScale = new Scale('major', true, false, [[0,'maj','I'],[2,'min','ii'],[4,'min','iii'],[5,'maj','IV'],[7,'maj','V'],[9,'min','vi'],[11,'dim','vii\u1D3C']])
const minorScale = new Scale('minor',false, true, [[0,'min','i'],[2,'dim','ii\u1D3C'],[3,'maj','III'],[5,'min','iv'],[7,'min','v'],[8,'maj','VI'],[10,'maj','VII']])
const dorianScale = new Scale('dorian', false, false, [[0,'min','i'],[2,'min','ii'],[3,'maj','III'],[5,'maj','IV'],[7,'min','v'],[9,'dim','vi\u1D3C'],[10,'maj','VII']])
const phrygianScale = new Scale('phrygian', false, false, [[0,'min','i'],[1,'maj','II'],[3,'maj','III'],[5,'min','iv'],[7,'dim','v\u1D3C'],[8,'maj','VI'],[10,'min','vii']])
const lydianScale = new Scale('lydian', false, false, [[0,'maj','I'],[2,'maj','II'],[4,'min','iii'],[6,'dim','iv\u1D3C'],[7,'maj','V'],[9,'min','vi'],[11,'min','vii']])
const mixolydianScale = new Scale('mixolydian', false, false, [[0,'maj','I'],[2,'min','ii'],[4,'dim','iii\u1D3C'],[5,'maj','IV'],[7,'min','v'],[9,'min','vi'],[10,'maj','VII']])
const locrianScale = new Scale('locrian', false, false, [[0,'dim','i\u1D3C'],[1,'maj','II'],[3,'min','iii'],[5,'min','iv'],[6,'maj','V'],[8,'maj','VI'],[10,'min','vii']])

// Create Note Dropdowns
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
const rootDropdown2 = document.querySelector("#note-dropdown-2")

rootNotes.forEach((item) => {
    const option = document.createElement("option")
    option.text = item[1]
    rootDropdown.add(option)
    
    const option2 = document.createElement("option")
    option2.text = item[1]
    rootDropdown2.add(option2)
})

rootDropdown.addEventListener('change', (e) => {
    ddNote = e.target.value.charAt(0)
    
    if (e.target.value.charAt(1)==='b') {
        ddNoteMod = -1
    } else if (e.target.value.charAt(1)==='#') {
        ddNoteMod = 1
    } else {
        ddNoteMod = 0
    }
    renderScale(1)    
})

rootDropdown2.addEventListener('change', (e) => {
    ddNote2 = e.target.value.charAt(0)
    
    if (e.target.value.charAt(1)==='b') {
        ddNoteMod2 = -1
    } else if (e.target.value.charAt(1)==='#') {
        ddNoteMod2 = 1
    } else {
        ddNoteMod2 = 0
    }

    renderScale(2)    
})

// Create Scale Checkboxes
const scalesAll = [majorScale,minorScale,dorianScale,phrygianScale,lydianScale,mixolydianScale,locrianScale]

scalesAll.forEach((item,index) => {
    item.checkboxEl.addEventListener('click', (e) => {
        item.show = e.target.selected
        console.log(e.target.selected)
        renderScale(1)
        })

    item.checkboxEl2.addEventListener('change', (e) => {
        item.show2 = e.target.checked
        renderScale(2)
        })
})

// Initial Render
let ddNote = 'C'
let ddNoteMod = 0
let ddNote2 = 'E'
let ddNoteMod2 = 0

scalesAll[0].checkboxEl.checked = true
scalesAll[1].checkboxEl2.checked = true
rootDropdown.value = 'C'
rootDropdown2.value = 'E'

renderScale(1)
renderScale(2)