router.post('sponsor', function(req, res, next) {
    var schema = {
        _id: req.body["_id"],
        name: req.body["name"],
        company: req.body["company"],
        date: req.body["date"],
        confirmed: req.body["confirmed"],
    }
    model_find_one("sponsor", schema)
    .then(obj_schema => { 
        <res_config>['obj_schema'] = obj_schema;
        res.render('sponsor-list-one', <res_config>); 
    });
});