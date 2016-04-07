const React = require('react')
const ReactDOM = require('react-dom')
const eventemitter = require('./eventemitter')
const InputHeader = require('./inputHeader')
const TodosMain = require('./todosMain')
const FilterFooter = require('./filterFooter')

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todoList: [],
      filteredTodos: [],
      statusFilter: 'all',
      toggleAllChecked: false,
      editingIndex: -1
    }
    this.statusMap = {
      all: () => true,
      active: (todo) => todo.isCompleted === false,
      completed: (todo) => todo.isCompleted === true
    }

    eventemitter.on('newtodo', (data) => this.newTodoInput(data))
    eventemitter.on('toggle_AllComplete', (data) => this.toggleAllComplete(data))
    eventemitter.on('toggle_Status', (data) => this.toggleStatus(data))
    eventemitter.on('remove_Todo', (data) => this.removeTodo(data))
    eventemitter.on('switch_Filter', (data) => this.switchFilter(data))
    eventemitter.on('clear_Completed', () => this.clearCompleted())
    eventemitter.on('update_Todo', (data) => this.updateTodo(data))
    eventemitter.on('update_editingIndex', (index) => this.updateEditingIndex(index))
  }

  newTodoInput (todoText) {
    todoText && this.setState({todoList: this.state.todoList.concat({value: todoText, isCompleted: false})})
  }

  toggleAllComplete(isChecked){
    this.setState({toggleAllChecked: isChecked})
    this.setState({
      todoList: this.state.todoList.map((todo) => (this.state.toggleAllChecked)
        ? { value: todo.value, isCompleted: false }
        : { value: todo.value, isCompleted: true })
    })
  }

  toggleStatus(todoIndex) {
    var todo = this.state.todoList[ todoIndex ]
    todo.isCompleted = !todo.isCompleted
    this.setState({todoList: this.state.todoList.map((t, i)=>(i === todoIndex)? todo : t)})
    this.setState({toggleAllChecked: false})
  }

  removeTodo(index){
    this.setState({todoList: this.state.todoList.filter((t, i) => index !== i)})
  }

  switchFilter(status){
    this.setState({statusFilter: status})
  }

  clearCompleted(){
    this.setState({todoList: this.state.todoList.filter((todo) => todo.isCompleted !== true)})
  }

  updateTodo(valueIndex) {
    let todoList = this.state.todoList
    var [value, index] = valueIndex
    var todo = todoList[ index ]
    todo.value = value
    this.setState({todoList: todoList.map((t, i)=> (i === index) ? todo : t)})
  }

  updateEditingIndex(index){
    this.setState({editingIndex: index})
  }

  render() {
    return (
      <div>
        <InputHeader title='todos' placeholder='What needs to be done?' />
        <TodosMain todoList={this.state.todoList} statusMap={this.statusMap} statusFilter={this.state.statusFilter} editingIndex={this.state.editingIndex} />
        <FilterFooter todoList={this.state.todoList} statusMap={this.statusMap} statusFilter={this.state.statusFilter} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
