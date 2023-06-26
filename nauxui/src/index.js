const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override')
const path = require('path');
const app = express();
const port = 8080;

const route = require('./routes');
const db = require('./config/db')

// Connect db
db.connect();

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Support POST method
app.use(express.json())
app.use(express.urlencoded())

// Method override
app.use(methodOverride('_method'))

// HTTP logger
app.use(morgan('combined'))

// Template engine
app.engine(
  'hbs',
  handlebars.engine({
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b,
      ifCond: function(v1, v2, options) {
        if(v1.equals(v2)) {
          return options.fn(this);
        }
        return options.inverse(this);
      },
      ifCondString: function(v1, v2, options) {
        if(v1 == v2) {
          return options.fn(this);
        }
        return options.inverse(this);
      }
    }
  }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Route intit
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
