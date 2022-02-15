# Semester Project Proposal

I'm going to create a custom character template builder website, called "Character Cubby." Character Cubby will allow users to create a character template with various attributes (i.e. name, stats, pictures) that can be published and then filled out with specific character instances of that template. This will enable people to create and share custom biography pages for their original characters while avoiding reptitive and time-consuming template creation and use such as seen on toyhou.se, Google Sheets, and other less-specialized custom website builders. 

Users will be able to create character templates that they can later edit, delete, and use to create their own instances of that template that will be displayed on Character Cubby. Templates can be made either private (personal use only) or public (free to be used by any user). Created character instances can also be private or public for other users to view. Only the creator of a template or character instance may edit it. 

Character Cubby will have a page for users to conveniently view all of the templates they've created, and the characters that they've made with those templates. There will be grouping, filtering, and sort options to allow users to easily view certain characters as fits their current use case. 

# DDD 

## Events 

- user created
- user updated
- user deleted
- user logged in
- user logged out
- template created
- template updated
- template deleted
- template field created
- template field updated
- template field deleted
- character created
- character updated
- character deleted

## Commands 

- create user
- update user
- delete user
- log in user
- log out user
- create template
- update template 
- delete template
- create character
- update character
- delete character

## Entities 

### User
The users of the website, who create and use templates to fill out biographies for their characters.

| Property | Type | Description |
| ------ | ------ | ------ |
| user_id | UUID | Auto-generated, unique, immutable. |
| username | string | Unique, the user's chosen display name. |
| email | string | Unique, the user's associated email address. |
| password | encrypted text | The user's password. |
| pronouns | string | The pronouns the user wishes to use. |
| profilePicture | file | (Optional) png jpg only, limited size. |
| aboutMe | text | (Optional) information about the user that they wish to provide. |

### Template
Forms created by users with different kinds of fields. Templates are filled out by the user later to create characters of the template type.
| Property | Type | Description |
| ------ | ------ | ------ |
| template_id | UUID | Auto-generated, unique, immutable. |
| user_id | UUID | Unique, the id of the user who created the template. |
| name | string | Name of the template. |
| description | string | (Optional) information about the template. |
| permissions | string | Permissions for who may view and use the template, either private (only the creator can use) or public (any user can use). |
| fields | array | Dynamic and user-generated array of fields; possible value types are short text, long text, decimal number, calculated numeric value, hyperlink, image, bulleted list, numeric list, and table; fields have an order, and the order can be changed. |

### Character
Instances of templates created by users with fields of the template filled out.
| Property | Type | Description |
| ------ | ------ | ------ |
| character_id | UUID | Auto-generated, unique, immutable. |
| user_id | UUID | Unique, the id of the user who created the template. |
| template_id | UUID | Unique, the id of the template used for this character. |
| name | string | Name of the character. |
| information | array | A 2D array of filled out fields for template. |
| thumbnail | file | (Optional) png jpg only, limited size. |



## Value Objects 

**Image**

- image_id (unique)
- data

| Property | Type | Description |
| ------ | ------ | ------ |
| image_id | UUID | Auto-generated, unique, immutable. |
| fileData | file | The data of the file. |

# REST API Design

## User Account
The users of the website, who create and use templates to fill out biographies for their characters.

### Commands 
| Query | URL Fragment | HTTP Method | Path Parameters |
| ------ | ------ | ------ | ------ |
| create user | ```/users``` | POST |   |
| update user | ```/users/{user_id}``` | PUT | ```user_id``` |
| delete user | ```/users/{user_id}``` | DELETE | ```user_id``` |
| log in user | ```/users/{user_id}/login``` | PUT | ```user_id``` |
| log out user | ```/users/{user_id}/logout``` | PUT | ```user_id``` |

### Queries
| Query | URL Fragment | HTTP Method | Path Parameters |
| ------ | ------ | ------ | ------ |
| get user | ```/users/{user_id}``` | GET | ```user_id``` |

