var express = require('express');
var app = express();
const pgp = require('pg-promise')({
  promiseLib: Promise
});

const dbConfig = require('./db-config');
const db = pgp(dbConfig);


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

app.get('/', function(request, response) {
    var context = {title: 'Home'}
    response.render('index.hbs', context);
});

app.get('/search/', function(request, response, next) {
    var searchTerm = request.query.searchTerm;
    var context = {title: 'Search Results', searchTerm: searchTerm}

    db.query(`SELECT id, book_title FROM reviews WHERE book_title ILIKE '%$1#%'`, searchTerm)
      .then(function(results) {
          context.results = results;
          //console.log(results);
        response.render('search.hbs', context);
      })
      .catch(next)
})

app.post('search/:searchTerm', function(request, response, next) {
    //var desc = request.body.description;

    response.redirect('/search/:searchTerm');
});


app.get('/reviews/:id', function(request, response, next) {
    var id = request.params.id;
    var context = {title: 'Reviews'}
    var q = `SELECT * FROM reviews WHERE id=${id}`;
    db.query(q, id)
        .then(function(results) {
            context.results = results;
            //console.log(results);
            response.render('reviews.hbs', context);
        })
        .catch(next)
});

app.get('/create_review', function(request, response){
    var context = {title: 'Create Review'}

    response.render('create_review.hbs', context)

});

app.post('/create_review', function(request, response, next) {
    var title = request.body.book_title;
    var author = request.body.author;
    var category = request.body.category;
    var date = request.body.publication_date;
    var review = request.body.review;

    db.none(`INSERT INTO reviews VALUES (default, $1, $2, $3, $4, $5)`, [title, author, category, date, review])
        .then(function() {
            response.redirect('/create_review');
      })
      .catch(next);
});

// var q = `INSERT INTO reviews (id, book_title, category, publication_date, review) VALUES (default, ${title}, ${category}, ${date}, ${review})`;


// db.none(`INSERT INTO reviews VALUES (default, $1, $2, $3, $4)`, title, category, date, review)






app.listen(8080, function(){
    console.log('Listening on port 8080');
});
