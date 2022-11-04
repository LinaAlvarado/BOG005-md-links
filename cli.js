const chalk  = require('chalk');
const figlet = require('figlet');
const {mdLinks} = require('./index.js');
const {statsLinks, validateStatsLinks} = require('./functions.js')
const userPath = process.argv[2]
const argvUser = process.argv 

const cli = (route, argv)=>{

 if(route === undefined || null){
    console.log(chalk.bgYellow(" Ups!Enter a path ⚠ "))
 } else if(argv.includes('--sv') || (argv.includes('--validate') ||argv.includes('--v')) && (argv.includes('--stats') ||argv.includes('--s')) ){
    mdLinks(route, {validate: true})
    .then((res)=>{
        const validatelinks = validateStatsLinks(res)
        console.table(validatelinks)
    })
 } else if (argv.includes('--validate') ||argv.includes('--v') ){
    mdLinks( route, {validate : true})
    .then((res) => {
      if(res.length === 0){
         return console.log(chalk.bgYellow.bold('no links found ⚠ '))
      } 
      res.forEach((link)=> console.log(chalk.yellow.bold.italic('File > ' + link.file),chalk.magenta.bold.underline('Link > ' +link.href), chalk.bgMagenta.bold('Status > ' +link.status, link.OK), chalk.blue.bold('Text > ' +link.text)))} )
    .catch((error) => console.error(chalk.bgRed.bold(error)))
 } else if(argv.includes('--stats') ||argv.includes('--s')){
    mdLinks(route)
    .then((res) => {
        const stats = statsLinks(res)
        console.table(stats)
    })
 } else if( argv.includes('--help')){
    console.log(chalk.bold.blue(figlet.textSync('Mdlinks', {
        font: 'Big',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 100,
    })));
    console.log(chalk.blue.bold.italic('Options - Function'))
    console.log(chalk.yellow.bold('-> mdLinks <Path>'),'\n', chalk.yellow('Show links with their text and path'))
    console.log(chalk.green.bold('-> mdLinks <Path> --validate o --v'),'\n', chalk.green('Displays links with their text, path, status and "ok" or "fail" message'))
    console.log(chalk.magenta.bold('-> mdLinks <Path> --stats o --s'),'\n', chalk.magenta('Shows the statistics of total links found and unique links.'))
    console.log(chalk.cyan.bold('-> mdLinks <Path> --sv o --stats --validate o --validate --stats'),'\n', chalk.cyan('Shows the statistics of total links found and unique links and broken links.'))
 } else if (argv.length === 3){
    mdLinks(route)
    .then((res) => { 
      if(res.length === 0){
         return console.log(chalk.bgYellow.bold('no links found ⚠ '))
      }
      res.forEach((link)=> console.log(chalk.yellow.bold.italic('File > ' + link.file), chalk.magenta.bold.underline('Link > ' +link.href), chalk.blue.bold('Text > ' +link.text)))})
    .catch((error) => console.error(chalk.bgRed.bold(error)))
 } else if( !(argv.includes('--validate') ||argv.includes('--v')) && !(argv.includes('--stats') ||argv.includes('--s')) && !(argv.includes('--sv')) ){
    console.log(chalk.bgYellow.bold(' 🥵 Enter a valid command'),'\n' , chalk.yellow.bold(' See the commands --help'))
 } 
 }


cli(userPath, argvUser)
