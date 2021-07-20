router.post('sponsor', function(req, res, next) {
    var schema = {
        _id: req.body["_id"],
        name: req.body["name"],
        company: req.body["company"],
        date: req.body["date"],
        confirmed: req.body["confirmed"],
    }
    model_update("sponsor", schema)
    .then(new_obj_schema => {
        res.redirect(url.format({
            pathname:"/sponsor",
            query: {
                "_id":new_obj_schema["_id"],
            }
        }));
    });
});