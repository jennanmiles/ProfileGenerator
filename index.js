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

        function writeToFile(data) {
            fs.writeFile('index.html', data, function(err) {
                if (err) {
                    return console.log(err);
                }
                console.log("success!");
            });
        }
        
        conversion({ html: html }, function(err, result) {
            if (err) {
              return console.error(err);
            }
        
            // generate pdf
            result.stream.pipe(fs.createWriteStream('./test.pdf'));
            conversion.kill(); // necessary if you use the electron-server strategy
          });        
    });
});


