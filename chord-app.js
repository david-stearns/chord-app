let ddNote = 'C'
let ddNoteMod = 0

class Scale {
    constructor(name, show, chords) {
        this.name = name // scale name (string)
        this.show = show // show in first group
        this.chords = chords // chord definition [[root number, 'chord type], ...]
        this.checkboxEl = document.querySelector(`#${this.name}-checkbox`)
    }
}

const majorScaleObject = new Scale('major', true, [[0,'maj'],[2,'min'],[4,'min'],[5,'maj'],[7,'maj'],[9,'min'],[11,'dim']])
const minorScaleObject = new Scale('minor',false, [[0,'min'],[2,'dim'],[3,'maj'],[5,'min'],[7,'min'],[8,'maj'],[10,'maj']])
const dorianScaleObject = new Scale('dorian', false, [[0,'min'],[2,'min'],[3,'maj'],[5,'maj'],[7,'min'],[9,'dim'],[10,'maj']])
const phrygianScaleObject = new Scale('phrygian', false, [[0,'min'],[1,'maj'],[3,'maj'],[5,'min'],[7,'dim'],[8,'maj'],[10,'min']])
const lydianScaleObject = new Scale('lydian', false, [[0,'maj'],[2,'maj'],[4,'min'],[6,'dim'],[7,'maj'],[9,'min'],[11,'min']])
const mixolydianScaleObject = new Scale('mixolydian', false, [[0,'maj'],[2,'min'],[4,'dim'],[5,'maj'],[7,'min'],[9,'min'],[10,'maj']])
const locrianScaleObject = new Scale('locrian', false, [[0,'dim'],[1,'maj'],[3,'min'],[5,'min'],[6,'maj'],[8,'maj'],[10,'min']])

const checkboxAll = [majorScaleObject.checkboxEl,minorScaleObject.checkboxEl,dorianScaleObject.checkboxEl,phrygianScaleObject.checkboxEl,lydianScaleObject.checkboxEl,minorScaleObject.checkboxEl,locrianScaleObject.checkboxEl]

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

const scalesAll = [majorScaleObject,minorScaleObject,dorianScaleObject,phrygianScaleObject,lydianScaleObject,mixolydianScaleObject,locrianScaleObject]

// Checkboxes
scalesAll.forEach((item,index) => {
    item.checkboxEl.addEventListener('change', (e) => {
        item.show = e.target.checked
        renderScale()
        })
})

// Initial Render
renderScale()
