export interface LoginOkResponse {
    count: number;
    included: any;
    input: string;
    result: LoginOkResult[];
    links: any;
}

export interface LoginOkResult {
    userId: number;
    access_token: string;
    issued: string;
    expires: string;
}

export interface LoginErrorResponse {
    errors: LoginErrorItem[];
}
export interface LoginErrorItem {
    code: string;
    title: string;
    detail: string;
    source: {
        pointer: string;
        parameter: string;
    };
    links: {
        about: string;
    };
}