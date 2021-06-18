const express = require('express');
const cookieSession = require('cookie-session');

const app = express();

app.use(cookieSession({
    name: 'session',
    keys: ['asdasdasd','rfxvsfs']
}));

app.get('/',function(request, response){
    request.session.visits = request.session.visits || 0;
    request.session.visits += 1;
    response.send(request.session.visits+" visitas");
});

app.listen(3000);