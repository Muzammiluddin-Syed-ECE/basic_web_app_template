var books = require('../models/books')
var async = require('async')
var school = require('../models/school')
var subject = require('../models/subject')


// Display Books create form on GET.
exports.books_create_get = function (req, res, next) {
    res.render('books_form', { title: 'Create Books' });
};

// Handle Books create on POST.
exports.books_create_post = [

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);
        
        // Create Books object with escaped and trimmed data
        var books = new Books(
            {
                
                id: req.body["id"],
                
                id1: req.body["id1"],
                
            }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('books_form', { title: 'Create Books', books: books, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Save books.
            books.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new books record.
                res.redirect(books.url);
            });
        }
    }
];


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


// Display detail page for a specific books.
exports.books_detail = function (req, res, next) {

    async.parallel({
        books: function (callback) {
            books.findById(req.params.id)
                .exec(callback)
        },
        
        books_school: function (callback) {
            School.find({ 'books': req.params.id }, 'title summary')
                .exec(callback)
        },
        
        books_subject: function (callback) {
            Subject.find({ 'books': req.params.id }, 'title summary')
                .exec(callback)
        },
        
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

// Display list of all Authors.
exports.books_list = function (req, res, next) {

    Books.find()
        .sort([['<sort_prop>', 'ascending']])
        .exec(function (err, list_authors) {
            if (err) { return next(err); }
            // Successful, so render.
            res.render('books_list', { title: 'Books List', books_list: list_books });
        })

};

// Display Books update form on GET.
exports.books_update_get = function (req, res, next) {

    Books.findById(req.params.id, function (err, books) {
        if (err) { return next(err); }
        if (books == null) { // No results.
            var err = new Error('Books not found');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.render('books_form', { title: 'Update Books', books: books });

    });
};

// Handle Books update on POST.
exports.books_update_post = [

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create Books object with escaped and trimmed data (and the old id!)
        var books = new Books(
            {
                
                id: req.body["id"],
                
                id1: req.body["id1"],
                
            }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values and error messages.
            res.render('books_form', { title: 'Update Books', books: books, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            Books.findByIdAndUpdate(req.params.id, books, {}, function (err, thebooks) {
                if (err) { return next(err); }
                // Successful - redirect to genre detail page.
                res.redirect(thebooks.url);
            });
        }
    }
];


const { body,validationResult } = require("express-validator");