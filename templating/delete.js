// Display Books delete form on GET.
exports.books_delete_get = function (req, res, next) {

    async.parallel({
        books: function (callback) {
            Books.findById(req.params.id).exec(callback)
        },
        
        books_school: function (callback) {
            School.find({ 'books': req.params.id }).exec(callback)
        },
        books_subject: function (callback) {
            Subject.find({ 'books': req.params.id }).exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); }
        if (results.books == null) { // No results.
            res.redirect('/books');
        }
        // Successful, so render.
        res.render('books_delete', { title: 'Delete Books', books: results.books, books_subject: results.books_subject });
    });

};

// Handle Books delete on POST.
exports.books_delete_post = function (req, res, next) {

    async.parallel({
        books: function (callback) {
            Books.findById(req.body.booksid).exec(callback)
        },
        books_school: function (callback) {
            Book.find({ 'books': req.body.booksid }).exec(callback)
        },
        books_subject: function (callback) {
            Book.find({ 'books': req.body.booksid }).exec(callback)
        },
        
    }, function (err, results) {
        if (err) { return next(err); }
        // Success.
        if (results.books_subject.length > 0) {
            // Books has subject. Render in same way as for GET route.
            res.render('books_delete', { title: 'Delete Books', books: results.books, books_subject: results.books_subject });
            return;
        }
        else {
            // Books has no subject. Delete object and redirect to the list of bookss.
            Books.findByIdAndRemove(req.body.booksid, function deleteBooks(err) {
                if (err) { return next(err); }
                // Success - go to books list.
                res.redirect('/books')
            })

        }
    });

};


/*router.post('<path>', function(req, res, next) {
    var schema = {
        <schema_props>dem: req.body["dem"],
    }
    model_delete("books", schema)
    .then(new_obj_schema => {
        res.redirect(url.format({
            pathname:"/<redirect_path>",
            query: {}
        }));
    });
});*/