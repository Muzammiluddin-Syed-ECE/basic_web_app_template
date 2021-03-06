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
                key: req.body["key"],>schema_props>love: req.body["love"],>schema_props>dem: req.body["dem"],>schema_props>
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


/*
router.post('<path>', function(req, res, next) {
    var schema = {
        <schema_props>dem: req.body["dem"],
    }
    model_create("books", schema)
    .then(new_obj_schema => { return find_one(new_obj_schema); })
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
