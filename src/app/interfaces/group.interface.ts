export interface GroupsI {
    merchantId: number;
    serieId: number;
    versionId: number | null;
    templateId: number | null;
    associationType: string;
    associatedGroupId: number | null;
    status: string;
    position: number;
    type: string;
    isPaid: boolean;
    isPartner: boolean;
    hasApproval: boolean;
    hasPartner: boolean;
    hasPolls: boolean;
    name: string;
    description: string;
    slug: string;
    groupId: number;
    imageUrl: string;
    category: any;
    serie: any;
}
