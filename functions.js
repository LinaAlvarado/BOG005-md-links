// const chalk  = require('chalk');
const { rejects } = require('assert');
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
    let files = []

    if(fs.statSync(path).isFile()){
        files.push(path)
    }
    else{
        const filesInDir = fs.readdirSync(path)
        filesInDir.forEach( file => {
                const pathDir = pathNode.join(path, file)
                if(fs.statSync(pathDir).isDirectory()){
                    files = files.concat(getFiles(pathDir))
                } else{
                    files.push(pathDir)
                }
        })
    }
    return files
}

// Filtar archivos md
const getMdFiles = (arrayFiles) => {
    const mdFiles = arrayFiles.filter( file => pathNode.extname(file) === '.md')
    console.log('solo archivos md', mdFiles)
    return mdFiles
}

// Leer Archivos md
const readFiles = (file) => {
    return new Promise ((resolve, reject)=>{
        fs.readFile(file, 'utf8', (err, data)=>{
                if (err) {
                    throw err;
                } else {
                    resolve(data)
                }
            })
    })
}

// Iterar en el array de archivos y retornar promesas 
const loopFilesMd = (arrayMd) => {
    let arrayPromises =  arrayMd.map((file)=>{
        return readFiles(file)
    })
    return Promise.all(arrayPromises).then(res=>res)
}

const pathUser = getAbsolutePath('E:/Laboratoria-MDLINKS/BOG005-md-links/carpetaPrueba');
const allFiles = getFiles(pathUser);
const allMdFiles = getMdFiles(allFiles)
// readFiles('E:/Laboratoria-MDLINKS/BOG005-md-links/carpetaPrueba/segundoArchivo.md').then((res) =>{ console.log('leyendo archivos----', res)})
loopFilesMd(allFiles).then((res)=> console.log(res))
