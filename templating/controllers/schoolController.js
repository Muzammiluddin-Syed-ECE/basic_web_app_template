var School = require('../models/school')
var async = require('async')
var School = require('../models/school')
var Subject = require('../models/subject')


// Display School create form on GET.
exports.school_create_get = function (req, res, next) {
    res.render('form', { title: 'Create School' });
};

// Handle School create on POST.
exports.school_create_post = [

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);
        
        // Create School object with escaped and trimmed data
        var school = new School(
            {
                
                first_name: req.body["first_name"],
                
                family_name: req.body["family_name"],
                
            }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('form', { title: 'Create School', school: school, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Save school.
            school.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new school record.
                res.redirect(school.url);
            });
        }
    }
];


// Display School delete form on GET.
exports.school_delete_get = function (req, res, next) {

    async.parallel({
        school: function (callback) {
            School.findById(req.params.id).exec(callback)
        },
        
        school_school: function (callback) {
            School.find({ 'school': req.params.id }).exec(callback)
        },
        school_subject: function (callback) {
            Subject.find({ 'school': req.params.id }).exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); }
        if (results.school == null) { // No results.
            res.redirect('/school');
        }
        // Successful, so render.
        res.render('delete', { title: 'Delete School', school: results.school, school_subject: results.school_subject });
    });

};

// Handle School delete on POST.
exports.school_delete_post = function (req, res, next) {

    async.parallel({
        school: function (callback) {
            School.findById(req.body.schoolid).exec(callback)
        },
        school_school: function (callback) {
            Book.find({ 'school': req.body.schoolid }).exec(callback)
        },
        school_subject: function (callback) {
            Book.find({ 'school': req.body.schoolid }).exec(callback)
        },
        
    }, function (err, results) {
        if (err) { return next(err); }
        // Success.
        if (results.school_subject.length > 0) {
            // School has subject. Render in same way as for GET route.
            res.render('delete', { title: 'Delete School', school: results.school, school_subject: results.school_subject });
            return;
        }
        else {
            // School has no subject. Delete object and redirect to the list of schools.
            School.findByIdAndRemove(req.body.schoolid, function deleteSchool(err) {
                if (err) { return next(err); }
                // Success - go to school list.
                res.redirect('/school')
            })

        }
    });

};


// Display detail page for a specific school.
exports.school_detail = function (req, res, next) {

    async.parallel({
        school: function (callback) {
            School.findById(req.params.id)
                .exec(callback)
        },
        
        school_school: function (callback) {
            School.find({ 'school': req.params.id }, 'title summary')
                .exec(callback)
        },
        
        school_subject: function (callback) {
            Subject.find({ 'school': req.params.id }, 'title summary')
                .exec(callback)
        },
        
    }, function (err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.school == null) { // No results.
            var err = new Error('school not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('detail', { title: 'school Detail', school: results.school, school_books: results.school_books });
    });

};

exports.index = function(req, res) {

    async.parallel({
        school_count: function(callback) {
            School.countDocuments({},callback);
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

// Display School update form on GET.
exports.school_update_get = function (req, res, next) {

    School.findById(req.params.id, function (err, school) {
        if (err) { return next(err); }
        if (school == null) { // No results.
            var err = new Error('School not found');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.render('school_form', { title: 'Update School', school: school });

    });
};

// Handle School update on POST.
exports.school_update_post = [

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create School object with escaped and trimmed data (and the old id!)
        var school = new School(
            {
                
                first_name: req.body["first_name"],
                
                family_name: req.body["family_name"],
                
            }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values and error messages.
            res.render('school_form', { title: 'Update School', school: school, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            School.findByIdAndUpdate(req.params.id, school, {}, function (err, theschool) {
                if (err) { return next(err); }
                // Successful - redirect to genre detail page.
                res.redirect(theschool.url);
            });
        }
    }
];

// Display list of all Authors.
exports.school_list = function (req, res, next) {

    School.find()
        .sort([['<sort_prop>', 'ascending']])
        .exec(function (err, list_authors) {
            if (err) { return next(err); }
            // Successful, so render.
            res.render('list', { title: 'School List', school_list: list_school });
        })

};

// Display School update form on GET.
exports.school_update_get = function (req, res, next) {

    School.findById(req.params.id, function (err, school) {
        if (err) { return next(err); }
        if (school == null) { // No results.
            var err = new Error('School not found');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.render('school_form', { title: 'Update School', school: school });

    });
};

// Handle School update on POST.
exports.school_update_post = [

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create School object with escaped and trimmed data (and the old id!)
        var school = new School(
            {
                
                first_name: req.body["first_name"],
                
                family_name: req.body["family_name"],
                
            }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values and error messages.
            res.render('school_form', { title: 'Update School', school: school, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            School.findByIdAndUpdate(req.params.id, school, {}, function (err, theschool) {
                if (err) { return next(err); }
                // Successful - redirect to genre detail page.
                res.redirect(theschool.url);
            });
        }
    }
];


const { body,validationResult } = require("express-validator");