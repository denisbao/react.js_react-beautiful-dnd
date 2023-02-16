import { useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import Column from './Column'
import initialData from './initial-data'
import styled from 'styled-components'
import '@atlaskit/css-reset'

const Container = styled.div`
  display: flex;
`

const App = () => {
  const [state, setState] = useState(initialData)

  const onDragStart = start => {
    document.body.style.color = 'grey'
    document.body.style.transition = 'background-color 0.2s ease'
  }

  const onDragUpdate = update => {
    const { destination } = update
    const opacity = destination
      ? destination.index / Object.keys(state.tasks).length
      : 0
    document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`
  }

  /**
   * If the object was dropped outside a droppable component, or if the location of the draggable
   * didn't change at all, then return. Otherwise, change the order of the array
   * @returns The state of the application
   */
  const onDragEnd = result => {
    document.body.style.color = 'inherit'
    document.body.style.backgroundColor = 'inherit'

    const { destination, source, draggableId, type } = result

    // DRAGGABLE DO NOT CHANGE LOCATION:
    // dropped outside a droppable component
    if (!destination) {
      return
    }
    // draggable location didn´t change
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    // reorder columns
    if (type === 'COLUMN') {
      const newColumnOrder = Array.from(state.columnOrder)
      newColumnOrder.splice(source.index, 1)
      newColumnOrder.splice(destination.index, 0, draggableId)
      setState(prevState => {
        return {
          ...prevState,
          columnOrder: newColumnOrder,
        }
      })
      return
    }

    // DRAGGABLE CHANGE LOCATION:
    const startColumn = state.columns[source.droppableId]
    const endColumn = state.columns[destination.droppableId]

    // in the same column
    if (startColumn === endColumn) {
      const newTaskIds = Array.from(startColumn.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)
      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds,
      }
      setState(prevState => {
        return {
          ...prevState,
          columns: { ...prevState.columns, [newColumn.id]: newColumn },
        }
      })
      return
    }

    // between different columns
    const newStartColumnTasks = Array.from(startColumn.taskIds)
    newStartColumnTasks.splice(source.index, 1)
    const newStartColumn = {
      ...startColumn,
      taskIds: newStartColumnTasks,
    }

    const newFinishColumnTasks = Array.from(endColumn.taskIds)
    newFinishColumnTasks.splice(destination.index, 0, draggableId)
    const newFinishColumn = {
      ...endColumn,
      taskIds: newFinishColumnTasks,
    }

    setState(prevState => {
      return {
        ...prevState,
        columns: {
          ...prevState.columns,
          [newStartColumn.id]: newStartColumn,
          [newFinishColumn.id]: newFinishColumn,
        },
      }
    })
  }

  /**
   * It deletes the task from the state, and then removes the taskId from the column's taskIds array
   * @param taskId - The id of the task to be deleted
   * @param index - The index of the task in the column's taskIds array.
   * @param columnId - The id of the column that the task is in
   */
  const handleDeleteTask = (taskId, index, columnId) => {
    const newTasks = { ...state.tasks }
    delete newTasks[taskId]
    const newColumn = { ...state.columns[columnId] }
    newColumn.taskIds.splice(index, 1)

    setState(prevState => {
      return {
        ...prevState,
        tasks: newTasks,
        columns: {
          ...prevState.columns,
          newColumn,
        },
      }
    })
  }

  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <Droppable droppableId="all-columns" direction="horizontal" type="COLUMN">
        {provided => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {state.columnOrder.map((columnId, index) => {
              const column = state.columns[columnId]
              const tasks = column.taskIds.map(taskId => state.tasks[taskId])
              return (
                <Column
                  key={column.id}
                  column={column}
                  tasks={tasks}
                  index={index}
                  handleDeleteTask={handleDeleteTask}
                />
              )
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default App
