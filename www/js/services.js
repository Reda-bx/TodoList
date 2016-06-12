angular.module('starter.services', [])

.factory('DataBase', function($cordovaSQLite, $q, $ionicPlatform){
  var self = this;

  // Handle q and potential errors

  self.query = function(query, params){
    params = params || [];
    var q = $q.defer();

    $ionicPlatform.ready(function(){
      $cordovaSQLite.execute(db, query, params)
      .then(function(res){
        q.resolve(res);
      }, function(err){
        console.log(err);
        q.reject(err)
      })
    })
    return q.promise
  }

  // Process a result SEt
  self.getAll = function(res){
    var output = [];

    for(var i=0; i < res.rows.length; i++){
      output.push(res.rows.item(i));
    }
    return output;
  }
  return self
})
.factory('Todo', function($cordovaSQLite, DataBase){
  var self = this;

  self.all = function(){
    return DataBase.query("SELECT * from todos")
    .then(function(res){
      return DataBase.getAll(res);
    })
  }

  self.add = function(newTodo){
    var params = [newTodo.description, newTodo.time, newTodo.done];
    return DataBase.query("INSERT INTO todos (description, time, done) VALUES (?,?,?)", params);
  }

  self.update = function(id, done){
    var params = [done, id];
    return DataBase.query("UPDATE todos SET done = (?) WHERE id = (?)", params);
  }
  return self
})
