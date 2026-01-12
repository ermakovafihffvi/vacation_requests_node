class UserController {
    init() {
        app.get('/api/users', (request, response) => {
            knex('users')
                .select({
                    id: 'users.id',
                    name: 'users.name',
                    role_id: 'users.role_id',
                    role_name: 'roles.name',
                })
                .join('roles', 'users.role_id', '=', 'roles.id')
                .then((users) => {
                    response.send(JSON.stringify(users));
                });
        });
    }
}

export default UserController;
