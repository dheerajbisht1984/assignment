'use strict';

module.exports = function (Todotable) {
    var errorMessage = {};
    var successMessage = {};
    Todotable.addtodolist = function (req, cb) {
        Todotable.validateCheck('add', req, cb);
        var adddata = {};
        adddata.name = req.todo_name;
        Todotable.upsert(adddata,function(err,response){
            if(err)
                {
                   Todotable.errMessage(cb) ;
                }
                else
                    {
                        successMessage.status = "200";
                        successMessage.message = "To Do List added successfully";
                        cb(null, successMessage);
                    }
        })
    }
     Todotable.listtodolist = function (req, cb) {
        
        var adddata = {};
        adddata.name = req.todo_name;
        Todotable.find({
            where : {status: { inq: [0,1] }}
        },function(err,response){
            if(err)
                {
                   Todotable.errMessage(cb) ;
                }
                else
                    { if(response.length>0)
                        {
                        successMessage.status = "200";
                        successMessage.message = "Data fetched successfully";
                        cb(null, successMessage,response);
                        }
                    else{
                        successMessage.status = "200";
                        successMessage.message = "Data fetched successfully";
                        cb(null, successMessage,[]);
                    }
                    }
        })
    }

     Todotable.removetodolist = function (req, cb) {
        Todotable.validateCheck('remove', req, cb);
        var removedata = {};
        removedata.id = req.id;
        removedata.status = 2;
        Todotable.upsert(removedata,function(err,response){
            if(err)
                {
                   Todotable.errMessage(cb) ;
                }
                else
                    {
                        successMessage.status = "200";
                        successMessage.message = "To Do List Removed successfully";
                        cb(null, successMessage);
                    }
        })
    }

    Todotable.markasread = function (req, cb) {
        Todotable.validateCheck('mark', req, cb);
        var removedata = {};
        removedata.id = req.id;
        removedata.status = 1;
        Todotable.upsert(removedata,function(err,response){
            if(err)
                {
                   Todotable.errMessage(cb) ;
                }
                else
                    {
                        successMessage.status = "200";
                        successMessage.message = "To Do List Marked successfully";
                        cb(null, successMessage);
                    }
        })
    }

    Todotable.validateCheck = function (callfor, req, cb) {
        switch (callfor) {
            case "add":
                if (req.todo_name == undefined || req.todo_name == '' || req.todo_name == null) {
                    errorMessage.status = "201";
                    errorMessage.message = "To Do name can't blank";
                    return cb(null, errorMessage);
                }
                break;
                 case "remove":
                if (req.id == undefined || req.id == '' || req.id == null) {
                    errorMessage.status = "201";
                    errorMessage.message = "ID can't blank";
                    return cb(null, errorMessage);
                }
                break;
                case "mark":
                if (req.id == undefined || req.id == '' || req.id == null) {
                    errorMessage.status = "201";
                    errorMessage.message = "ID can't blank";
                    return cb(null, errorMessage);
                }
                break;


        }
    }
        Todotable.errMessage = function (cb) {

            errorMessage.status = "201";
            errorMessage.message = "Error Occurred";
            return cb(null, errorMessage);


        }

        Todotable.remoteMethod(
            'addtodolist',
            {
                http: { verb: 'post' },
                description: 'Add To Do List',
                accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
                returns: [{ arg: 'response_status', type: 'string' }, { arg: 'response', type: 'string' }]
            }
        );
        Todotable.remoteMethod(
            'listtodolist',
            {
                http: { verb: 'post' },
                description: 'List To Do List',
                accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
                returns: [{ arg: 'response_status', type: 'string' }, { arg: 'response', type: 'string' }]
            }
        );
        Todotable.remoteMethod(
            'removetodolist',
            {
                http: { verb: 'post' },
                description: 'Remove To Do List',
                accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
                returns: [{ arg: 'response_status', type: 'string' }, { arg: 'response', type: 'string' }]
            }
        );

        Todotable.remoteMethod(
            'markasread',
            {
                http: { verb: 'post' },
                description: 'Mark as Read',
                accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
                returns: [{ arg: 'response_status', type: 'string' }, { arg: 'response', type: 'string' }]
            }
        );

    };
