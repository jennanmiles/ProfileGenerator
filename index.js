// install packages
const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const electron = require("electron-html-to");
const generateHTML = require("./generateHTML.js");

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
promptUser().then(function({username}) {
    // connect to github api
    const queryUrl = `https://api.github.com/users/${username}`;

    axios.get(queryUrl).then(function(res) {
        // intake color from user input
        //console.log(res.data.color.choices);

        // traverse github object
        // console.log(res.data.avatar_url);
        // console.log(res.data.login);
        // console.log(res.data.location);
        // console.log(res.data.url)
        // console.log(res.data.blog);
        // console.log(res.data.bio);
        // console.log(res.data.public_repos);
        // console.log(res.data.followers);
        // console.log(res.data.starred_url);
        // console.log(res.data.following);

        // create html
        let html = generateHTML(res.data);
        //writeToFile();
        console.log(html);
        
        // generate pdf

        // 
    });
});


// function writeToFile(generateHTML, data) {
//     fs.writeFile('index.html', data, function(err) {
//         if (err) {
//             return console.log(err);
//         }
//         console.log("success!");
//     });
// }

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
