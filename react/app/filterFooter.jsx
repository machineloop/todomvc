const React = require('react')
const eventemitter = require('./eventemitter')
const { array, object, string } = React.PropTypes

const FilterFooter = (props) => {

  const getStatuses = (statusFilter) => {
    let filter = statusFilter || props.statusFilter
    return Object.keys(props.statusMap).map((status)=>{
      return (status !== filter) ? {status: status} : {status: status, selected: 'selected'}
    })
  }

  const switchFilter = (event) => {
    let status = event.target.textContent
    eventemitter.emit('switch_Filter', status )
  }

  const clearCompleted = () => {
    eventemitter.emit('clear_Completed')
  }

  return (
    <footer className='footer'>
      <span className='todo-count'>
        <strong>{props.todoList.filter(props.statusMap['active']).length}</strong> items left
      </span>
      <ul className='filters'>
        {getStatuses().map((status, index)=> (
          <li key={index}>
            <a href='#' onClick={switchFilter} className={status.selected}>{ status.status }</a>
          </li>))}
      </ul>
      { (props.todoList.filter(props.statusMap['completed']).length > 0) ? <button className='clear-completed' onClick={clearCompleted}>Clear completed</button> : null}
    </footer>
  )
}

FilterFooter.propTypes = {
  todoList: array.isRequired,
  statusMap: object.isRequired,
  statusFilter: string.isRequired
}

module.exports = FilterFooter
