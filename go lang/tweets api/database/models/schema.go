package models

var Schema = `

	CREATE TABLE IF NOT EXISTS "users" (
		id SERIAL PRIMARY KEY,
		username VARCHAR(100) NOT NULL,
		password TEXT NOT NULL,
		email VARCHAR(250) NOT NULL UNIQUE,
		created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
		updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
	);

	CREATE TABLE IF NOT EXISTS "followers" (
		follower_id INT NOT NULL,
		leader_id INT NOT NULL,
		PRIMARY KEY (follower_id,leader_id),

		FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
		FOREIGN KEY (leader_id) REFERENCES users(id) ON DELETE CASCADE,
		created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
	);

	CREATE TABLE IF NOT EXISTS "following" ( 
		leader_id INT NOT NULL,
		followed_id INT NOT NULL,
		PRIMARY KEY (leader_id,followed_id),

		FOREIGN KEY (leader_id) REFERENCES users(id) ON DELETE CASCADE,
		FOREIGN KEY (followed_id) REFERENCES users(id) ON DELETE CASCADE,
		created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
	);	

	DO
	$$
	BEGIN
	IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname='tweetype') THEN
		CREATE TYPE TWEETYPE AS ENUM('Free','Paid');
	END IF;
	END
	$$;	

	CREATE TABLE IF NOT EXISTS "tweet" (
		id SERIAL PRIMARY KEY,
		title VARCHAR(100) NOT NULL,
		content VARCHAR(500) NOT NULL,
		user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
		type TWEETYPE DEFAULT 'Free',
		price DECIMAL,
		created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
		updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()		
	);

	CREATE TABLE IF NOT EXISTS "comments" (
		id SERIAL PRIMARY KEY,
		content VARCHAR(500) NOT NULL,
		user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
		post_id INTEGER REFERENCES tweet(id) ON DELETE CASCADE NOT NULL,
		created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
		updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()			
	);


	CREATE TABLE IF NOT EXISTS "likes" (
		id SERIAL PRIMARY KEY,
		user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
		post_id INTEGER REFERENCES tweet(id) ON DELETE CASCADE NOT NULL,
		created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
		updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()			
	);	

	CREATE TABLE IF NOT EXISTS "notification" (
		id SERIAL PRIMARY KEY,
		user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
		from_user_id INTEGER NOT NULL,
		from_username VARCHAR(300),
		message TEXT NOT NULL,
		read_status BOOLEAN DEFAULT FALSE,
		created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
	);
`

/*purchase
post_id
user_id
FOREIGN KEY (post_id)
FOREIGN KEY (user_id)
*/
/*  payment
id
post_id
user_id
amount
payment_status
transaction_id

*/
//:following(leader_id)  user who is following another user
//:followers(leader_id)  user who is being followed by another user
