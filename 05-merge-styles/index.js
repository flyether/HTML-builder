const path = require('path');
const fs = require('fs').promises;
const dirStyles = (path.join(__dirname, '/styles'));	
const dirBundle = path.join(__dirname, '/project-dist/bundle.css');

console.log(dirBundle)

function createBundle() { 
  (async ()=> {
 
    let status = await fs.stat(dirStyles ).catch((error)=>{});
    if (!status) {
      console.error('not found ', dirStyles);
      return;
    }
 
    status = await fs.stat(dirBundle).catch((error)=>{});
    if (status) {
      await	fs.rm(dirBundle, { recursive: true });
      console.log('deleted', dirBundle);
    }
 
    await fs.writeFile(dirBundle, '', 'utf8');
    console.log('create', dirBundle);
 
    AppendArray(dirStyles);
 
    async function AppendArray(from) {
      let files = await fs.readdir(from);
     
      for (let file of files) {
        let status = await fs.stat(from + "/" + file).catch((error)=>{});
        
        if (status.isFile()) {
          if (path.extname(file).replace(/\./g,' ').trim() === 'css') {
            let content = [];
            let arritem = await fs.readFile(from + "/" + file, 'utf8');
            content.push(arritem);
            await fs.appendFile(dirBundle, content, 'utf8');
            console.log('append', dirBundle);
          }
      //      await fs.mkdir(to + "/" + file);
      //      console.log('create', to + "/" + file);
      //      console.log('recursion, go to '+ from + "/" + file);
      //      await copyRecursive(from + "/" + file, to + "/" + file);
      //    }
      //    else {
      //      await fs.copyFile(from + "/" + file, to + "/" + file);
      //      console.log('copy', from + "/" + file,'to', to + "/" + file);
         }
       }
       console.log('finished processing',from);
     }
 
   })()
     .catch(error=>{
       console.error('catch error',error);
     });
 }
 
 
 
 
   
createBundle();