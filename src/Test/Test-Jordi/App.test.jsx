import axios from 'axios';

describe('Login API Test', () => {

    test('successfully logs in with correct credentials', async () => {

        // Call the login API
        const response = await axios.post('https://geoprofs-backend.test/api/auth/login', {
            email: 'jordi@gmail.com',
            password: 'password1',
        });

        expect(response.status).toBe(200);
        expect(response.data).toEqual(mockResponse);
    });

    test('returns error for invalid credentials', async () => {
        try {
            await axios.post('https://geoprofs-backend.test/api/auth/login', {
                email: 'wrong-email@gmail.com',
                password: 'wrongpassword',
            });
        } catch (error) {
            expect(error.response.status).toBe(401);
            expect(error.response.data).toEqual(mockErrorResponse);
        }
    });
});
