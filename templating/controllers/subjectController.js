var Subject = require('../models/subject')
var async = require('async')
var School = require('../models/school')
var Subject = require('../models/subject')


// Display Subject create form on GET.
exports.subject_create_get = function (req, res, next) {
    res.render('form', { title: 'Create Subject' });
};

// Handle Subject create on POST.
exports.subject_create_post = [

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);
        
        // Create Subject object with escaped and trimmed data
        var subject = new Subject(
            {
                
                first_name: req.body["first_name"],
                
                family_name: req.body["family_name"],
                
            }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('form', { title: 'Create Subject', subject: subject, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Save subject.
            subject.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new subject record.
                res.redirect(subject.url);
            });
        }
    }
];


// Display Subject delete form on GET.
exports.subject_delete_get = function (req, res, next) {

    async.parallel({
        subject: function (callback) {
            Subject.findById(req.params.id).exec(callback)
        },
        
        subject_school: function (callback) {
            School.find({ 'subject': req.params.id }).exec(callback)
        },
        subject_subject: function (callback) {
            Subject.find({ 'subject': req.params.id }).exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); }
        if (results.subject == null) { // No results.
            res.redirect('/subject');
        }
        // Successful, so render.
        res.render('delete', { title: 'Delete Subject', subject: results.subject, subject_subject: results.subject_subject });
    });

};

// Handle Subject delete on POST.
exports.subject_delete_post = function (req, res, next) {

    async.parallel({
        subject: function (callback) {
            Subject.findById(req.body.subjectid).exec(callback)
        },
        subject_school: function (callback) {
            Book.find({ 'subject': req.body.subjectid }).exec(callback)
        },
        subject_subject: function (callback) {
            Book.find({ 'subject': req.body.subjectid }).exec(callback)
        },
        
    }, function (err, results) {
        if (err) { return next(err); }
        // Success.
        if (results.subject_subject.length > 0) {
            // Subject has subject. Render in same way as for GET route.
            res.render('delete', { title: 'Delete Subject', subject: results.subject, subject_subject: results.subject_subject });
            return;
        }
        else {
            // Subject has no subject. Delete object and redirect to the list of subjects.
            Subject.findByIdAndRemove(req.body.subjectid, function deleteSubject(err) {
                if (err) { return next(err); }
                // Success - go to subject list.
                res.redirect('/subject')
            })

        }
    });

};


// Display detail page for a specific subject.
exports.subject_detail = function (req, res, next) {

    async.parallel({
        subject: function (callback) {
            Subject.findById(req.params.id)
                .exec(callback)
        },
        
        subject_school: function (callback) {
            School.find({ 'subject': req.params.id }, 'title summary')
                .exec(callback)
        },
        
        subject_subject: function (callback) {
            Subject.find({ 'subject': req.params.id }, 'title summary')
                .exec(callback)
        },
        
    }, function (err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.subject == null) { // No results.
            var err = new Error('subject not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('detail', { title: 'subject Detail', subject: results.subject, subject_books: results.subject_books });
    });

};

exports.index = function(req, res) {

    async.parallel({
        subject_count: function(callback) {
            Subject.countDocuments({},callback);
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

// Display Subject update form on GET.
exports.subject_update_get = function (req, res, next) {

    Subject.findById(req.params.id, function (err, subject) {
        if (err) { return next(err); }
        if (subject == null) { // No results.
            var err = new Error('Subject not found');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.render('subject_form', { title: 'Update Subject', subject: subject });

    });
};

// Handle Subject update on POST.
exports.subject_update_post = [

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create Subject object with escaped and trimmed data (and the old id!)
        var subject = new Subject(
            {
                
                first_name: req.body["first_name"],
                
                family_name: req.body["family_name"],
                
            }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values and error messages.
            res.render('subject_form', { title: 'Update Subject', subject: subject, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            Subject.findByIdAndUpdate(req.params.id, subject, {}, function (err, thesubject) {
                if (err) { return next(err); }
                // Successful - redirect to genre detail page.
                res.redirect(thesubject.url);
            });
        }
    }
];

// Display list of all Authors.
exports.subject_list = function (req, res, next) {

    Subject.find()
        .sort([['<sort_prop>', 'ascending']])
        .exec(function (err, list_authors) {
            if (err) { return next(err); }
            // Successful, so render.
            res.render('list', { title: 'Subject List', subject_list: list_subject });
        })

};

// Display Subject update form on GET.
exports.subject_update_get = function (req, res, next) {

    Subject.findById(req.params.id, function (err, subject) {
        if (err) { return next(err); }
        if (subject == null) { // No results.
            var err = new Error('Subject not found');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.render('subject_form', { title: 'Update Subject', subject: subject });

    });
};

// Handle Subject update on POST.
exports.subject_update_post = [

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create Subject object with escaped and trimmed data (and the old id!)
        var subject = new Subject(
            {
                
                first_name: req.body["first_name"],
                
                family_name: req.body["family_name"],
                
            }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values and error messages.
            res.render('subject_form', { title: 'Update Subject', subject: subject, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            Subject.findByIdAndUpdate(req.params.id, subject, {}, function (err, thesubject) {
                if (err) { return next(err); }
                // Successful - redirect to genre detail page.
                res.redirect(thesubject.url);
            });
        }
    }
];


const { body,validationResult } = require("express-validator");