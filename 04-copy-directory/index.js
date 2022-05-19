const path = require('path');
const fs = require('fs').promises;
const dir_from = (path.join(__dirname, '/files'));	
const dir_to = path.join(__dirname, '/files-copy');


(async function copyDir(){

  let status = await fs.stat(dir_from).catch((error)=>{});
  if (!status) {
    console.error('не найден',dir_from);
    return;
  }

  status = await fs.stat(dir_to).catch((error)=>{});

  if (status) {
    await	fs.rm(dir_to, { recursive: true });
    console.log('удалили',dir_to);
  }

  await fs.mkdir(dir_to);
  console.log('создали',dir_to);

  copyRecursive(dir_from,dir_to);

  async function copyRecursive(from,to) {
    let files=await fs.readdir(from);
    for (const file of files) {
      let st=await fs.stat(from+"/"+file).catch((error)=>{});
      if (st.isDirectory()) {
        await fs.mkdir(to+"/"+file);
        console.log('создали',to+"/"+file);
        console.log('рекурсия, идем в '+from+"/"+file);
        await copyRecursive(from+"/"+file,to+"/"+file);
      }
      else {
        await fs.copyFile(from+"/"+file,to+"/"+file);
        console.log('копируем',from+"/"+file,'в',to+"/"+file);
      }
    }
    console.log('закончена обработка',from);
  }

})()
  .catch(error=>{
    console.error('словили ошибку',error);
  });






  
