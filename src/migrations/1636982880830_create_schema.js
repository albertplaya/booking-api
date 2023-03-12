module.exports = {
  up: `
  CREATE TABLE partner( partner_id VARCHAR(40)PRIMARY KEY, email VARCHAR(40), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);
    `,
  down: 'DROP TABLE partner;',
};
