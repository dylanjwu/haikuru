
CREATE TABLE haikus (
	id serial PRIMARY KEY,
	haiku_text text NOT NULL,
	author integer REFERENCES users
);

CREATE TABLE likes (
	id serial PRIMARY KEY,
	haiku_id integer REFERENCES haikus,
	user_id integer REFERENCES NULL
	last_logged_in TIMESTAMP,
	password text not null
);

CREATE TABLE dislikes (
	id serial PRIMARY KEY,
	haiku_id integer REFERENCES haikus,
	user_id integer REFERENCES users
);

CREATE TABLE comments (
	id serial PRIMARY KEY,
	haiku_id integer REFERENCES haikus,
	user_id integer REFERENCES users,
	comment_text text NOT NULL
);

CREATE TABLE comment_likes (
	id serial PRIMARY KEY,
	comment_id integer REFERENCES comments,
	user_id integer REFERENCES users
);

CREATE TABLE comment_dislikes (
	id serial PRIMARY KEY,
	comment_id integer REFERENCES comments,
	user_id integer REFERENCES users
);

CREATE TABLE follower_followed (
	follower_id integer REFERENCES users,
	followed_id integer REFERENCES users,
	PRIMARY KEY (follower_id, followed_id)
);
