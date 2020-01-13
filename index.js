// install packages
const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const electron = require("electron-html-to");
const generateHTML = require("./generateHTML.js");

let conversion = electron({
    converterPath: electron.converters.PDF
  });
  console.log()

// prompt for username and color
function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "username",
            message: "Enter your GitHub username"
        },
        {
            type: "checkbox",
            name: "color",
            message: "Enter your favorite color",
            choices: [
                "green",
                "blue",
                "pink",
                "red"
            ]
        }
    ])
}


// call prompt user function with axios promise
promptUser().then(function({username,color}) {
    // connect to github api
    const queryUrl = `https://api.github.com/users/${username}`;
    // get user color
    const colorChoice = color;
    //console.log(colorChoice);

    axios.get(queryUrl).then(function(res) {

        // create html
        let html = generateHTML(res.data,colorChoice);
        writeToFile(html);
        
        // generate pdf
        //electron.createWriteStream('./test.pdf');
    });
});


function writeToFile(data) {
    fs.writeFile('index.html', data, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("success!");
    });
}

conversion({ html: 'generateHTML' }, function(err, result) {
    if (err) {
      return console.error(err);
    }

    result.stream.pipe(electron.createWriteStream('./test.pdf'));
    conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
  });

// function init() {
//     console.log('init function');
//     try {
//         const answers = await promptUser();
//         const html = generateHTML(answers);
//         writeToFile();
//         console.log('success?')
//     } catch(err) {
//         console.log(err)
//     }
// }

//init();
