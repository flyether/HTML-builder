const path = require('path');
const fs = require('fs').promises;
const dir_from = (path.join(__dirname, '/files'));	
const dir_to = path.join(__dirname, '/files-copy');

function copyDir() { 
  (async ()=> {

    let status = await fs.stat(dir_from).catch((error)=>{});
    if (!status) {
      console.error('not found ', dir_from);
      return;
    }

    status = await fs.stat(dir_to).catch((error)=>{});
    if (status) {
      await	fs.rm(dir_to, { recursive: true });
      console.log('deleted', dir_to);
    }

    await fs.mkdir(dir_to);
    console.log('create', dir_to);

    copyRecursive(dir_from, dir_to);

    async function copyRecursive(from, to) {
      let files = await fs.readdir(from);
  
      for (let file of files) {
        let status = await fs.stat(from + "/" + file).catch((error)=>{});
        if (status.isDirectory()) {
          await fs.mkdir(to + "/" + file);
          console.log('create', to + "/" + file);
          console.log('recursion, go to '+ from + "/" + file);
          await copyRecursive(from + "/" + file, to + "/" + file);
        }
        else {
          await fs.copyFile(from + "/" + file, to + "/" + file);
          console.log('copy', from + "/" + file,'to', to + "/" + file);
        }
      }
      console.log('finished processing',from);
    }

  })()
    .catch(error=>{
      console.error('catch error',error);
    });
}




  
copyDir();