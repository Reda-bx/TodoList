angular.module('starter.controllers', [])

.controller('myStuff', function($scope, Todo) {
  var todoList = this;
  todoList.todos = [];
  todoList.todos = null;


  todoList.updateTodo = function(){
    Todo.all().then(function(todo){
      todoList.todos = todo
      angular.forEach(todoList.todos, function(todo) {
        // Covert String to Boolean.
        todo.done = todo.done == "true" ? true : false
      });
    })
  }

  todoList.updateTodo();

  todoList.addTodo = function(){
    if(todoList.todoText != null && todoList.todoText != ""){ // Check if value not equal to null and is not empty
      todo = {description: todoList.todoText, time: moment().format('hh:mm:ss'), done: false}
      todoList.todoText = '';
      Todo.add(todo);
      todoList.updateTodo(); // update todoList.todos after insert
    }else{
      console.log("Type something");
    }
  }

  todoList.update = function(id, done){
    const time = moment().format('hh:mm:ss');
    Todo.update(id, done, time);
    todoList.updateTodo(); // update todoList.todos after update the time
  }

  todoList.remaining = function(){
    var count = 0;
    angular.forEach(todoList.todos, function(todo) {
      count += todo.done ? 0 : 1;
    });
    return count;
  }

  todoList.remove = function(id){
    Todo.remove(id);
    todoList.updateTodo();
  }
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
