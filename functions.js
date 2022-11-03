const chalk  = require('chalk');
const fs = require('fs');
const pathNode = require('node:path');
const marked = require('marked');
const fetch = require('node-fetch');

// Validar si la ruta es absoluta, sino se convierte en relativa
const getAbsolutePath = (userPath) => {
let pathAbsolute = '';
    if(pathNode.isAbsolute(userPath)){
        pathAbsolute = userPath;
}else{
        pathAbsolute = pathNode.resolve(userPath)
}
return pathAbsolute
}

// Obtener Archivos de una carpeta
const getFiles = (path) => {
    let files = []
    // try{
        if(fs.statSync(path).isFile()){
            files.push(path)
        }
        else if(fs.statSync(path).isDirectory()){
            const filesInDir = fs.readdirSync(path)
            filesInDir.forEach( file => {
                    const pathDir = pathNode.join(path, file)
                    files = files.concat(getFiles(pathDir))
            })
        }
    // } catch (error){
    //     console.log(chalk.bgRed.bold('Ruta invalida ❌, ingresa una ruta valida. '))
    // }
    return files
}

// Filtar archivos md
const getMdFiles = (arrayFiles) => {
    const mdFiles = arrayFiles.filter( file => pathNode.extname(file) === '.md')
    // console.log(chalk.bgYellow.bold('-> Estos son tus archivos .md '), mdFiles)
    return mdFiles
}

// Leer Archivos md y obtener links
const readFiles = (file) => {
    return new Promise ((resolve, reject)=>{
        let links = []
        fs.readFile(file, 'utf8', (err, data)=>{
                if (err) {
                    console.log('error', err) ;
                    reject(err)
                } else {
                    // resolve(data)
                    let renderer = new marked.Renderer();
                    renderer.link = function (href, title, text) {
                      if (href.includes('http')) {
                        links.push({
                          file: file,
                          href: href,
                          text: text,
                        });
                      }
                    };
                    marked.marked(data, { renderer: renderer });
                    resolve(links);
                }
            })
            return Promise.all(links).then((res) => res.flat());
    })
}

// Iterar en el array de archivos y retornar promesas 
const loopFilesMd = (arrayMd) => {
    let arrayPromises =  arrayMd.map((file)=>{
        return readFiles(file)
    })
    return Promise.all(arrayPromises).then(res=>res.flat())
}

// Validar Links 
const httpLinks = (allLinks) => {
let promisesLinks = allLinks.map( link => {
    return fetch(link.href) 
    .then(res => {
        if (res.status >= 200 && res.status < 400){
            return ({ href: link.href,
                      file: link.file, 
                      text: link.text, 
                      status: res.status, 
                      OK: res.statusText })
        }
        else if( res.status >= 400 && res.status < 600){
            return ({ href: link.href,
                file: link.file, 
                text: link.text, 
                status: res.status, 
                OK: "fail" })
        }
    })
})
    return Promise.all(promisesLinks)
}

module.exports = {
    getAbsolutePath,
    getFiles,
    getMdFiles,
    loopFilesMd,
    httpLinks
}

