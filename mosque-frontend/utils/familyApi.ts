import api from './api';

export interface FamilyMember {
    _id: string;
    name: string;
    relation: string;
    age: number;
    maritalStatus?: string;
    spouseName?: string;
    bloodGroup?: string;
    studying?: string;
    working?: string;
}

export const addFamilyMember = async (memberData: any) => {
    const response = await api.post('/family', memberData);
    return response.data;
};

export const getFamilyMembers = async () => {
    const response = await api.get('/family');
    return response.data;
};

export const deleteFamilyMember = async (id: string) => {
    const response = await api.delete(`/family/${id}`);
    return response.data;
};
