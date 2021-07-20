router.post('sponsor', function(req, res, next) {
    var schema = {
        _id: req.body["_id"],
        name: req.body["name"],
        company: req.body["company"],
        date: req.body["date"],
        confirmed: req.body["confirmed"],
    }
    model_list("sponsor", schema)
    .then(list_of_obj => { 
        <res_config>['list_of_obj'] = list_of_obj;
        res.render('sponsor-list-all', <res_config>); 
    });
});