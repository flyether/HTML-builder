const path = require('path');
const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});
const file = __dirname + '/text.txt';
console.log(file);

function init() {
fs.writeFile(file, '', (error) => {
if (error) return console.error(error.message);
});
}
 
fs.access(file, fs.constants.F_OK, (err) => {
if (err) init();
})
console.log("Write something great!" );

rl.on('line', (line) => {
if (line === 'exit') {
rl.close(); 
}
else 
fs.appendFile(file,`\n ${line}` , function (err) {
if (err) throw err;
});
  

});

process.on("exit", () => {
console.log("I’m sor­ry to see you go... Come back soon! " );
});