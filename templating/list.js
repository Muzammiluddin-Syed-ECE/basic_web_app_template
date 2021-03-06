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

/*
router.post('<path>', function(req, res, next) {
    var schema = {
        <schema_props>dem: req.body["dem"],
    }
    model_list("books", schema)
    .then(list_of_obj => { 
        <res_config>['list_of_obj'] = list_of_obj;
        res.render('books-list-all', <res_config>); 
    });
});
*/
