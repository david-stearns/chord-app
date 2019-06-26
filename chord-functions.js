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

function renderScale(scaleGroup) {


    const scaleAllDiv = (scaleGroup === 1) ? document.querySelector('.scale-all-div') : document.querySelector('.scale-all-div-2')
    scaleAllDiv.innerHTML = ''

    scalesAll.forEach((item) => {
        if ((scaleGroup === 1 && item.show) || (scaleGroup === 2 && item.show2)) {
            let scale = (scaleGroup === 1) ? getScale(ddNote,ddNoteMod,item) : getScale(ddNote2,ddNoteMod2,item)
            const audioChords = scale[1] // Names of audio files
            scale = scale[0] // Chord Names

            const scaleDiv = document.createElement('div') // Scale div
            scaleDiv.classList.add('wrapper')
            scaleAllDiv.appendChild(scaleDiv)
            
            const scaleTitleDiv = document.createElement('div') // Scale title
            if (scaleGroup === 1) {
                scaleTitleDiv.textContent = `${ddNote} ${item.name}`
            } else {
                scaleTitleDiv.textContent = `${ddNote2} ${item.name}`
            }
            
            scaleTitleDiv.classList.add('scale-name')
            scaleDiv.appendChild(scaleTitleDiv)

            let scaleDisplayNumbers = [] // Create an array of chord numbers 
            item.chords.forEach((item)=>{
                scaleDisplayNumbers.push(item[2])
                
            })

            scale.forEach((item,index)=>{
                const chordEl = document.createElement('div') // individual chord div
                const chordNameEl = document.createElement('div')
                const chordNumEl = document.createElement('div')
                
                scaleDiv.appendChild(chordEl)
                chordEl.appendChild(chordNameEl)
                chordEl.appendChild(chordNumEl)
                
                chordEl.classList.add('chord')
                chordNameEl.classList.add('chord-name')
                chordNumEl.classList.add('chord-number')

                chordNameEl.textContent = item
                chordNumEl.textContent = scaleDisplayNumbers[index]

                // audio
                const audioEl = document.createElement('audio')

                const sample = 'audio/' + audioChords[index] +'.mp3'
                audioEl.src = sample
                chordEl.addEventListener('click', (e) => {
                    //console.log(`${item} clicked`)
                    console.log(sample)
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
    let scaleNumbers = [rootNumber] //reduce extra variable here?

    
    for (i = 1; i < 7; i++) {
        //get basic letter roots (c,d,e,f...)
        if (scale[i-1] < 'G'){
            scale[i] = String.fromCharCode(scale[i-1].charCodeAt() + 1)
        } else {
            scale[i] = 'A'
        }
        // fill in scale numbers
        scaleNumbers[i] = scaleNumbers[0] + scaleName.chords[i][0] // fix this
        
    }

    // Chord names for audio playback
    let audioChords = scaleNumbers.slice(0)

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

        audioChords[index] += scaleName.chords[index][1]
    })

    return [scale, audioChords]

}