### Request Bodies
#### Create User
````JSON
{
  "username": "JellyCat",
  "email": "JellyCats89@gmail.com",
  "pronouns": "She/Her",
  "profilePicture": "c3RyaW5nIGV4YW1wbGU=",
  "aboutMe": "smol bean who likes cats"
}
````

#### Update User
````JSON
{
  "username": "JellyCat",
  "email": "JellyCats89@gmail.com",
  "pronouns": "She/Her",
  "profilePicture": "c3RyaW5nIGV4YW1wbGU=",
  "aboutMe": "smol bean who likes cats"
}
````

#### User Log In
````JSON
{
  "password": "jumpingjellybeans8!"
}
````

### Response Bodies
#### Get User
````JSON
{
  "username": "JellyCat",
  "email": "JellyCats89@gmail.com",
  "pronouns": "She/Her",
  "profilePicture": "c3RyaW5nIGV4YW1wbGU=",
  "aboutMe": "smol bean who likes cats"
}
````

## Template
Forms created by users with different kinds of fields. Templates are filled out by the user later to create characters of the template type.

### Commands 
| Query | URL Fragment | HTTP Method | Path Parameters |
| ------ | ------ | ------ | ------ |
| create template | ```/templates``` | POST |   |
| update template | ```/templates/{template_id}``` | PUT | ```template_id``` |
| delete template | ```/templates/{template_id}``` | DELETE | ```template_id``` |

### Queries
| Query | URL Fragment | HTTP Method | Path Parameters |
| ------ | ------ | ------ | ------ |
| get template | ```/templates/{template_id}``` | GET | ```template_id``` |

