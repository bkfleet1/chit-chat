const { Shoutout } = require('../models');

const data = [
    {
       
        message: "Taskinator is a task-tracker app that will allow you to organize your personal to-do list items by clicking and dragging them into categories like To Do, In Progress, and Completed.",
        user_id: 1
    },
    {
       
        message: "The local zoo has received funding to build a new online catalog, and they've asked to create a web server for a front-end application they’re developing, called Zoo Keepr.",
        user_id: 2
    },
    {
        
        message: "A simple calendar application that allows a user to save events for each hour of the day. This app will run in the browser and feature dynamically updated HTML and CSS powered by jQuery.",
        user_id: 3

    }
  
]

const seedShoutouts = () => Shoutout.bulkCreate(data);

module.exports = seedShoutouts;