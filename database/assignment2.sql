--1st SQL statement
INSERT INTO account (account_firstname, account_lastname, account_email, account_password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

--2nd SQL statement
UPDATE account
SET account_type = 'Admin'
WHERE email = 'tony@starkent.com';

--3rd SQL statement 
DELETE FROM public.account
WHERE account_email = 'tony@starkent.com';

--4th SQL statement
UPDATE public.inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

--5th SQL statement
SELECT inv_make, inv_model, classification.classification_name
FROM inventory
INNER JOIN classification 
ON inv_id = classification.classification_id
WHERE classification.classification_name = 'Sport';

--6th SQL statement
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');


