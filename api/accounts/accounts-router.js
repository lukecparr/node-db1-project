const router = require('express').Router()
const Accounts = require('./accounts-model');

const { checkAccountPayload, checkAccountNameUnique, checkAccountId } = require('./accounts-middleware');


router.get('/', (req, res, next) => {
  Accounts.getAll()
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
})


router.get('/:id', checkAccountId, (req, res, next) => {
  const { id } = req.params;

  Accounts.getById(id)
  //TODO: NEEDS 404
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
})


router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  Accounts.create(req.body)
    .then((data) => res.status(201).json(data))
    .catch((err) => next(err))
})


router.put('/:id', checkAccountPayload, checkAccountId, (req, res, next) => {
  const { id } = req.params;
  
  Accounts.updateById(id, req.body)
    .then(() => {
      Accounts.getById(id)
        .then((data) => res.status(200).json(data))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
  });


router.delete('/:id', checkAccountId, (req, res, next) => {
  const { id } = req.params;

  Accounts.getById(id)
    .then((data) => {
      Accounts.deleteById(id)
        .then(() => res.status(200).json(data))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));

});


router.use((err, req, res, next) => { // eslint-disable-line
  // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
  res.status(500).json({
    message: 'something went wrong inside the accounts router',
    errMessage: err.message,
  })
})

module.exports = router;
