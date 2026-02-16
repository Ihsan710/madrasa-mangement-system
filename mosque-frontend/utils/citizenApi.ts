import api from './api';

export interface Citizen {
    _id: string;
    membershipId: string;
    name: string;
    mobile: string;
    address: string;
    bloodGroup?: string;
    role: 'citizen';
    profilePhoto?: string;
    familyMembers?: any[];
}

export const getCitizens = async () => {
    const response = await api.get('/admin/citizens');
    return response.data;
};

export const getCitizenById = async (id: string) => {
    const response = await api.get(`/admin/citizens/${id}`);
    return response.data;
};

export const addCitizen = async (citizenData: any) => {
    const response = await api.post('/admin/citizens', citizenData);
    return response.data;
};

export const deleteCitizen = async (id: string) => {
    const response = await api.delete(`/admin/citizens/${id}`);
    return response.data;
};

// Citizen Profile
export const getProfile = async () => {
    const response = await api.get('/citizen/profile');
    return response.data;
};

export const updateProfile = async (profileData: any) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };
    // Check if profileData is FormData, if not convert it (optional, but better to enforce FormData from component)
    const response = await api.put('/citizen/profile', profileData, config);
    return response.data;
};
