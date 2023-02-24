
// user api path
export const  userApiPath = {
    USER_LOGIN: '/api/Users/signin',
    USER_REGISTER: '/api/Users/signup',
    GET_ALL_USER: '/api/Users/getUser',
};

// project api path
export const projectApiPath = {
    GET_ALL_PROJECT: '/api/Project/getAllProject',
    GET_CATEGORIES_LIST: '/api/ProjectCategory',
    CREATE_PROJECT: '/api/Project/createProjectAuthorize',
    GET_PROJECT_DETAIL: '/api/Project/getProjectDetail',
    UPDATE_PROJECT: '/api/Project/updateProject',
    ASIGN_USER_PROJECT: '/api/Project/assignUserProject',
}

// task api

export const taskApiPath = {
    GET_STATUS: '/api/Status/getAll',
    GET_TASK_TYPE: '/api/TaskType/getAll',
    GET_PRIORITY: '/api/Priority/getAll',
    CREATE_TASK: '/api/Project/createTask',
    GET_TASK_DETAIL: '/api/Project/getTaskDetail',
    UPDATE_TASK: '/api/Project/updateTask',
    
}