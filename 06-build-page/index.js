const path = require('path');
const fs = require('fs').promises;
const dirProjectDist = (path.join(__dirname, '/project-dist'));	
const dirAssetsOriginal = path.join(__dirname, '/assets');
const dirAssetsCopy = path.join(__dirname, '/project-dist/assets');
const index = path.join(__dirname, '/project-dist/index.html');
const style = path.join(__dirname, '/project-dist/style.css');
const dirStyles = (path.join(__dirname, '/styles'));
const templateTags = path.join(__dirname, '/template.html');
const components = path.join(__dirname, '/components');



(async ()=> {
 
  let  status = await fs.stat(dirProjectDist).catch((error)=>{});

  // проверяем есть ли папка и если есть удалим ее и создадим новую пустую
  if (status) {
    await	fs.rm(dirProjectDist, { recursive: true });
   
  }
  await fs.mkdir(dirProjectDist);

  // создаем файлы index и style
 

  await fs.writeFile(style, '', 'utf8');
 

  CreateHTML (templateTags, components);
  AppendStyle(dirStyles);
  // копируем все файлы из папки assets в папку assets в project-dist
  copyDir(dirAssetsOriginal, dirAssetsCopy);



})()
  .catch(error=>{
    console.error('catch error',error);
  });






function copyDir(dir_from, dir_to) { 
  (async ()=> {
 
    let status = await fs.stat(dir_from).catch((error)=>{});
    if (!status) {
      console.error('not found ', dir_from);
      return;
    }
 
    status = await fs.stat(dir_to).catch((error)=>{});
    if (status) {
      await	fs.rm(dir_to, { recursive: true });
    }
 
    await fs.mkdir(dir_to);
    
    copyRecursive(dir_from, dir_to);
 
    async function copyRecursive(from, to) {
      let files = await fs.readdir(from);
   
      for (let file of files) {
        let status = await fs.stat(from + '/' + file).catch((error)=>{});
        if (status.isDirectory()) {
          await fs.mkdir(to + '/' + file);
          await copyRecursive(from + '/' + file, to + '/' + file);
        }
        else {
          await fs.copyFile(from + '/' + file, to + '/' + file);
        }
      }
    }
 
  })()
    .catch(error=>{
      console.error('catch error',error);
    });
}
 

 
async function AppendStyle(from) {
  let files = await fs.readdir(from);
 
  for (let file of files) {
    let status = await fs.stat(from + '/' + file).catch((error)=>{});
    
    if (status.isFile()) {
      if (path.extname(file).replace(/\./g,' ').trim() === 'css') {
        let content = [];
        let arritem = await fs.readFile(from + '/' + file, 'utf8');
        content.push(arritem);
        await fs.appendFile(style, content, 'utf8');
      }
    }
  }
}




async function CreateHTML (templateTags, components) {
  let tagsHTML = await fs.readFile(templateTags, 'utf8');
  let componentsHTML = await fs.readdir(components);
  
   for (let file of componentsHTML) {
     let status = await fs.stat(components + '/' + file).catch((error)=>{});
     
     if (status.isFile()) {
       if (path.extname(file).replace(/\./g,' ').trim() === 'html') {

    let arritem = await fs.readFile(components + '/' + file, 'utf8');
         tagsHTML = tagsHTML.replace(new RegExp ('{{'+path.basename(file, path.extname(file))+'}}', 'g'), arritem );

         
      }

         await fs.writeFile(index, tagsHTML, 'utf8');

   }
   }

 }

