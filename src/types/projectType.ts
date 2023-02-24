
interface Members {
    userId: number,
    name: string,
    avatar: string,
}

interface Creator {
    id: number,
    name: string,
}
// get project type 
export interface ProjectType {
    members: Members[],
    creator: Creator,
    id: number,
    projectName: string,
    description: string,
    categoryId: string,
    categoryName: string,
    alias: string,
    deleted: boolean,

};


// member type
export interface membersType {
    avatar: string;
    name: string;
    userId: number
}

// create project type
export interface CreateProjectType {
    projectName: string;
    description: string;
    categoryId: number;
    alias: string;
}

//project detail type
export interface projectDetailType {
    id: number;
    projectName: string;
    creator: {
        id: number,
        name: string
    };
    description: string;
    projectCategory: {
        id: number,
        name: string
    };
};

// update project type
export interface updateProjectType {
    id: number,
    projectName: string,
    creator: number,
    description: string,
    categoryId: string
};

// get project detail type
export interface getProjectDetailType {
    alias: string,
    creator: {
        id: number,
        name: string,
    },
    description: string,
    id: number,
    lstTask: string[],
    members: [],
    projectCategory: {
        id: number,
        name: string,
    },
    projectName: string,
}

/// asign user type
export interface asignUserType {
    projectId: number,
    userId: number
}
