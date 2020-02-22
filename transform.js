const fs = require('fs')

if (process.argv.length !== 5) {
  console.error('usage: npm run transform <inputfile> <outputfile>')
}

const inputFile = require(process.argv[3])
const outputFile = process.argv[4]

console.log(`writing -> ${outputFile}`)
inputFile.city = inputFile.spatial.split('Greater').join('').split(', UK').join('').trim()
inputFile.age = inputFile.title.split(',')[1].split('-')[0].trim()
inputFile.name = inputFile.title.split('with')[1].split(',')[0].trim()

for (let n = 0; n < inputFile.texts.length; n++) {
  for (let m = 0; m < inputFile.texts[n].data.length; m++) {
    for (let o = 0; o < inputFile.texts[n].data[m].pieces.length; o++) {
      let piece = inputFile.texts[n].data[m].pieces[o]

      if (piece.startsWith('QU: ') || piece.startsWith('AN: ')) {
        inputFile.texts[n].data[m].pieces[o] = piece.substring(4).trim()
      } else {
        if (piece.startsWith('INTERVIEWER: ') || piece.startsWith('INTERVIEWEE: ')) {
          inputFile.texts[n].data[m].pieces[o] = piece.substring(13).trim()
        }
      }
    }
  }
}

fs.writeFileSync(outputFile, JSON.stringify(inputFile, null, 4), 'utf-8')