CREATE TABLE stakeholders (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    industry VARCHAR(255),
    country VARCHAR(100),
    contact_email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE esg_metrics (
    id SERIAL PRIMARY KEY,
    stakeholder_id INT REFERENCES stakeholders(id) ON DELETE CASCADE,
    category VARCHAR(255) NOT NULL,  -- e.g., Carbon Emissions, Water Usage
    value TEXT NOT NULL,
    unit VARCHAR(50),
    reporting_year INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE materiality_matrix (
    id SERIAL PRIMARY KEY,
    stakeholder_id INT REFERENCES stakeholders(id) ON DELETE CASCADE,
    esg_factor VARCHAR(255) NOT NULL,
    impact_level INT CHECK (impact_level BETWEEN 1 AND 5), -- Scale 1-5
    likelihood INT CHECK (likelihood BETWEEN 1 AND 5), -- Scale 1-5
    justification TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pestel_analysis (
    id SERIAL PRIMARY KEY,
    stakeholder_id INT REFERENCES stakeholders(id) ON DELETE CASCADE,
    factor_type VARCHAR(255) CHECK (factor_type IN ('Political', 'Economic', 'Social', 'Technological', 'Environmental', 'Legal')),
    description TEXT NOT NULL,
    impact INT CHECK (impact BETWEEN 1 AND 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE esg_reporting_standards (
    id SERIAL PRIMARY KEY,
    stakeholder_id INT REFERENCES stakeholders(id) ON DELETE CASCADE,
    standard VARCHAR(255) CHECK (standard IN ('CSRD', 'ESRS', 'ISSB', 'SEC')),
    compliance_status VARCHAR(50) CHECK (compliance_status IN ('Not Started', 'In Progress', 'Completed')),
    notes TEXT,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE esg_risks (
    id SERIAL PRIMARY KEY,
    stakeholder_id INT REFERENCES stakeholders(id) ON DELETE CASCADE,
    risk_name VARCHAR(255) NOT NULL,
    severity INT CHECK (severity BETWEEN 1 AND 5),
    mitigation_strategy TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) CHECK (role IN ('Admin', 'Editor', 'Reviewer')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
