import { projectApiPath } from "../utils/apiPath";
import requester from "./apiRequester";
import { asignUserType, CreateProjectType, updateProjectType } from '../types/projectType';


class ProjectService {

    // get all project
    getAllProjectApi = (key:string =  '') => {
        return requester({
            url: projectApiPath.GET_ALL_PROJECT,
            method: "GET",
            params: {
                keyword: key
            }
        });
    };

    // get all category list
    getAllCategory = () => (
        requester({
            url: projectApiPath.GET_CATEGORIES_LIST,
            method: 'GET',
        })
    );

    // create project
    createProjectAPI = (formData:CreateProjectType) => {
        return requester({
            url: projectApiPath.CREATE_PROJECT,
            method: 'POST',
            data: formData
        })
    }

    // get project detail
    getProjectDetail = (id:number) => (
        requester({
            url: projectApiPath.GET_PROJECT_DETAIL,
            method: 'GET',
            params: {
                id: id
            }
        })
    );

    asignUserProject = (data:asignUserType) => {
        return requester({
            url: projectApiPath.ASIGN_USER_PROJECT,
            method: 'POST',
            data: data,
        });
    }


    // update project
    updateProject = (data:updateProjectType, id: number) => {
        return requester({
            url: projectApiPath.UPDATE_PROJECT,
            method: 'PUT',
            data: data,
            params: {
                projectId: id
            }
        })
    };

    // xoa nguoi dung khoi project
    fetchApiRemoveUserProject = (data:asignUserType) => {
        return requester ({
            url: projectApiPath.REMOVE_USER_FROM_PROJECT,
            method: 'POST',
            data: data,
        });
    };
};

export const projectService = new ProjectService();