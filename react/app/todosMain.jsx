const React = require('react')
const eventemitter = require('./eventemitter')
const SingleTodo = require('./singleTodo')
const { array, object, string, number } = React.PropTypes

const TodosMain = (props) => {
  const getFilteredTodos = (filter) => props.todoList.filter(props.statusMap[ props.statusFilter ])

  const toggleAllComplete = (event) => eventemitter.emit('toggle_AllComplete', event.target.checked )

  let todoItems = getFilteredTodos().map((todo, index) => {
    let isEditing = (props.editingIndex === index) ? 'editing': ''
    let isCompleted = (todo.isCompleted === true) ? 'completed': ''
    let classes = `${isCompleted} ${isEditing}`
    return (<li className={classes} key={index}>
        <SingleTodo todo={todo} isEditing={isEditing} index={index} />
     </li>)
  })

  return (
    <section className='main'>
      <input className='toggle-all' type='checkbox' onClick={toggleAllComplete} />
      <label htmlFor='toggle-all'>Mark all as complete</label>
      <ul className='todo-list'>
        { todoItems }
      </ul>
    </section>
  )
}

TodosMain.propTypes = {
  todoList: array.isRequired,
  statusMap: object.isRequired,
  statusFilter: string.isRequired,
  editingIndex: number.isRequired
}

module.exports = TodosMain
