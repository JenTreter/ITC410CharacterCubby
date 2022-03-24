CREATE TABLE "users"
(
  "user_id" varchar(100) NOT NULL,
  "username" varchar(40) NOT NULL,
  "email" varchar(100) NOT NULL,
  "password" varchar(100) NOT NULL,
  "pronouns" varchar(20) NOT NULL,
  "profilePicture" varchar(600),
  "aboutMe" text,
  PRIMARY KEY ("user_id"),
  UNIQUE ("username"),
  UNIQUE ("email")
);

CREATE TABLE "templates"
(
  "template_id" varchar(100) NOT NULL,
  "name" varchar(100) NOT NULL,
  "description" text,
  "permissions" varchar(7) NOT NULL,
  "fields" JSON NOT NULL,
  "user_id" character(32) NOT NULL,
  PRIMARY KEY ("template_id"),
  FOREIGN KEY ("user_id") REFERENCES "users"("user_id")
);

CREATE TABLE "characters"
(
  "character_id" varchar(100) NOT NULL,
  "name" varchar(100) NOT NULL,
  "thumbnail" varchar(600),
  "information" JSON NOT NULL,
  "user_id" character(32) NOT NULL,
  "template_id" character(32) NOT NULL,
  PRIMARY KEY ("character_id"),
  FOREIGN KEY ("user_id") REFERENCES "users"("user_id"),
  FOREIGN KEY ("template_id") REFERENCES "templates"("template_id")
);

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
CREATE INDEX "IDX_session_expire" ON "session" ("expire");