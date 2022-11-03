const chalk  = require('chalk');
const {
    getAbsolutePath,
    getFiles,
    getMdFiles,
    loopFilesMd,
    httpLinks
} = require('./functions.js')

const mdLinks = (path, options = { validate: false }) => {
    return new Promise ( (resolve, reject)=>{
        try{
            const pathUser = getAbsolutePath(path);
            const allFiles = getFiles(pathUser);
            const allMdFiles = getMdFiles(allFiles)
            if( options.validate == true){
                loopFilesMd(allMdFiles)
                .then((res) => httpLinks(res))
                .then((res) => resolve(res))
            }
            else if( options.validate == false){
                loopFilesMd(allMdFiles)
                .then((res) => resolve(res))
            } 
        } catch (error){
            if(error.code == 'ENOENT'){
                reject(chalk.bgRed.bold('Invalid Path ❌,Enter a valid path . '))
            } else{
                reject('Error ❌')
            }
            reject(error)
    }})
}

module.exports = {
    mdLinks,
}
