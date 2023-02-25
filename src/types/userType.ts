
// profile type;
export interface Profile {
    accessToken: string,
    avatar: string,
    email: string,
    id: string,
    name: string,
    phoneNumber: string,
};

export interface LoginType {
    email: string,
    passWord: string
}

export interface RegisterType {
    email: string,
    passWord: string,
    name: string,
    gender: boolean,
    phone: string,
}

export interface membersType {
    avatar: string;
    name: string;
    userId: number;
}

// register type
export interface registerType {
    email: string,
    passWord: string,
    name: string,
    phoneNumber: string
}

