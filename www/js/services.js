angular.module('starter.services', [])

.factory('DataBase', function($cordovaSQLite, $q, $ionicPlatform){
  return{
    query: function(query, params){  // Handle q and potential errors
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
    },
    getAll: function(res){ // Process a result SEt
      var output = [];
      for(var i=0; i < res.rows.length; i++){
        output.push(res.rows.item(i));
      }
      return output;
    }
  }
})
.factory('Todo', function($cordovaSQLite, DataBase){
  return {
    all: function(){
      return DataBase.query("SELECT * from todos")
      .then(function(res){
        return DataBase.getAll(res);
      })
    },
    add: function(newTodo){
      var params = [newTodo.description, newTodo.time, newTodo.done];
      return DataBase.query("INSERT INTO todos (description, time, done) VALUES (?,?,?)", params);
    },
    update: function(id, done, time){
      var params = [done, time, id];
      // console.log(time);
      return DataBase.query("UPDATE todos SET done = (?), time = (?) WHERE id = (?)", params);
    },
    remove: function(id){
      return DataBase.query("DELETE FROM todos where id = (?)", [id]);
    }
  }
})
