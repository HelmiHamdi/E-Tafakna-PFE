export const queries = [
  `
        CREATE TABLE IF NOT EXISTS invite (
            id INT AUTO_INCREMENT PRIMARY KEY,
            sender INT,
            receiver INT,
            isAccepted BOOLEAN,
            createdAt DATETIME
        )
    `,
  `
        CREATE TABLE IF NOT EXISTS chat (
            id INT AUTO_INCREMENT PRIMARY KEY,
            sender INT,
            receiver INT,
            message VARCHAR(50) NOT NULL,
            createdAt DATETIME
        )
    `,
];
