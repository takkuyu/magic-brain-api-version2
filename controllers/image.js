const Clarifai = require('clarifai');

// creat app object from Clarifai.App 
const app = new Clarifai.App({
    apiKey: '751201e628a24cca8e7c9346067231c4'
});

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.CELEBRITY_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('')); // not increase the count 
}

const handleImage = (req, res, db) => {
    const { id } = req.body;

    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to get entries'));
}

module.exports = {
    handleImage,
    handleApiCall
}