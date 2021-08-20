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
                <schema_props>dem: req.body["dem"],
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
/*
router.post('<path>', function(req, res, next) {
    var schema = {
        <schema_props>dem: req.body["dem"],
    }
    model_update("books", schema)
    .then(new_obj_schema => {
        res.redirect(url.format({
            pathname:"/<redirect_path>",
            query: {
                "_id":new_obj_schema["_id"],
            }
        }));
    });
});
*/