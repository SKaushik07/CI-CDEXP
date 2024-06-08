let users = [];

/* Create a new user */
function CreateUser(req, res) {
    const { name, surname, phone, email, age } = req.body;
    const user = { name, surname, phone, email, age };
    users.push(user);
    res.json(user);
}

/* Get all users */
function GetAllUsers(req, res) {
    res.json(users);
}

/* Get a user by ID */
function GetUserById(req, res) {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
}

/* Update a user by ID */
function UpdateUserById(req, res) {
    const id = parseInt(req.params.id);
    const { name, surname, phone, email, age } = req.body;
    const updatedUser = { name, surname, phone, email, age };
    users = users.map(user => {
        if (user.id === id) {
            return { ...user, ...updatedUser };
        }
        return user;
    });
    res.json(updatedUser);
}

// Delete a user by ID */
function DeleteUserById(req, res) {
    const id = parseInt(req.params.id);
    users = users.filter(user => user.id !== id);
    res.send('User deleted successfully');
}

module.exports = {
    CreateUser,
    GetAllUsers,
    GetUserById,
    UpdateUserById,
    DeleteUserById
};
