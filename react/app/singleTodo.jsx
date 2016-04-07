const React = require('react')
const eventemitter = require('./eventemitter')
const { object, string, number } = React.PropTypes

const SingleTodo = (props) => {

  const toggleEdit = (index, event) => {
    eventemitter.emit('update_editingIndex', index)
  }

  const toggleStatus = (todoIndex) => eventemitter.emit('toggle_Status', todoIndex )

  const removeTodo = (index, event) => {
    eventemitter.emit('remove_Todo', index )
  }

  const updateTodo = (index, event) => {
    event.preventDefault()
    let value = (event.type === 'submit') ? event.target.querySelector('input').value : event.target.value
    eventemitter.emit('update_Todo', [value, index])
    eventemitter.emit('update_editingIndex', -1)
  }

  const checkedInput = (props.todo.isCompleted)
    ? <input className='toggle' type='checkbox' onClick={toggleStatus.bind(this, props.index)} checked />
    : <input className='toggle' type='checkbox' onClick={toggleStatus.bind(this, props.index)} />

  const editingInput = (props.isEditing)
      ?(<form onSubmit={updateTodo.bind(this, props.index)}>
          <input type='text' className='edit' defaultValue={ props.todo.value } onBlur={updateTodo.bind(this, props.index)} autoFocus/>
          <input type='submit' name='update' hideFocus='true' tabIndex='-1'/>
        </form>)
      : null

	return (
    <div>
  		<div className='view'>
  			{checkedInput}
  			<label onDoubleClick={toggleEdit.bind(this, props.index)}>{props.todo.value}</label>
  			<button className='destroy' onClick={removeTodo.bind(this, props.index)}></button>
  		</div>
  		{editingInput}
    </div>
	)
}

SingleTodo.propTypes = {
  todo: object.isRequired,
  isEditing: string.isRequired,
  index: number.isRequired
}

module.exports = SingleTodo
