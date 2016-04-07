const React = require('react')
const eventemitter = require('./eventemitter')
const { string } = React.PropTypes

const submitNewTodo = (event) => {
  event.preventDefault()
  let newTodoValue = event.target[0].value
  eventemitter.emit('newtodo', newTodoValue)
  clearTodoInput(event.target[0])
}

const clearTodoInput = (target) => {
  target.value = ''
}

const InputHeader = (props) => (
  <header>
    <h1>{props.title}</h1>
    <form onSubmit={submitNewTodo}>
      <input className='new-todo'
        placeholder={props.placeholder}
        autoFocus />
      <input type='submit' name='update' hideFocus='true' tabIndex='-1'/>
    </form>
  </header>
)

InputHeader.propTypes = {
  title: string.isRequired,
  placeholder: string.isRequired
}

module.exports = InputHeader
