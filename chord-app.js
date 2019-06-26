let ddNote = 'C'
let ddNoteMod = 0

class Scale {
    constructor(name, show, chords) {
        this.name = name // scale name (string)
        this.show = show // show in first group
        this.chords = chords // chord definition [[root number, chord type, chord number], ...]
        this.checkboxEl = document.querySelector(`#${this.name}-checkbox`)
    }
}

const majorScale = new Scale('major', true, [[0,'maj','I'],[2,'min','ii'],[4,'min','iii'],[5,'maj','IV'],[7,'maj','V'],[9,'min','vi'],[11,'dim','vii\u1D3C']])
const minorScale = new Scale('minor',false, [[0,'min','i'],[2,'dim','ii\u1D3C'],[3,'maj','III'],[5,'min','iv'],[7,'min','v'],[8,'maj','VI'],[10,'maj','VII']])
const dorianScale = new Scale('dorian', false, [[0,'min','i'],[2,'min','ii'],[3,'maj','III'],[5,'maj','IV'],[7,'min','v'],[9,'dim','vi\u1D3C'],[10,'maj','VII']])
const phrygianScale = new Scale('phrygian', false, [[0,'min','i'],[1,'maj','II'],[3,'maj','III'],[5,'min','iv'],[7,'dim','v\u1D3C'],[8,'maj','VI'],[10,'min','vii']])
const lydianScale = new Scale('lydian', false, [[0,'maj','I'],[2,'maj','II'],[4,'min','iii'],[6,'dim','iv\u1D3C'],[7,'maj','V'],[9,'min','vi'],[11,'min','vii']])
const mixolydianScale = new Scale('mixolydian', false, [[0,'maj','I'],[2,'min','ii'],[4,'dim','iii\u1D3C'],[5,'maj','IV'],[7,'min','v'],[9,'min','vi'],[10,'maj','VII']])
const locrianScale = new Scale('locrian', false, [[0,'dim','i\u1D3C'],[1,'maj','II'],[3,'min','iii'],[5,'min','iv'],[6,'maj','V'],[8,'maj','VI'],[10,'min','vii']])

const checkboxAll = [majorScale.checkboxEl,minorScale.checkboxEl,dorianScale.checkboxEl,phrygianScale.checkboxEl,lydianScale.checkboxEl,minorScale.checkboxEl,locrianScale.checkboxEl]

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

const scalesAll = [majorScale,minorScale,dorianScale,phrygianScale,lydianScale,mixolydianScale,locrianScale]

// Checkboxes
scalesAll.forEach((item,index) => {
    item.checkboxEl.addEventListener('change', (e) => {
        item.show = e.target.checked
        renderScale()
        })
})

// Initial Render
renderScale()


console.log('test')