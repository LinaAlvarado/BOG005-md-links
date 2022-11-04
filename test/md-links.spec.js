const mdLinks = require('../index.js');
const {
  getAbsolutePath,
  getFiles,
  getMdFiles,
  loopFilesMd,
  httpLinks
} = require('../functions.js')


const relativePath = "carpetaPrueba"
const absolutePath = "E:\\Laboratoria-MDLINKS\\BOG005-md-links\\carpetaPrueba"
  describe('getAbsolutePath', () => {
    test('relative path converted to absolute path', () => {
      expect(getAbsolutePath(relativePath)).toBe('E:\\Laboratoria-MDLINKS\\BOG005-md-links\\carpetaPrueba');
    });

    test('absolute path stays the same', () => {
      expect(getAbsolutePath(absolutePath)).toBe('E:\\Laboratoria-MDLINKS\\BOG005-md-links\\carpetaPrueba');
    });

    test('Empty path', ()=>{
      expect(getAbsolutePath("")).toBeFalsy()
    })
  });


  // describe('MdLinks returns an object of arrays with file,href,text')