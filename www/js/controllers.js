angular.module('starter.controllers', [])

.controller('myStuff', function($scope, $cordovaSQLite) {
  var todoList = this;
  todoList.todos = [];
  var query = "SELECT * FROM todos";
  $cordovaSQLite.execute(db, query).then(function(res) {
      if(res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            // console.log(res.rows.item(i).description);
            // console.log(res.rows.item(i));
            todoList.todos.push(res.rows.item(i))
          }
      } else {
          console.log("No results found");
      }
  }, function (err) {
      console.error(err);
  });

  todoList.addTodo = function() {
    const index = todoList.todos.length + 1;

    indexs = index;
    description = todoList.todoText;
    time = moment().format('hh:mm:ss');
    done = false;
    var query = "INSERT INTO todos (indexs, description, time, done) VALUES (?,?,?,?)";
    $cordovaSQLite.execute(db, query, [indexs, description, time, done]).then(function(res) {
        console.log("INSERT ID -> " + res.insertId);
    }, function (err) {
        console.error(err);
    });

    todoList.todos.push({indexs: indexs, description: description, time: time, done:false});
    todoList.todoText = '';
  };

  todoList.remaining = function() {
    var count = 0;
    // console.log(todoList.todos.length);
    angular.forEach(todoList.todos, function(todo) {
      count += todo.done ? 0 : 1;
    });
    return count;
  };
  //
  // todoList.check = function(todo){
  //   todoList.todos[todo - 1 ].time = moment().format('hh:mm:ss')
  // }

})

.controller('workStuff', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  var todoList = this;
  todoList.todos = [
    {index: 1, text:'learn angular', time: '',done:true},
    {index: 2, text:'build an angular app', time:'', done:true}];

  todoList.addTodo = function() {
    const index = todoList.todos.length + 1;
    todoList.todos.push({index: index, text:todoList.todoText, time: moment().format('hh:mm:ss'), done:false});
    todoList.todoText = '';
  };

  todoList.remaining = function() {
    var count = 0;
    angular.forEach(todoList.todos, function(todo) {
      count += todo.done ? 0 : 1;
    });
    return count;
  };

  todoList.check = function(todo){
    todoList.todos[todo - 1 ].time = moment().format('hh:mm:ss')
  }
})


.controller('gangsta', function($scope) {
  var todoList = this;
  todoList.todos = [
    {index: 1, text:'learn angular', time: '',done:true},
    {index: 2, text:'build an angular app', time:'', done:true}];

  todoList.addTodo = function() {
    const index = todoList.todos.length + 1;
    todoList.todos.push({index: index, text:todoList.todoText, time: moment().format('hh:mm:ss'), done:false});
    todoList.todoText = '';
  };

  todoList.remaining = function() {
    var count = 0;
    angular.forEach(todoList.todos, function(todo) {
      count += todo.done ? 0 : 1;
    });
    return count;
  };

  todoList.check = function(todo){
    todoList.todos[todo - 1 ].time = moment().format('hh:mm:ss')
  }
});
