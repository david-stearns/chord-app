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
const majorScale = [[0,'maj'],[2,'min'],[4,'min'],[5,'maj'],[7,'maj'],[9,'min'],[11,'dim']]
const minorScale = [[0,'min'],[2,'dim'],[3,'maj'],[5,'min'],[7,'min'],[8,'maj'],[10,'maj']]

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
        scaleNumbers[i] = scaleNumbers[0] + scaleName[i][0]//scaleName[i,0]
        
    }

    //console.log(scaleNumbers)

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
        scale[index] += ' ' + scaleName[index][1]
    })

    return scale
}

// myScale = getScale('E',1,minorScale)

// console.log(myScale)
