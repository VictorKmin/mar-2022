const fs = require('fs').promises;
const fsGeneral = require('fs');

// fs.appendFile('./file.txt', 'HELLO WORDL \n').catch(e => {
//   console.log(e)
// });

// fs.readFile('./file.txt').then(data => {
//   console.log(data);
// })

// fs.unlink('./file.txt').then(value => {
//   console.log(value);
// })

// fs.mkdir('./home_video').catch(e => {
//   console.log(e);
// })

// fs.stat('./file.txt').then(info => {
//   console.log(info.isDirectory(), 'info.isDirectory()');
//   console.log(info.isFile(), 'info.isFile()');
// })

// fs.readdir('./home_video').then(files => {
//   console.log('_______________________');
//   console.log(files);
//
//   for (const file of files) {
//     fs.stat(`./home_video/${file}`).then(info => {
//       if (!info.isFile()) {
//         return;
//       }
//
//       fs.readFile(`./home_video/${file}`).then(fileBuffer => {
//         console.log(`Read file ${file} from './home_video`);
//
//         console.log(fileBuffer.toString());
//       })
//     })
//   }
// });

//
// fs.rename('./style.css', './hello/style.css').catch(e => {
//   console.log(e)
// });

// fs.rmdir('./home_video', { recursive: true }).catch(e => {
//   console.log(e);
// });

// fs.rm('./style.css').catch(e => {
//   console.log(e);
// })

const readStream = fsGeneral.createReadStream('./file.txt');
const writeStream = fsGeneral.createWriteStream('./copy2.txt');

// readStream.on('data', (data) => {
//   writeStream.write(data);
//   console.log(data);
// });
//
// readStream.on('end', () => {
//   console.log('DONE');
// });

readStream.pipe(writeStream)
