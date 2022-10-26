// const chalk  = require('chalk');
const fs = require('fs');
const pathNode = require('node:path');

// Validar si la ruta es absoluta, sino se convierte en relativa
const getAbsolutePath = (userPath) => {
  let pathAbsolute = '';
  if(pathNode.isAbsolute(userPath)){
      pathAbsolute = userPath;
      console.log('----> Tu Ruta Es Absoluta:', pathAbsolute)
  }else{
      pathAbsolute = pathNode.resolve(userPath)
      console.log('----> Cambio de relativa a absoluta', pathAbsolute)
  }
  return pathAbsolute
}

// Obtener Archivos de una carpeta
const getFiles = (path) => {
    // const isFile = fs.statSync(path).isFile()
    // const isDirectory = fs.statSync(path).isDirectory()
    let files = []

    if(fs.statSync(path).isFile()){
    files.push(path)
    // console.log('Es archivo')
    // console.log('FILES:',files)
    }
    else{
        // console.log('--> Es directorio?', isDirectory)
        const filesInDir = fs.readdirSync(path)
            filesInDir.forEach( file => {
            const pathDir = pathNode.join(path, file)
            if(fs.statSync(pathDir).isDirectory()){
            console.log('es carpeta')
            files = files.concat(getFiles(pathDir))
            } else{
            files.push(pathDir)
        }
        // console.log('ARRAY FILES:',files)
        })
        // console.log('files-----', files)
        return files
        // console.log('FILES IN DIR:',filesInDir)
    }
}

const pathUser = getAbsolutePath('carpetaPrueba')
console.log(getFiles(pathUser)) 

// getFiles('E:/Laboratoria-MDLINKS/BOG005-md-links/carpetaPrueba/otroArchivo.txt')


// module.exports = () => {
// };

// const readFiles = (path) => {

//     fs.readFile(path, (err,data)=>{
//     if(err) {
//       console.log('error: ', err);
//     } else {
//       console.log(data.toString());
//     }
//   })
// }

// // De forma relativa y absoluta mi función encuentra el archivo
// // readFiles('./carpetaPrueba/archivoEjemplo.md')
// readFiles('E:/Laboratoria-MDLINKS/BOG005-md-links/carpetaPrueba/archivoEjemplo.md')

// const readFiles = (path,callBack) => {
//     fs.readFile(path, 'utf-8', callBack)
// }

// const CallBackFunction = (err, data) => {
//   if(err) {
//     console.log('error: ', err);
//   } else {
//     console.log('---> Este es el contenido de tu archivo :',data);
//   }
// }

// const extensionFile = (pathFile) => {
//   const extension = path.extname(pathFile)
//   console.log('--> La extensión del archivo es:',extension)
//   return extension;
// }

// const isMdFile = (path) => {
//   const extension = extensionFile(path);
//   if(extension === '.md'){
//     readFiles(path,  CallBackFunction)
//   } else{
//     console.log('x No hay archivos md por leer')
//   }
// }

// isMdFile('E:/Laboratoria-MDLINKS/BOG005-md-links/carpetaPrueba/archivoEjemplo.md')