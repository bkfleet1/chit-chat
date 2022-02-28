const { Shoutout } = require('../models');

const shoutData = [
    {
       
        message: "Taskinator is a task-tracker app that will allow you to organize your personal to-do list items by clicking and dragging them into categories like To Do, In Progress, and Completed.",
        userId: 1
    },
    {
       
        message: "The local zoo has received funding to build a new online catalog, and they've asked to create a web server for a front-end application they’re developing, called Zoo Keepr. This site’s data will be stored on the server. This will allow animal enthusiasts to access the data from different locations and browsers without needing to download it to their device",
        userId: 2
    },
    {
        
        message: "A simple calendar application that allows a user to save events for each hour of the day. This app will run in the browser and feature dynamically updated HTML and CSS powered by jQuery. Use Moment.js library to work with date and time",
        userId: 3

    }
  
]

const seedShoutouts = () => Post.bulkCreate(shoutoutData);

module.exports = seedShoutouts;