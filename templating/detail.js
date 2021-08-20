// Display detail page for a specific books.
exports.books_detail = function (req, res, next) {

    async.parallel({
        books: function (callback) {
            books.findById(req.params.id)
                .exec(callback)
        },
        <repeat_related_field
        books_subject: function (callback) {
            <realted_field_cap>.find({ 'books': req.params.id }, 'title summary')
                .exec(callback)
        },
        />
    }, function (err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.books == null) { // No results.
            var err = new Error('books not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('books_detail', { title: 'books Detail', books: results.books, books_books: results.books_books });
    });

};


/*
router.post('<path>', function(req, res, next) {
    var schema = {
        <schema_props>dem: req.body["dem"],
    }
    model_find_one("books", schema)
    .then(obj_schema => { 
        <res_config>['obj_schema'] = obj_schema;
        res.render('books-list-one', <res_config>); 
    });
});
*/