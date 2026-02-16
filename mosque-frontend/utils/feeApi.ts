import api from './api';

export const initializeFees = async (data: { citizenId: string; year: number; monthlyAmount: number }) => {
    const response = await api.post('/fees/initialize', data);
    return response.data;
};

export const getFees = async (citizenId: string) => {
    const response = await api.get(`/fees/${citizenId}`);
    return response.data;
};

export const getMyFees = async () => {
    const response = await api.get('/fees/my-fees');
    return response.data;
};

export const updateFeeStatus = async (data: { citizenId: string; monthYear: string; paid: boolean }) => {
    const response = await api.put('/fees/status', data);
    return response.data;
};

export const getAllFees = async (year?: number) => {
    const query = year ? `?year=${year}` : '';
    const response = await api.get(`/fees/all${query}`);
    return response.data;
};
