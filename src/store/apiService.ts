import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiService = createApi({
    reducerPath: 'apiService',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:5000' // Backend API URL
    }),
    endpoints: () => ({}),
});

export default apiService;