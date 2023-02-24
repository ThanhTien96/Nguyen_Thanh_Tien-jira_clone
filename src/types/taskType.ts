
// create task type
export interface createTaskType {

    listUserAsign: [],
    taskName: string,
    description: string,
    statusId: string,
    originalEstimate: number,
    timeTrackingSpent: number,
    timeTrackingRemaining: number,
    projectId: number,
    typeId: number,
    priorityId: number

}

// edit task type
export interface updateTaskType {
    listUserAsign: [
      number
    ],
    taskId: string,
    taskName: string,
    description: string,
    statusId: string,
    originalEstimate: number,
    timeTrackingSpent: number,
    timeTrackingRemaining: number,
    projectId: number,
    typeId: number,
    priorityId: number
  }