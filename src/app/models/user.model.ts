
export class User {
    username!: string;
    password!: string;
    constructor(o:any){
        Object.assign(this,o);
    }
}