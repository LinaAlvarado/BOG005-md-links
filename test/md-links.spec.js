const {mdLinks}  = require('../index.js');
const {cli} = require('../cli.js');
const {
  getAbsolutePath,
  getFiles,
  getMdFiles,
  loopFilesMd,
  httpLinks,
  getUniqueLinks,
  statsLinks,
  validateStatsLinks
} = require('../functions.js')

const userPath = process.argv[2]
const argv = [
  "mdLinks",
  "carpetaPrueba",
  "--v"
  ]
const relativePath = "carpetaPrueba"
const absolutePath = "E:\\Laboratoria-MDLINKS\\BOG005-md-links\\carpetaPrueba"
const files = ["E:\\Laboratoria-MDLINKS\\BOG005-md-links\\carpetaPrueba\\archivoEjemplo.md", "E:\\Laboratoria-MDLINKS\\BOG005-md-links\\carpetaPrueba\\carpetaArchivosNoMd\\archivotexto.txt", "E:\\Laboratoria-MDLINKS\\BOG005-md-links\\carpetaPrueba\\carpetaArchivosNoMd\\estilos.css", "E:\\Laboratoria-MDLINKS\\BOG005-md-links\\carpetaPrueba\\carpetaArchivosNoMd\\index.html", "E:\\Laboratoria-MDLINKS\\BOG005-md-links\\carpetaPrueba\\otraCarpeta\\otroArchivomd.md", "E:\\Laboratoria-MDLINKS\\BOG005-md-links\\carpetaPrueba\\otraCarpeta\\subCarpeta\\pruebas.txt", "E:\\Laboratoria-MDLINKS\\BOG005-md-links\\carpetaPrueba\\otraCarpeta\\subCarpeta\\subArchivo.md", "E:\\Laboratoria-MDLINKS\\BOG005-md-links\\carpetaPrueba\\otroArchivo.txt", "E:\\Laboratoria-MDLINKS\\BOG005-md-links\\carpetaPrueba\\segundoArchivo.md"]
const mdFiles = ["E:\\Laboratoria-MDLINKS\\BOG005-md-links\\carpetaPrueba\\archivoEjemplo.md", "E:\\Laboratoria-MDLINKS\\BOG005-md-links\\carpetaPrueba\\otraCarpeta\\otroArchivomd.md",  "E:\\Laboratoria-MDLINKS\\BOG005-md-links\\carpetaPrueba\\otraCarpeta\\subCarpeta\\subArchivo.md", "E:\\Laboratoria-MDLINKS\\BOG005-md-links\\carpetaPrueba\\segundoArchivo.md"]
const defaultArray = [
  { 
  href: "https://github.com/LinaAlvarado",
  file:  "E:\\Laboratoria-MDLINKS\\BOG005-md-links\\carpetaPrueba\\otraCarpeta\\subCarpeta\\subArchivo.md", 
  text:  "Perfil GitHub, LINK 4"
  },
  { 
  href: "https://developer.mozilla.org/es/docs/Web/HTTP/Message",
  file:  "E:\\Laboratoria-MDLINKS\\BOG005-md-links\\carpetaPrueba\\otraCarpeta\\subCarpeta\\subArchivo.md", 
  text:  "Link malo"
  }
]
const arrayValidate = [
  { 
  href: "https://github.com/LinaAlvarado",
  file:  "E:\\Laboratoria-MDLINKS\\BOG005-md-links\\carpetaPrueba\\otraCarpeta\\subCarpeta\\subArchivo.md", 
  text:  "Perfil GitHub, LINK 4",
  status: 200, 
  OK: "OK"
  },
  {
  href: "https://developer.mozilla.org/es/docs/Web/HTTP/Message",
  file:  "E:\\Laboratoria-MDLINKS\\BOG005-md-links\\carpetaPrueba\\otraCarpeta\\subCarpeta\\subArchivo.md", 
  text:  "Link malo",
  status: 404, 
  OK: "fail"
  }
]
const uniqueLinksArray = [
  { href: "https://www.youtube.com/watch?v=FoCNedUiVqU",
    file:  "E:\\Laboratoria-MDLINKS\\BOG005-md-links\\carpetaPrueba\\archivoEjemplo.md", 
    text:  "Aprende Sobre Figma, LINK 2"
  },
  { href: "https://github.com/LinaAlvarado",
    file:  "E:\\Laboratoria-MDLINKS\\BOG005-md-links\\carpetaPrueba\\otraCarpeta\\subCarpeta\\subArchivo.md", 
    text:  "Perfil GitHub, LINK 4"
  },
  { href: "https://github.com/LinaAlvarado",
    file:  "E:\\Laboratoria-MDLINKS\\BOG005-md-links\\carpetaPrueba\\otraCarpeta\\subCarpeta\\subArchivo.md", 
    text:  "Perfil GitHub, LINK 4"
  },
  { href: " https://www.youtube.com/watch?v=PQinHHCFsVc&ab_channel=AdaLovecode-Didacticode",
    file:  "E:\\Laboratoria-MDLINKS\\BOG005-md-links\\carpetaPrueba\\segundoArchivo.md", 
    text:  " Video Youtube"
  },
  { href: " https://www.youtube.com/watch?v=PQinHHCFsVc&ab_channel=AdaLovecode-Didacticode",
    file:  "E:\\Laboratoria-MDLINKS\\BOG005-md-links\\carpetaPrueba\\segundoArchivo.md", 
    text:  " Video Youtube"
  },
   ]
  
   const statsLinksArray = {
    'Total' : 5,
    'Unique' : 1  
   }

   const statsValidateLinksArray = {
    'Total' : 5,
    'Unique' : 1 ,
    'Broken' : 0
   }
  describe('getAbsolutePath', () => {
    test('relative path converted to absolute path', () => {
      expect(getAbsolutePath(relativePath)).toBe('E:\\Laboratoria-MDLINKS\\BOG005-md-links\\carpetaPrueba');
    });

    test('absolute path stays the same', () => {
      expect(getAbsolutePath(absolutePath)).toBe('E:\\Laboratoria-MDLINKS\\BOG005-md-links\\carpetaPrueba');
    });

    test('Empty path return false', ()=>{
      expect(getAbsolutePath("")).toBeFalsy()
    })
  });

