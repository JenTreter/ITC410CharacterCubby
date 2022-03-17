CREATE TABLE "users"
(
  "user_id" character(32) NOT NULL,
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
  "template_id" character(32) NOT NULL,
  "name" varchar(100) NOT NULL,
  "description" text,
  "permissions" varchar(7) NOT NULL,
  "fields" JSON NOT NULL,
  "user_id" character(32) NOT NULL,
  PRIMARY KEY ("template_id"),
  FOREIGN KEY ("user_id") REFERENCES "users"("user_id"),
);

CREATE TABLE "characters"
(
  "character_id" character(32) NOT NULL,
  "name" varchar(100) NOT NULL,
  "thumbnail" varchar(600),
  "information" JSON NOT NULL,
  "user_id" character(32) NOT NULL,
  "template_id" character(32) NOT NULL,
  PRIMARY KEY ("character_id"),
  FOREIGN KEY ("user_id") REFERENCES "users"("user_id"),
  FOREIGN KEY ("template_id") REFERENCES "templates"("template_id")
);