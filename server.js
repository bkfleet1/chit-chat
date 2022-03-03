const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const multer = require('multer');


const app = express();

const PORT = process.env.PORT || 3001;

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })


app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

app.post('/profile-upload-single', upload.single('profile-file'), function (req, res, next) {
console.log(JSON.stringify(req.file))
var response = '<a href="/">Home</a><br>'
response += "Files uploaded successfully.<br>"
response += `<img src="${req.file.path}" /><br>`
return res.send(response)
})

app.post('/profile-upload-multiple', upload.array('profile-files', 12), function (req, res, next) {
  var response = '<a href="/">Home</a><br>'
  response += "Files uploaded successfully.<br>"
  for(var i=0;i<req.files.length;i++){
      response += `<img src="${req.files[i].path}" /><br>`
  }
  
  return res.send(response)
})




const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);
require('dotenv').config();

const sess = {
  secret: process.env.SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

const helpers = require('./utils/helpers');

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
