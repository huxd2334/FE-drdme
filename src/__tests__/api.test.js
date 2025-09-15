//const axios = require('axios');
//
//const API_BASE_URL = 'http://localhost:3000';
//
//const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NSIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3NTQyODUwOTEsImV4cCI6MTc1NDI4ODY5MX0.OSROFbAMz4PqGb95HUv6DBokx2HtGAKraRLUGQ_pOIY';
//
//const headers = {
//  Authorization: `Bearer ${accessToken}`
//};
//
//describe(, () => {
//  it('GET /products - should print all products', async () => {
//    try {
//      const res = await axios.get(`${API_BASE_URL}/products`, { headers });
//      console.log(JSON.stringify(res.data, null, 2));
//      expect(res.status).toBe(200);
//    } catch (err) {
//      console.error('Error fetching products:', err.response?.data || err.message);
//    }
//  });
//
//  it('📁 GET /categories - should print all categories', async () => {
//    try {
//      const res = await axios.get(`${API_BASE_URL}/categories`, { headers });
//      console.log(JSON.stringify(res.data, null, 2));
//      expect(res.status).toBe(200);
//    } catch (err) {
//      console.error('Error fetching categories:', err.response?.data || err.message);
//    }
//  });
//});
