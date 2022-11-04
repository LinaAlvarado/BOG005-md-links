const linksArray = [
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

const statsLinks = (linksFolder) => {

    const getUniqueLinks = (arrayLinks) =>{
        const uniqueLinks = arrayLinks.reduce((counter, link)=>{
            counter[link.href] = ++counter[link.href] || 0
            return counter
        }, {})
        
        const linksDuplicates = arrayLinks.filter( (link) =>{
            return uniqueLinks[link.href]} )
            const linksUniques =  arrayLinks.length - linksDuplicates.length
            return linksUniques
    }
    
   
 const total = {
       'Total' : linksFolder.length,
       'Unique' : getUniqueLinks(linksFolder)   
    }
   
    return total
   }

   console.log(statsLinks(linksArray))



