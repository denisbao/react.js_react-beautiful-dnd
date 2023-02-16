import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 50px;
  padding: 8px 15px;
  margin-bottom: 8px;
  display: flex;
  height: fit-content;
  margin-right: 5px;
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
`

const Button = styled.button`
  border: none;
  border-radius: 20px;
  margin-left: 10px;
  background-color: lightgray;
  color: white;
`

const Task = props => {
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps} // define this component as the draggable part
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {props.task.content}
          <Button
            onClick={() =>
              props.handleDeleteTask(
                props.task.id,
                props.index,
                props.currentColumn.id
              )
            }
            taskId={props.task.id}
          >
            X
          </Button>
        </Container>
      )}
    </Draggable>
  )
}

export default Task