### Request Bodies
#### Create Template
````JSON
{
  "user_id": "237e9877-e79b-12d4-a765-321741963000",
  "template_id": "583e5a7b-48bc-913f-0dd4-463559268361",
  "name": "Monarch",
  "description": "Fluttercats are small, feline fae.",
  "permissions": "Public",
  "information": [
    {
      "fieldName": "Pronouns",
      "information": "She/Her"
    },
    {
      "fieldName": "Wing Type",
      "information": "Monarch Butterfly"
    },
    {
      "fieldName": "Coat Pattern",
      "information": "Solid dark grey, short fur"
    },
    {
      "fieldName": "Height at Shoulder",
      "information": 5.7
    },
    {
   
````

#### Update Template
````JSON
{
  "user_id": "237e9877-e79b-12d4-a765-321741963000",
  "template_id": "583e5a7b-48bc-913f-0dd4-463559268361",
  "name": "Monarch",
  "description": "Fluttercats are small, feline fae.",
  "permissions": "Public",
  "information": [
    {
      "fieldName": "Pronouns",
      "information": "She/Her"
    },
    {
      "fieldName": "Wing Type",
      "information": "Monarch Butterfly"
    },
    {
      "fieldName": "Coat Pattern",
      "information": "Solid dark grey, short fur"
    },
    {
      "fieldName": "Height at Shoulder",
      "information": 5.7
    },
    {
      "fieldName": "Description",
      "information": "On the larger side for a Fluttercat with big, vivid wings and bright amber eyes. She has a small scar on her chin."
    },
    {
      "fieldName": "Personality",
      "information": "Stiff and formal, Monarch can be a hard character to get along with at first. Still, she does eventually warm up to other Fluttercats, given enough time."
    }
  ],
  "thumbnail": "c3RyaW5nIGV4YW1wbGU="
}
````

### Response Bodies
#### Get Template
````JSON
{
  "user_id": "237e9877-e79b-12d4-a765-321741963000",
  "template_id": "583e5a7b-48bc-913f-0dd4-463559268361",
  "name": "Monarch",
  "description": "Fluttercats are small, feline fae.",
  "permissions": "Public",
  "information": [
    {
      "fieldName": "Pronouns",
      "information": "She/Her"
    },
    {
      "fieldName": "Wing Type",
      "information": "Monarch Butterfly"
    },
    {
      "fieldName": "Coat Pattern",
      "information": "Solid dark grey, short fur"
    },
    {
      "fieldName": "Height at Shoulder",
      "information": 5.7
    },
    {
      "fieldName": "Description",
      "information": "On the larger side for a Fluttercat with big, vivid wings and bright amber eyes. She has a small scar on her chin."
    },
    {
      "fieldName": "Personality",
      "information": "Stiff and formal, Monarch can be a hard character to get along with at first. Still, she does eventually warm up to other Fluttercats, given enough time."
    }
  ],
  "thumbnail": "c3RyaW5nIGV4YW1wbGU="
}
````

## Character
Instances of templates created by users with fields of the template filled out.

### Commands 
| Query | URL Fragment | HTTP Method | Path Parameters |
| ------ | ------ | ------ | ------ |
| create character | ```/characters``` | POST |   |
| update character | ```/characters/{character_id}``` | PUT | ```character_id``` |
| delete character | ```/characters/{character_id}``` | DELETE | ```character_id``` |

### Queries
| Query | URL Fragment | HTTP Method | Path Parameters |
| ------ | ------ | ------ | ------ |
| get character | ```/characters/{character_id}``` | GET | ```character_id``` |

### Request Bodies
#### Create Character
````JSON
{
  "user_id": "237e9877-e79b-12d4-a765-321741963000",
  "template_id": "583e5a7b-48bc-913f-0dd4-463559268361",
  "name": "Monarch",
  "permissions": "Public",
  "information": [
    {
      "fieldName": "Pronouns",
      "information": "She/Her"
    },
    {
      "fieldName": "Wing Type",
      "information": "Monarch Butterfly"
    },
    {
      "fieldName": "Coat Pattern",
      "information": "Solid dark grey, short fur"
    },
    {
      "fieldName": "Height at Shoulder",
      "information": 5.7
    },
    {
      "fieldName": "Description",
      "information": "On the larger side for a Fluttercat with big, vivid wings and bright amber eyes. She has a small scar on her chin."
    },
    {
      "fieldName": "Personality",
      "information": "Stiff and formal, Monarch can be a hard character to get along with at first. Still, she does eventually warm up to other Fluttercats, given enough time."
    }
  ],
  "thumbnail": "c3RyaW5nIGV4YW1wbGU="
}
````

#### Update Character
````JSON
{
  "user_id": "237e9877-e79b-12d4-a765-321741963000",
  "template_id": "583e5a7b-48bc-913f-0dd4-463559268361",
  "name": "Monarch",
  "permissions": "Public",
  "information": [
    {
      "fieldName": "Pronouns",
      "information": "She/Her"
    },
    {
      "fieldName": "Wing Type",
      "information": "Monarch Butterfly"
    },
    {
      "fieldName": "Coat Pattern",
      "information": "Solid dark grey, short fur"
    },
    {
      "fieldName": "Height at Shoulder",
      "information": 5.7
    },
    {
      "fieldName": "Description",
      "information": "On the larger side for a Fluttercat with big, vivid wings and bright amber eyes. She has a small scar on her chin."
    },
    {
      "fieldName": "Personality",
      "information": "Stiff and formal, Monarch can be a hard character to get along with at first. Still, she does eventually warm up to other Fluttercats, given enough time."
    }
  ],
  "thumbnail": "c3RyaW5nIGV4YW1wbGU="
}
````

### Response Bodies
#### Get Character
````JSON
{
  "user_id": "237e9877-e79b-12d4-a765-321741963000",
  "template_id": "583e5a7b-48bc-913f-0dd4-463559268361",
  "name": "Monarch",
  "permissions": "Public",
  "information": [
    {
      "fieldName": "Pronouns",
      "information": "She/Her"
    },
    {
      "fieldName": "Wing Type",
      "information": "Monarch Butterfly"
    },
    {
      "fieldName": "Coat Pattern",
      "information": "Solid dark grey, short fur"
    },
    {
      "fieldName": "Height at Shoulder",
      "information": 5.7
    },
    {
    
````