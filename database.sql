CREATE DATABASE IF NOT EXISTS jobtrack;
USE jobtrack;

CREATE TABLE IF NOT EXISTS users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(80) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'USER'
);

CREATE TABLE IF NOT EXISTS job_applications (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  company VARCHAR(120) NOT NULL,
  role_title VARCHAR(150) NOT NULL,
  status VARCHAR(30) NOT NULL,
  applied_date DATE NOT NULL,
  job_url VARCHAR(500),
  notes VARCHAR(2000),
  CONSTRAINT fk_job_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_job_user_date ON job_applications(user_id, applied_date);
CREATE INDEX idx_job_user_status ON job_applications(user_id, status);
