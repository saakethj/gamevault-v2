import sql from 'mssql';

const config = {
  server: 'SAAKI\\STARTBASE',
  database: 'GameVault',
  options: {
    encrypt: false,
    trustServerCertificate: true,
    trustedConnection: true
  },
  port: 1433
};

export async function connectDB() {
  try {
    await sql.connect(config);
    return sql;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
}