package models

var Schema = `

	CREATE TABLE IF NOT EXISTS "users" (
		id SERIAL PRIMARY KEY,
		first_name VARCHAR(50) NOT NULL,
		last_name VARCHAR(50) NOT NULL,
		email VARCHAR(100) UNIQUE NOT NULL,
		age INTEGER NULL
	);
	
	ALTER TABLE "users"
	ADD COLUMN IF NOT EXISTS password TEXT NOT NULL;

	CREATE TABLE IF NOT EXISTS "projects" (
		id SERIAL PRIMARY KEY,
		name VARCHAR(200) NOT NULL,
		description TEXT NOT NULL,
		is_active BOOLEAN NOT NULL DEFAULT FALSE,
		user_id INT REFERENCES users(id),
		created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
		updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
	);

	ALTER TABLE "projects"
	ADD COLUMN IF NOT EXISTS image Text DEFAULT 'https://www.survivorsuk.org/wp-content/uploads/2017/01/no-image.jpg';
`
