const Accounts = require('../accounts/accounts-model');


exports.checkAccountPayload = (req, res, next) => {
  const payload = req.body;
  
  if (!payload.name || !payload.budget) {
    res.status(400).json({ message: "Name and budget are required." })
  } else if (typeof payload.name !== "string") {
    res.status(400).json({ message: "Name of account must be a string" })
  } else {
    payload.name = payload.name.trim();
  
    if (typeof payload.budget !== "number") {
      res.status(400).json({ message: 'Budget of account must be a number' })
    } else if (payload.name.length < 3 || payload.name.length > 100) {
      res.status(400).json({ message: "Name of account must be between 3 and 100"})
    } else if (payload.budget < 0 || payload.budget > 1000000) {
      res.status(400).json({ message: 'Budget of account is too large or too small' })
    } else {
      next();
    }
  }
};

exports.checkAccountNameUnique = (req, res, next) => {
  Accounts.getAll()
		.then(data => {
			let nameUsed = false;
			data.find(acc => {
				if (acc.name === req.body.name) {
					nameUsed = true;
				}
			});
			if (nameUsed) {
				res.status(400).json({ message: 'That name is taken' });
			} else {
				next();
			}
		})
		.catch(err => res.status(500).json({ message: err.message }));
}

exports.checkAccountId = (req, res, next) => {
  const { id } = req.params;

  Accounts.getById(id)
    .then((data) => {
      if (!data) {
        res.status(404).json({message: 'Account not found' })
      } else {
        next();
      }
    })
		.catch((err) => res.status(500).json({ message: err.message }));
}