const path = require('path');
const fs = require('fs');
const dir =  __dirname + '/secret-folder';

async function processArray(array ) {

array.forEach(async (item) => {
let dirpath = (dir + '/' + item);
await fs.stat(dirpath, function(err, stats) {
if (err) {
console.log(err);
} else 
var fileSizeInBytes = stats.size;
console.log(`${path.basename(item, path.extname(item))} - ${path.extname(item).replace(/\./g,' ')} - ${fileSizeInBytes/1024}kb`);
});
})

}

fs.readdir(dir, (err, files) => {

if (err) {
console.log('error')
return console.log(err)
}

processArray(files);
});

