import request from 'supertest';
import app from '../src/index';

describe('User API test', () => {
    let userId: string;

    // Test create user success
    it('POST /api/v1/users - should create a new user successfully', async () => {
        const randomNumber = Math.floor(Math.random() * 1000000);
        const response = await request(app).post('/api/v1/users').send({
            name: `John Doe ${randomNumber}`,
            email: `john.doe${randomNumber}@example.com`,
            age: 25
        });

        expect(response.status).toBe(201);
        expect(response.body.status).toBe('success');
        expect(response.body.message).toBe('User created successfully');
    });
    
    // Test create user with invalid input
    it('POST /api/v1/users - should fail with invalid input', async () => {
        const response = await request(app).post('/api/v1/users').send({
            name: '',
            email: 'invalid.email',
            age: -1
        });

        expect(response.status).toBe(400);
        expect(response.body.status).toBe('error');
    });

    // Test create user with duplicate email
    it('POST /api/v1/users - should fail with duplicate email', async () => {
        const userData = {
            name: 'John Doe',
            email: 'duplicate@example.com',
            age: 25
        };

        // Create first user
        await request(app).post('/api/v1/users').send(userData);
        
        // Try to create duplicate
        const response = await request(app).post('/api/v1/users').send(userData);

        expect(response.status).toBe(400);
        expect(response.body.status).toBe('error');
        expect(response.body.message).toBe('User already exists');
    });

    // Test get all users
    it('GET /api/v1/users - should get all users', async () => {
        const response = await request(app).get('/api/v1/users');

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.message).toBe('Users fetched successfully');
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    // Test get user by ID
    it('GET /api/v1/users/:id - should get user by ID', async () => {
        // First create a user
        const createResponse = await request(app).post('/api/v1/users').send({
            name: 'Get User Test',
            email: 'getuser@test.com',
            age: 30
        });

        // Extract user ID from response or make another call to get users
        const users = await request(app).get('/api/v1/users');
        userId = users.body.data[0].id;

        const response = await request(app).get(`/api/v1/users/${userId}`);

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.message).toBe('User fetched successfully');
        expect(response.body.data).toBeDefined();
    });

    // Test get user with invalid ID
    it('GET /api/v1/users/:id - should fail with invalid ID', async () => {
        const response = await request(app).get('/api/v1/users/invalid-id');

        expect(response.status).toBe(404);
        expect(response.body.status).toBe('error');
        expect(response.body.message).toBe('User not found');
    });

    // Test update user
    it('PUT /api/v1/users/:id - should update user successfully', async () => {
        const response = await request(app).put(`/api/v1/users/${userId}`).send({
            name: 'Updated Name',
            email: 'updated@email.com',
            age: 35
        });

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.message).toBe('User updated successfully');
    });

    // Test update user with invalid ID
    it('PUT /api/v1/users/:id - should fail with invalid ID', async () => {
        const response = await request(app).put('/api/v1/users/invalid-id').send({
            name: 'Updated Name',
            email: 'updated@email.com',
            age: 35
        });

        expect(response.status).toBe(404);
        expect(response.body.status).toBe('error');
        expect(response.body.message).toBe('User not found');
    });

    // Test delete user
    it('DELETE /api/v1/users/:id - should delete user successfully', async () => {
        const response = await request(app).delete(`/api/v1/users/${userId}`);

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.message).toBe('User deleted successfully');
    });

    // Test delete user with invalid ID
    it('DELETE /api/v1/users/:id - should fail with invalid ID', async () => {
        const response = await request(app).delete('/api/v1/users/invalid-id');

        expect(response.status).toBe(404);
        expect(response.body.status).toBe('error');
        expect(response.body.message).toBe('User not found');
    });
});