CREATE TABLE entities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) CHECK (type IN ('Company', 'Government', 'NGO')),
    industry VARCHAR(255),
    country VARCHAR(100),
    contact_email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE procedures (
    id SERIAL PRIMARY KEY,
    entity_id INT REFERENCES entities(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) CHECK (status IN ('Pending', 'In Progress', 'Completed')),
    assigned_to INT REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE esg_data (
    id SERIAL PRIMARY KEY,
    entity_id INT REFERENCES entities(id) ON DELETE CASCADE,
    category VARCHAR(255) NOT NULL, -- e.g., "Carbon Emissions", "Water Usage"
    source VARCHAR(255), -- e.g., "Manual Entry", "API Import"
    value TEXT NOT NULL,
    unit VARCHAR(50),
    reporting_period DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE consolidated_data (
    id SERIAL PRIMARY KEY,
    entity_id INT REFERENCES entities(id) ON DELETE CASCADE,
    standard VARCHAR(50) CHECK (standard IN ('CSRD', 'ESRS', 'ISSB', 'SEC')),
    category VARCHAR(255) NOT NULL,
    consolidated_value TEXT NOT NULL,
    unit VARCHAR(50),
    reporting_period DATE,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reports (
    id SERIAL PRIMARY KEY,
    entity_id INT REFERENCES entities(id) ON DELETE CASCADE,
    report_name VARCHAR(255) NOT NULL,
    report_type VARCHAR(100) CHECK (report_type IN ('Summary', 'Detailed', 'Compliance')),
    generated_by INT REFERENCES users(id) ON DELETE SET NULL,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    entity_id INT REFERENCES entities(id) ON DELETE CASCADE,
    action VARCHAR(255) NOT NULL,
    performed_by INT REFERENCES users(id) ON DELETE SET NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE publications (
    id SERIAL PRIMARY KEY,
    entity_id INT REFERENCES entities(id) ON DELETE CASCADE,
    report_id INT REFERENCES reports(id) ON DELETE CASCADE,
    published_url TEXT,
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
