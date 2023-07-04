const {create} = require('express-handlebars');
const exphbs = create({defaultLayout : 'main'});

module.exports = function(app){
    
// Setting and configuring the view engine
app.engine('handlebars',exphbs.engine);
app.set('view engine','handlebars');
app.set('views', './views');
}