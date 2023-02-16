import { Draggable, Droppable } from 'react-beautiful-dnd'
import Task from './Task'
import styled from 'styled-components'

const Container = styled.div`
  margin: 10px;
  border: 1px solid lightgray;
  border-radius: 2px;
  max-width: 300px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
`
const Title = styled.h3`
  padding: 10px;
`
const TaskList = styled.div`
  padding: 10px;
  background-color: ${props => (props.isDraggingOver ? 'lightgray' : 'white')};
  flex-grow: 1;
  min-height: 200px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
`

const Header = styled.div`
  background-color: white;
`

const Column = props => {
  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {provided => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <Header {...provided.dragHandleProps}>
            <Title>{props.column.title}</Title>
          </Header>
          <Droppable
            droppableId={props.column.id}
            direction="horizontal"
            type="TASK"
          >
            {(provided, snapshot) => (
              <TaskList
                {...provided.droppableProps}
                ref={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {props.tasks.map((task, index) => (
                  <Task
                    key={task.id}
                    task={task}
                    index={index}
                    currentColumn={props.column}
                    handleDeleteTask={props.handleDeleteTask}
                  />
                ))}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  )
}

export default Column
