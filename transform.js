const fs = require('fs')

if (process.argv.length !== 5) {
  console.error('usage: npm run transform <inputfile> <outputfolder>')
}

const inputFile = require(process.argv[3])
const outputFolder = process.argv[4]

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
        } else {
          if (piece.startsWith('Q: ') || piece.startsWith('A: ')) {
            inputFile.texts[n].data[m].pieces[o] = piece.substring(3).trim()
          }
        }
      }
    }
  }
}

const outputFile = `${outputFolder}/${inputFile.name.toLowerCase()}.json`
console.log(`writing -> ${outputFile}`)
fs.writeFileSync(outputFile, JSON.stringify(inputFile, null, 4), 'utf-8')