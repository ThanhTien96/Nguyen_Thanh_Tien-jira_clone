import { createTaskType, updateTaskType } from "../types/taskType"
import { taskApiPath } from "../utils/apiPath"
import requester from "./apiRequester"

class TaskService {

    // get status 
    getStatusTask = () => {
        return requester({
            url: taskApiPath.GET_STATUS,
            method: 'GET',
        })
    }

    // get task type
    getTaskType = () => {
        return requester ({
            url: taskApiPath.GET_TASK_TYPE,
            method: 'GET',
        })
    }

    // get priority
    getTaskPriority = (id:number = 0) => {
        return requester ({
            url: taskApiPath.GET_PRIORITY,
            method: 'GET',
            params: {
                id: id
            }
        });
    };

    // create task
    getApiCreateTask = (data:createTaskType) => {
        return requester({
            url: taskApiPath.CREATE_TASK,
            method: 'POST',
            data: data,
        });
    };

    // get task detail
    getApiTaskDetail = (id:number) => {
        return requester({
            url: taskApiPath.GET_TASK_DETAIL,
            method: 'GET',
            params: {
                taskId: id,
            },
        });
    }

    // edit task
    fetchApiUpdateTask = (data:updateTaskType) => {
        return requester({
            url: taskApiPath.UPDATE_TASK,
            method: 'POST',
            data: data,
        })
    }
    
};


export const taskService = new TaskService();