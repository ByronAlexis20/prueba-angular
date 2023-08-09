
export interface News {
    merchantId:number;
    status:string;
    name:string | null;
    featured:boolean;
    date:string;
    title:string;
    subtitle:string | null;
    slug:string;
    shortDescription:string;
    largeDescription:string;
    creationDate:string;
    lastUpdateDate:string;
    newId:number;
    imagesURL:any[];
    imageUrl:string;
    authors:any[];
    tags:any[];
    categories:any[];
    descriptions:any[];
}