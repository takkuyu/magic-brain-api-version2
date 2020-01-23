const handleRegister = (req, res, db, bcrypt) => {
    const { email, name, password } = req.body;
    if(!email || !name || !password){
        return res.status(400).json('incorrect form submission');
    }

    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0], 
                        name: name,
                        joined: new Date()
                    })
                    .then(user => {
                        res.json(user[0]);
                    })
            })
            .then(trx.commit) // write commit to make sure this is added
            .catch(trx.rollback) // when fails we roll back the changes
    })
        .catch(err => res.status(400).json('Please try another email')); // email has to be unique
}

module.exports = {
    handleRegister: handleRegister
};