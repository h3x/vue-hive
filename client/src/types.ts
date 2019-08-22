// Store
export interface LoginState{
    login: Login[]
}

export interface State{
    todos: ToDos[]
}

// models
export interface Login{
    username: string,
    isLoggedIn: boolean
}

export interface ToDos{
    text:string;
}