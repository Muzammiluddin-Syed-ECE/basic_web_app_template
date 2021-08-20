var express = require('express');
var router = express.Router();


// Require our controllers.
var book_controller = require('../controllers/bookController'); 
var school_controller = require('../controllers/schoolController'); 
var subject_controller = require('../controllers/subjectController'); 


/*var express = require('express');
const <service><service_name> = require('../services/<service_name>.js');
const {
    <database_functions>,
} = require('../services/mongodb.js');
var router = express.Router();
const url = require('url');*/    

// GET catalog home page.
router.get('/', subject_controller.index);  



/// book ROUTES ///

// GET request for creating a book. NOTE This must come before routes that display book (uses id).
router.get('/book/create', book_controller.book_create_get);

// POST request for creating book.
router.post('/book/create', book_controller.book_create_post);

// GET request to delete book.
router.get('/book/:id/delete', book_controller.book_delete_get);

// POST request to delete book.
router.post('/book/:id/delete', book_controller.book_delete_post);

// GET request to update book.
router.get('/book/:id/update', book_controller.book_update_get);

// POST request to update book.
router.post('/book/:id/update', book_controller.book_update_post);

// GET request for one book.
router.get('/book/:id', book_controller.book_detail);

// GET request for list of all book.
router.get('/books', book_controller.book_list);



/// school ROUTES ///

// GET request for creating a school. NOTE This must come before routes that display school (uses id).
router.get('/school/create', school_controller.school_create_get);

// POST request for creating school.
router.post('/school/create', school_controller.school_create_post);

// GET request to delete school.
router.get('/school/:id/delete', school_controller.school_delete_get);

// POST request to delete school.
router.post('/school/:id/delete', school_controller.school_delete_post);

// GET request to update school.
router.get('/school/:id/update', school_controller.school_update_get);

// POST request to update school.
router.post('/school/:id/update', school_controller.school_update_post);

// GET request for one school.
router.get('/school/:id', school_controller.school_detail);

// GET request for list of all school.
router.get('/schools', school_controller.school_list);



/// subject ROUTES ///

// GET request for creating a subject. NOTE This must come before routes that display subject (uses id).
router.get('/subject/create', subject_controller.subject_create_get);

// POST request for creating subject.
router.post('/subject/create', subject_controller.subject_create_post);

// GET request to delete subject.
router.get('/subject/:id/delete', subject_controller.subject_delete_get);

// POST request to delete subject.
router.post('/subject/:id/delete', subject_controller.subject_delete_post);

// GET request to update subject.
router.get('/subject/:id/update', subject_controller.subject_update_get);

// POST request to update subject.
router.post('/subject/:id/update', subject_controller.subject_update_post);

// GET request for one subject.
router.get('/subject/:id', subject_controller.subject_detail);

// GET request for list of all subject.
router.get('/subjects', subject_controller.subject_list);


module.exports = router;