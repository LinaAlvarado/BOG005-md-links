const chalk  = require('chalk');
const {mdLinks} = require('./index.js');
const {statsLinks, validateStatsLinks} = require('./functions.js')
const userPath = process.argv[2]
const argvUser = process.argv 

const cli = (route, argv)=>{
 if(route === undefined || null){
    console.log(chalk.bgYellow(" Ups! Ingresa una ruta ⚠ "))
 } else if (argv.includes('--validate') ||argv.includes('--v') ){
    mdLinks( route, {validate : true}).then((res) => res.forEach((link)=> console.log(chalk.yellow.bold.italic('Archivo > ' + link.file),chalk.magenta.bold.underline('Link > ' +link.href), chalk.bgMagenta.bold.underline('Status > ' +link.status, link.OK), chalk.blue.bold('Texto > ' +link.text))))
    .catch((error) => console.error(error))
 } else if(argv.includes('--stats') ||argv.includes('--s')){
    mdLinks(route).then((res) => {
        const stats = statsLinks(res)
        console.table(stats)
    })
 } else if(argv.includes('--sv')){
    mdLinks(route, {validate: true}).then((res)=>{
        const validatelinks = validateStatsLinks(res)
        console.table(validatelinks)
    })
 }
   else{
    mdLinks(route).then((res) => res.forEach((link)=> console.log(chalk.yellow.bold.italic('Archivo > ' + link.file), chalk.magenta.bold.underline('Link > ' +link.href), chalk.blue.bold('Texto > ' +link.text))))
 }
}





cli(userPath, argvUser)
