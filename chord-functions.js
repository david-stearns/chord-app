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

function renderAllScales() {
    scaleColorNo = -1
    renderScale(1)
    renderScale(2)

}

function renderScale(scaleGroup) {
    const scaleAllDiv = (scaleGroup === 1) ? document.querySelector('#scale-all-div') : document.querySelector('#scale-all-div-2')
    scaleAllDiv.innerHTML = ''

    scalesAll.forEach((item) => {
        if ((scaleGroup === 1 && item.show) || (scaleGroup === 2 && item.show2)) {
            let scale = (scaleGroup === 1) ? getScale(ddNote,ddNoteMod,item) : getScale(ddNote2,ddNoteMod2,item)
            const audioChords = scale[1] // Store names of audio files
            scale = scale[0] // Store chord Names

            const scaleDiv = document.createElement('div') // Scale div
            scaleDiv.classList.add('scale')
            scaleAllDiv.appendChild(scaleDiv)
            
            const scaleTitleDiv = document.createElement('div') // Scale title
    
            if (scaleGroup === 1) {
                scaleTitleDiv.textContent = `${ddNoteTitle} ${item.name}`
                scaleDiv.id = `${ddNote} ${item.name}` // for scale playback test
            } else {
                scaleTitleDiv.textContent = `${ddNote2Title} ${item.name}`
                scaleDiv.id = `${ddNote2} ${item.name}`// for scale playback test
            }
            
            scaleTitleDiv.classList.add('scale-name')
            scaleDiv.appendChild(scaleTitleDiv)

            let scaleDisplayNumbers = [] // Create an array of chord numbers 
            item.chords.forEach((item)=>{
                scaleDisplayNumbers.push(item[2])
                
            })

            scaleColorNo ++;
            if (scaleColorNo > scaleColors.length) {
                scaleColorNo = 0;
            }

            scaleColor = scaleColors[scaleColorNo]

            scale.forEach((item,index)=>{
                const chordEl = document.createElement('div') // individual chord div
                const chordNameEl = document.createElement('div')
                const chordNumEl = document.createElement('div')
                const chordNumTextEl = document.createElement('div')

                scaleDiv.appendChild(chordEl)
                chordEl.appendChild(chordNameEl)
                chordEl.appendChild(chordNumEl)
                chordNumEl.appendChild(chordNumTextEl)
                
                chordEl.classList.add('chord')
                chordEl.classList.add(scaleColor)
                chordNameEl.classList.add('chord-name')
                chordNumEl.classList.add('chord-number')
                chordNumTextEl.classList.add('chord-number-text')

                chordNameEl.textContent = item
                chordEl.id = (`${scaleDiv.id}`+`${scale[0]}`).replace(/ /g,"-") // for scale playback test
                // chordNumEl.textContent = scaleDisplayNumbers[index]
                chordNumTextEl.textContent = scaleDisplayNumbers[index]

                //Audio playback on click
                const audioEl = document.createElement('audio')
                const sample = 'audio/' + audioChords[index] +'.mp3'
                audioEl.src = sample
                chordEl.addEventListener('click', (e) => {
                    audioEl.pause();
                    audioEl.currentTime = 0;
                    audioEl.play()

                })
            })

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
    let scaleNumbers = [rootNumber]

    for (i = 1; i < 7; i++) {
        // Get basic letter roots (c,d,e,f...)
        if (scale[i-1] < 'G'){
            scale[i] = String.fromCharCode(scale[i-1].charCodeAt() + 1)
        } else {
            scale[i] = 'A'
        }
        // Fill in scale numbers
        scaleNumbers[i] = scaleNumbers[0] + scaleName.chords[i][0]        
    }

    // Chord names for audio playback
    let audioChords = scaleNumbers.slice(0)

    // Add accidentals (b,#,etc.)
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
        audioChords[index] += scaleName.chords[index][1]
    })

    return [scale, audioChords]
}