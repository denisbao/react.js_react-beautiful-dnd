/* eslint-disable no-unused-vars */

// onDragStart:
const start = {
  draggableId: 'task-1',
  type: 'TYPE',
  source: {
    droppableId: 'column-1',
    index: 0,
  },
}

// onDragUpdate:
const update = {
  ...start,
  destination: {
    droppableId: 'column-1',
    index: 1,
  },
}

// onDragEnd:
const result = {
  ...update,
  reason: 'DROP',
}

// Snapshot parameter for Draggable:
const draggableSnapshot = {
  isDragging: true,
  draggingOver: 'column-1',
}

// Snapshot parameter for Droppable:
const droppableSnapshot = {
  isDraggingOver: true,
  draggingOverWith: 'task-1',
}
