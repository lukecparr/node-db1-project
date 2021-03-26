const db = require('../../data/db-config');

const getAll = () => {
  return db('accounts')
  // return Promise.reject('test string')
}

const getById = (id) => {
  return db.first('*').from('accounts').where({id})
}

const create = (newAccount) => {
  return db('accounts').insert(newAccount);
}

const updateById = (id, account) => {
  return db('accounts').where({id}).update(account);
}

const deleteById = (id) => {
  return db('accounts').where({id}).del();
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
