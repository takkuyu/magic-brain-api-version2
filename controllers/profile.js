const handleProfileGet = (req, res, db) => {
    const { id } = req.params; // parames = url part 

    db.select('*').from('users').where({ id })
        .then(user => {
            if (user.length) {
                res.json(user[0]);
            } else {
                res.status(400).json('Not Found');
            }
        })
        .catch(err => res.status(400).json('error getting user'));
}

const handleProfileUpdate = (req, res, db) => {
    const { id } = req.params;
    const { name, age, pet } = req.body.formInput;

    db('users').where('id', '=', id).update({
        name: name,
        age: age,
        pet: pet
    })
        .then(resp => {
            if (resp) {
                res.json("success");
            } else {
                res.status(400).json('Not found')
            }
        })
        .catch(err => res.status(400).json('error updating user'))
}

module.exports = {
    handleProfileGet,
    handleProfileUpdate
};