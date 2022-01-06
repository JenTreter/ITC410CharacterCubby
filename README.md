# Semester Project Proposal

I'm going to create a custom character template builder website, called "Character Cubby." Character Cubby will allow users to create a character template with various attributes (i.e. name, stats, pictures) that can be published and then filled out with specific character instances of that template. This will enable people to create and share custom biography pages for their original characters while avoiding reptitive and time-consuming template creation and use such as seen on toyhou.se, Google Sheets, and other less-specialized custom website builders. 

Users will be able to create character templates that they can later edit, delete, and use to create their own instances of that template that will be displayed on Character Cubby. Templates can be made either private (personal use only) or public (free to be used by any user). Created character instances can also be private or public for other users to view. Only the creator of a template or character instance may edit it. 

Character Cubby will have a page for users to conveniently view all of the templates they've created, and the characters that they've made with those templates. There will be grouping, filtering, and sort options to allow users to easily view certain characters as fits their current use case. 

# DDD 

## Events 

- user created
- user updated
- user deleted
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
- update user information
- delete user
- create template
- update template information
- delete template
- create template field
- update template field
- delete template field
- create character
- update character
- delete character

## Entities 

**User**
- user id (unique)
- username (unique)
- email (unique)
- password (hashed)
- pronouns (string)
- profile picture (file upload, png jpg only, limited size, can be empty)
- description (string, can be empty)

**Template**
- template id (unique)
- user id (unique)
- description (string, can be empty)
- fields (dynamic and user-generated array of fields; possible value types are short text, long text, decimal number, calculated numeric value, hyperlink, image, bulleted list, numeric list, and table; fields have an order, and the order can be changed)
- permissions (either private (only the creator can use) or public (any user can use))

**Character**
- character id (unique)
- user id (unique)
- template id (the template that was used)
- data (array of filled out fields for template)


## Value Objects 

**Image**

- image id (unique)
- data