/* eslint-disable */

const fs = require('fs');
const path = require('path');

const pathName = path.join(__dirname, '/books/');

// this is the path to the MyClippings.txt file
const file = process.argv[2];

fs.mkdir(pathName, { recursive: true }, (error) => {
    if(error) {
        throw error;
    }
    else {
        console.log(`successfully created the dir: ${pathName}`);
    }
});


fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
        throw err;
    }

    // the data is split into a new array called clippings
    const clippings = data.split('==========');

    // declare an empty object that will hold the books & highlights
    const books = {};

    for(let i = 0; i < clippings.length; i++) {

        // split each clipping in clippings into component parts whenever there's a new line
        let clipping = clippings[i].split('\r\n');
        clipping = clipping.filter(e => e.length);

        // in case the entry is blank (seems like the last entry is always blank based on the txt file format)
        if (clipping.length === 0) {
          continue; // a way to skip a single iteration of a loop;
        }
        // extract and assign title (and author) to title
        // TODO: separate title and author
        let title = clipping[0];

        // extract and assign the highlight
        let highlight = clipping[2];

        /* TODO: get other meta details, eg location of highlight and date, and whether it is a highlight or a note.
           - these are in clipping[1], need to extract the relevant parts
        */
        if (!highlight) {
          continue;
        };

        if (books[title]) {
          books[title].push(highlight);
        }
        else {
          books[title] = [highlight];
        }
    }

    // Loop through each book and write its contents to output file

    Object.keys(books).forEach((title) => {
      const highlights = books[title];
      txtFilePath = pathName + title + '.md';

      for (let i = 0; i < highlights.length; i++) {
        // conditional write function since we shouldn't append to the same files again and again when we run the script multiple times    
        
        function write(text) {
          if (i === 0) {
            fs.writeFile(txtFilePath, text + "\n\n", (err) => {
              if (err) throw err;
            })
          } else {
            fs.appendFile(txtFilePath, text + "\n\n", (err) => {
              if (err) throw err;
            })
          }
        }
        
        write(highlights[i]);
      }
    });
});

// Using fs sync methods with utf8 encoding because I expect the file sizes won't be TOO big 
// anything larger than (or even approaching) the memory allocation of the Node.js runtime will cause issues
// that can be resolved by using readstreams and processing files chunk by chunk, but the logic is far trickier to write
function verySimplified(inputFilePath = process.argv[2]) {
  const booksDir = path.join(__dirname, "books");
  // making our books dir if it doesn't exist
  const booksDirExists = fs.existsSync(booksDir);
  if (!booksDirExists) fs.mkdirSync(booksDir);

  const imputFileText = fs.readFileSync(inputFilePath, "utf8");
  const previouslySeenTitles = new Set();

  // looping over entries from the input file
  imputFileText.split(/={10}/).forEach(clipping => {
    // parsing the title and highlight from each entry
    const lines = clipping.split("\n").filter(line => line);
    if (lines.length === 0) return;
    const [title, _, highlight] = lines;

    // conditionally writing/appending the highlight to output file
    const seenBefore = previouslySeenTitles.has(title);
    const bookFilePath = path.join(__dirname, "books", `${title}.txt`);
    fs[seenBefore ? "appendFileSync" : "writeFileSync"](bookFilePath, `${seenBefore && "\n\n"}${highlight}`, "utf8");
    previouslySeenTitles.add(title);
  });
}