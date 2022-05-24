const path = require('path');
const fs = require('fs');
const dir =  __dirname + '/secret-folder';

async function processArray(array, dir ) {

  array.forEach(async (item) => {
    let dirpath = (dir + '/' + item);
    fs.stat(dirpath, function(err, stats) {
      if (err) {
        console.log(err);
      } else if (stats.isDirectory()) {
        scandir(dirpath);
      }
      else{
        var fileSizeInBytes = stats.size;
        console.log(`${path.basename(item, path.extname(item))} - ${path.extname(item).replace(/\./g,' ')} - ${fileSizeInBytes/1024}kb`);
      }
    });
  });
} 


function  scandir(dir) {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.log('error');
      return console.log(err);
    }
    processArray(files, dir);
  });
}

scandir(dir);