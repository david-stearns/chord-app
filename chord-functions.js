// dim unicode is \u1D3C
const noteNumbers = [
    [0,'C'],
    [2,'D'],
    [4,'E'],
    [5,'F'],
    [7,'G'],
    [9,'A'],
    [11,'B'],
    [12,'C'],
    [14,'D'],
    [16,'E'],
    [17,'F'],
    [19,'G'],
    [21,'A'],
    [23,'B'],
    [24,'C']
]

function renderScale() {
    const scaleDiv = document.querySelector('.scale-div')
    scaleDiv.innerHTML = ''

    scalesAll.forEach((item) => {
        if (item.show) {
            let scale = getScale(ddNote,ddNoteMod,item)
            const title = document.createElement('h3')
            title.textContent = `${ddNote} ${item.name}`
            scaleDiv.appendChild(title)
            scale.forEach((item)=>{
                const chordEl = document.createElement('div')
                const audioEl = document.createElement('audio')
                audioEl.src = "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
                chordEl.textContent = item
                chordEl.classList.add('note-div')
                scaleDiv.appendChild(chordEl)
                chordEl.addEventListener('click', (e) => {
                    console.log(`${item} clicked`)
                    audioEl.play()  
                })
            })
        //scaleDiv.appendChild(document.createElement('br'))  
        }
    })
}
function getScale(rootNote,rootMod,scaleName) {
    let scale = [rootNote]
    let rootNumber = noteNumbers.find((note) => {
        return note[1] === rootNote
        })[0]
    rootNumber += rootMod
    if (rootNumber < 0) {
        rootNumber += 12
    }
    let scaleNumbers = [rootNumber] //reduce extra variable here?

    for (i = 1; i < 7; i++) {
        //get basic letter roots (c,d,e,f...)
        if (scale[i-1] < 'G'){
            scale[i] = String.fromCharCode(scale[i-1].charCodeAt() + 1)
        } else {
            scale[i] = 'A'
        }
        // fill in scale numbers
        //console.log(scaleName.chords[i][0])
        scaleNumbers[i] = scaleNumbers[0] + scaleName.chords[i][0] // fix this
        
    }

    // Add accidentals
    let n = []
    scale.forEach((item,index) => {
        n[index] = noteNumbers.find((note,index) => {
            return note[1] === item && note[0] >= rootNumber - rootMod 
        })[0]

        switch (n[index] - scaleNumbers[index]) {
            case 0: 
            break
            case 1: scale[index] += '\u266D'
            break
            case -1: scale[index] += '\u266F'
            break
            case 2: scale[index] += '\u266D\u266D'
            break
            case -2: scale[index] += '\u266F\u266F'
            break
        }

        // Add chord types (maj, min, dim)
        scale[index] += ' ' + scaleName.chords[index][1]
    })
    
    return scale
}