const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: '172.16.4.182',
  database: 'nvt',
  password: '12345',
  port: 15400,
});

/* 
  USER 
*/

const getUsers = (request, response) => {
  pool.query('SELECT * FROM view_all_user ORDER BY nvt_user_id DESC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createUser = (request, response) => {
  const { fname = "", mname = "", lname = "", uname = "", password = "" } = request.body;

  pool.query('CALL create_user($1,$2,$3,$4,$5)', [fname, mname, lname, uname, password], (error, results) => {
    if (error) {
      response.status(400).send(error);
      throw error;
    }

    response.status(201).send({ message: 'Successfully Created', data: request.body });
  });
};

const updateUser = (request, response) => {
  const user_id = parseInt(request.params.id);
  const { fname = "", mname = "", lname = "", uname = "", password = "" } = request.body;

  pool.query(
    'CALL update_user($1,$2,$3,$4,$5,$6)',
    [fname, mname, lname, uname, password, user_id],
    (error, results) => {
      if (error) {
        response.status(400).send(error);
        throw error;
      }
      response.status(201).send({ message: 'Successfully Updated', data: request.body });
    }
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('CALL delete_user($1)', [id], (error, results) => {
    if (error) {
      response.status(400).send(error);
      throw error;
    }
    response.status(201).send(results.rows[0]);
  });
};


/*
 MODULE 
*/
const getModule = (request, response) => {
  pool.query('SELECT * FROM view_all_module ORDER BY module_id DESC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const createModule = (request, response) => {
  const { modCode = "", ModName = "" } = request.body;

  pool.query('CALL create_module($1,$2)', [modCode, ModName], (error, results) => {
    if (error?.code == '23505') {
      response.status(400).send('Module already exists!');
    } else if (error) {
      response.status(400).send(error);
    } else {
      response.status(201).send({ message: 'Successfully Created', data: request.body });
    }

  });
};

const updateModule = (request, response) => {
  const mod_id = parseInt(request.params.id);
  const { modCode = "", ModName = "" } = request.body;

  pool.query(
    'CALL update_module($1,$2,$3)',
    [mod_id, modCode, ModName],
    (error, results) => {
      if (error) {
        response.status(400).send(error);
        throw error;
      }
      response.status(201).send({ message: 'Successfully Updated', data: request.body });
    }
  );
};

const deleteModule = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('CALL delete_module($1)', [id], (error, results) => {
    if (error) {
      response.status(400).send(error);
      throw error;
    }
    response.status(201).send(results.rows[0]);
  });
};

/*
  PRODUCT GROUP
*/
const getProductGroup = (request, response) => {
  pool.query('SELECT * FROM view_all_product_group ORDER BY product_group_id DESC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const createProductGroup = (request, response) => {
  const { groupName = "" } = request.body;

  pool.query('CALL create_product_group($1)', [groupName], (error, results) => {
    if (error?.code == '23505') {
      response.status(400).send('Group already exists!');
    } else if (error) {
      response.status(400).send(error);
    } else {
      response.status(201).send({ message: 'Successfully Created', data: request.body });
    }

  });
};

const updateProductGroup = (request, response) => {
  const id = parseInt(request.params.id);
  const { groupName = "" } = request.body;

  pool.query(
    'CALL update_product_group($1,$2)',
    [id, groupName],
    (error, results) => {
      if (error) {
        response.status(400).send(error);
        throw error;
      }
      response.status(201).send({ message: 'Successfully Updated', data: request.body });
    }
  );
};
const deleteProductGroup = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('CALL delete_product_group($1)', [id], (error, results) => {
    if (error) {
      response.status(400).send(error);
    }
    response.status(201).send(results.rows[0]);
  });
};

//product
const getProduct = (request, response) => {
  pool.query('SELECT * FROM view_all_product ORDER BY product_id DESC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const createProduct = (request, response) => {
  const { groupId = "", skucode = "", barcode = "", prodname = "", unit = "", } = request.body;

  pool.query('CALL create_product($1,$2,$3,$4,$5)', [groupId, skucode, barcode, prodname, unit], (error, results) => {
    if (error) {
      response.status(400).send(error);
    } else {
      response.status(201).send({ message: 'Successfully Created', data: request.body });
    }

  });
};
const updateProduct = (request, response) => {
  const id = parseInt(request.params.id);
  const { groupId = "", skucode = "", barcode = "", prodname = "", unit = "", } = request.body;

  pool.query(
    'CALL update_product($1,$2,$3,$4,$5,$6)',
    [id, groupId, skucode, barcode, prodname, unit],
    (error, results) => {
      if (error) {
        response.status(400).send(error);
      }
      response.status(201).send({ message: 'Successfully Updated', data: request.body });
    }
  );
};
const deleteProduct = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('CALL delete_product($1)', [id], (error, results) => {
    if (error) {
      response.status(400).send(error);
    }
    response.status(201).send(results.rows[0]);
  });
};

//product price
const getProductPriceHistory = (request, response) => {
  pool.query('SELECT * FROM view_product_price_history', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getProductPrice = (request, response) => {
  pool.query('SELECT * FROM view_product_price', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createProductPrice = (request, response) => {
  const { prodId = "", price = "", tradeType = "", } = request.body;

  pool.query('CALL create_prodprice($1,$2,$3)', [prodId, price, tradeType], (error, results) => {
    if (error) {
      response.status(400).send(error);
    } else {
      response.status(201).send({ message: 'Successfully Created', data: request.body });
    }

  });
};
const updateProductPrice = (request, response) => {
  const id = parseInt(request.params.id);
  const { prodId = "", price = "", tradeType = "", } = request.body;

  pool.query(
    'CALL update_prodprice($1,$2,$3,$4)',
    [id, prodId, price, tradeType],
    (error, results) => {
      if (error) {
        response.status(400).send(error);
        throw error;
      }
      response.status(201).send({ message: 'Successfully Updated', data: request.body });
    }
  );
};
const deleteProductPrice = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('CALL delete_prodprice($1)', [id], (error, results) => {
    if (error) {
      response.status(400).send(error);
    }
    response.status(201).send(results.rows[0]);
  });
};

//TRANSACTIONS

const getBalance = async (prodId) => {
  const res = await pool.query('SELECT get_qtybal_per_product($1)', [prodId]);
  return res.rows[0].get_qtybal_per_product;
};

const isNotEnoughBal = async (lines) => {
  for (let line of lines) {
    if (await getBalance(line.prodId) <= 0 && line.modCode == 'SI') {
      return true;
    }
  }
  return false;;
};



const createTransaction = async (request, response) => {

  try {
    const { userId = "", moduleCode = "", tradeType = "", lines = [] } = request.body;
    const results = await pool.query('CALL create_transaction($1,$2,$3)', [userId, moduleCode, tradeType]);
    const transId = results.rows[0].id;

    if (await isNotEnoughBal(lines)) {
      response.status(400).send({ message: 'Not enough balance!' });
      return;
    }

    postLines(lines, transId);

    //return response
    response.status(201).send(
      {
        message: 'Successfully Created Transaction!',
        data: request.body,
        result: results
      });
  } catch (err) {
    console.log(err);
  }
};

function postLines(lines, transId) {
  try {
    lines.forEach(val => {
      pool.query('CALL create_transaction_line($1,$2,$3,$4)',
        [transId, val.prodId, val.qty, val.modCode]);
    });

  } catch (err) {
    console.log(err);
  }
}

const getGrList = (request, response) => {
  pool.query('SELECT * FROM view_gr_header ORDER BY gr_id DESC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getSales = (request, response) => {
  pool.query('SELECT * FROM view_sales_header ORDER BY sales_id DESC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};


const login = async (request, response) => {
  try {
    const { username = "", password = "", } = request.body;
    const result = await pool.query('SELECT * FROM func_login($1,$2)', [username, password]);
    response.status(200).json(result.rows);
  } catch (err) {
    if (err?.code) {
      response.status(401).send("User not found!");
    } else {
      response.status(400).send(err);
    }
  }

};


module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getModule,
  createModule,
  updateModule,
  deleteModule,
  getProductGroup,
  createProductGroup,
  updateProductGroup,
  deleteProductGroup,
  getProductPrice,
  getProductPriceHistory,
  createProductPrice,
  updateProductPrice,
  deleteProductPrice,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  createTransaction,
  getGrList,
  getSales,
  login
};
