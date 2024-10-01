// models/adminModel.js
import { query as _query } from '../config/db';

export function getAdmin(callback) {
  const query = 'SELECT * FROM admin LIMIT 1';
  _query(query, (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
}

export function updateAdmin(data, callback) {
  const query = 'UPDATE admin SET username = ?, email = ?, password = ? WHERE id = ?';
  const params = [data.username, data.email, data.password, data.id];
  _query(query, params, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
}
