var Book = require('../models/book')
var async = require('async')
var School = require('../models/school')
var Subject = require('../models/subject')


// Display Book create form on GET.
exports.book_create_get = function (req, res, next) {
    res.render('form', { title: 'Create Book' });
};

// Handle Book create on POST.
exports.book_create_post = [

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);
        
        // Create Book object with escaped and trimmed data
        var book = new Book(
            {
                
                first_name: req.body["first_name"],
                
                family_name: req.body["family_name"],
                
            }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('form', { title: 'Create Book', book: book, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Save book.
            book.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new book record.
                res.redirect(book.url);
            });
        }
    }
];


// Display Book delete form on GET.
exports.book_delete_get = function (req, res, next) {

    async.parallel({
        book: function (callback) {
            Book.findById(req.params.id).exec(callback)
        },
        
        book_school: function (callback) {
            School.find({ 'book': req.params.id }).exec(callback)
        },
        book_subject: function (callback) {
            Subject.find({ 'book': req.params.id }).exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); }
        if (results.book == null) { // No results.
            res.redirect('/book');
        }
        // Successful, so render.
        res.render('delete', { title: 'Delete Book', book: results.book, book_subject: results.book_subject });
    });

};

// Handle Book delete on POST.
exports.book_delete_post = function (req, res, next) {

    async.parallel({
        book: function (callback) {
            Book.findById(req.body.bookid).exec(callback)
        },
        book_school: function (callback) {
            Book.find({ 'book': req.body.bookid }).exec(callback)
        },
        book_subject: function (callback) {
            Book.find({ 'book': req.body.bookid }).exec(callback)
        },
        
    }, function (err, results) {
        if (err) { return next(err); }
        // Success.
        if (results.book_subject.length > 0) {
            // Book has subject. Render in same way as for GET route.
            res.render('delete', { title: 'Delete Book', book: results.book, book_subject: results.book_subject });
            return;
        }
        else {
            // Book has no subject. Delete object and redirect to the list of books.
            Book.findByIdAndRemove(req.body.bookid, function deleteBook(err) {
                if (err) { return next(err); }
                // Success - go to book list.
                res.redirect('/book')
            })

        }
    });

};


// Display detail page for a specific book.
exports.book_detail = function (req, res, next) {

    async.parallel({
        book: function (callback) {
            Book.findById(req.params.id)
                .exec(callback)
        },
        
        book_school: function (callback) {
            School.find({ 'book': req.params.id }, 'title summary')
                .exec(callback)
        },
        
        book_subject: function (callback) {
            Subject.find({ 'book': req.params.id }, 'title summary')
                .exec(callback)
        },
        
    }, function (err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.book == null) { // No results.
            var err = new Error('book not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('detail', { title: 'book Detail', book: results.book, book_books: results.book_books });
    });

};

exports.index = function(req, res) {

    async.parallel({
        book_count: function(callback) {
            Book.countDocuments({},callback);
        },
        
        school_count: function(callback) {
            School.countDocuments({},callback);
        },
        
        subject_count: function(callback) {
            Subject.countDocuments({},callback);
        },
        
    }, function(err, results) {
        res.render('index', { title: 'Local Library Home', error: err, data: results });
    });
};

// Display Book update form on GET.
exports.book_update_get = function (req, res, next) {

    Book.findById(req.params.id, function (err, book) {
        if (err) { return next(err); }
        if (book == null) { // No results.
            var err = new Error('Book not found');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.render('book_form', { title: 'Update Book', book: book });

    });
};

// Handle Book update on POST.
exports.book_update_post = [

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create Book object with escaped and trimmed data (and the old id!)
        var book = new Book(
            {
                
                first_name: req.body["first_name"],
                
                family_name: req.body["family_name"],
                
            }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values and error messages.
            res.render('book_form', { title: 'Update Book', book: book, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            Book.findByIdAndUpdate(req.params.id, book, {}, function (err, thebook) {
                if (err) { return next(err); }
                // Successful - redirect to genre detail page.
                res.redirect(thebook.url);
            });
        }
    }
];

// Display list of all Authors.
exports.book_list = function (req, res, next) {

    Book.find()
        .sort([['<sort_prop>', 'ascending']])
        .exec(function (err, list_authors) {
            if (err) { return next(err); }
            // Successful, so render.
            res.render('list', { title: 'Book List', book_list: list_book });
        })

};

// Display Book update form on GET.
exports.book_update_get = function (req, res, next) {

    Book.findById(req.params.id, function (err, book) {
        if (err) { return next(err); }
        if (book == null) { // No results.
            var err = new Error('Book not found');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.render('book_form', { title: 'Update Book', book: book });

    });
};

// Handle Book update on POST.
exports.book_update_post = [

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create Book object with escaped and trimmed data (and the old id!)
        var book = new Book(
            {
                
                first_name: req.body["first_name"],
                
                family_name: req.body["family_name"],
                
            }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values and error messages.
            res.render('book_form', { title: 'Update Book', book: book, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            Book.findByIdAndUpdate(req.params.id, book, {}, function (err, thebook) {
                if (err) { return next(err); }
                // Successful - redirect to genre detail page.
                res.redirect(thebook.url);
            });
        }
    }
];


const { body,validationResult } = require("express-validator");