describe('getFiles and MdFiles', ()=>{
  test('should return the array of files', ()=>{
    expect(getFiles(absolutePath)).toEqual(files)
  })

  test('should return the array of md files', ()=>{
    expect(getMdFiles(files)).toEqual(mdFiles)
  })
})


  describe('MdLinks Deaful Behavior', () =>{
   test('with absolute path, should returns a promise [{},{}..]', ()=>{
     mdLinks("E:/Laboratoria-MDLINKS/BOG005-md-links/carpetaPrueba/otraCarpeta/subCarpeta").then((res) =>{
      expect(res).toEqual(defaultArray)
     })
   });
  
   test('should return an error if path is invalid', ()=>{
      expect(mdLinks("E:/Laboratoria-MDLINKS/BOG005-md-linkstaPrueba/otraCarpubCarpeta")).rejects.toMatch("Invalid Path ❌,Enter a valid path . ")
    });

    test('if don"t have md files should reject "no md files"', ()=>{
      expect(mdLinks("carpetaPrueba\\carpetaArchivosNoMd")).rejects.toMatch('No md files')
    });

    test('if don"t have md files should reject "no md files"', ()=>{
      expect(mdLinks("carpetaPrueba\\carpetaArchivosNoMd", {validate: true})).rejects.toMatch('No md files')
    });
   })

   test('with relative path, should returns a promise [{},{}..]', ()=>{
    mdLinks("carpetaPrueba/otraCarpeta/subCarpeta").then((res) =>{
     expect(res).toEqual(defaultArray)
    })
  });

  describe('MdLinks with --validate', ()=>{
   test('should returns an object with href,file,status,and Ok o Fail message', ()=>{
    mdLinks("E:/Laboratoria-MDLINKS/BOG005-md-links/carpetaPrueba/otraCarpeta/subCarpeta", {validate: true}).then((res)=>{
      expect(res).toEqual(arrayValidate)
    })
   })
  });

  describe('getUniqueLinks function', ()=>{
   test('should returns the numbers of unique links', ()=>{
    expect(getUniqueLinks(uniqueLinksArray)).toBe(1)
   });

   test('should returns the numbers of unique links', ()=>{
    expect(getUniqueLinks(uniqueLinksArray)).not.toBe(2)
  })
  })

  describe('statsLinks should return the total of links', ()=>{
    test('an array of 5 links, should return 1 unique link', ()=>{
      expect(statsLinks(uniqueLinksArray)).toEqual(statsLinksArray)
    })

    test('validateStatsLinks shouls return the total, unique and broken Links', ()=>{
      expect(validateStatsLinks(uniqueLinksArray)).toEqual(statsValidateLinksArray)
    })
  })

  describe('function httpLinks', ()=>{
   test('return a promise with validated links', ()=>{
    httpLinks(defaultArray).then((res) =>{
      expect(res).toEqual(arrayValidate)
    })
   });
  })