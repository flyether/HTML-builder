const fs = require('fs');
const path = require('path');
const file = (path.join(__dirname, 'text.txt'));	

let stream = new fs.ReadStream(file, 'utf8');
let data = '';
  
stream.on('data', chunk => data += chunk);
stream.on('end', () => console.log(data));
