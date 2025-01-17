
-- step 1: Create a database
CREATE TYPE public.account_type AS ENUM
    ('Client', 'Employee ', ' Admin ');

ALTER TYPE public.account_type
    OWNER TO cse340;

-- step 2: Create a table for 'classification'

CREATE TABLE public.classification (
classification_id INT GENERATED BY DEFAULT AS IDENTITY,
classification_name CHARACTER VARYING  NOT NUll,
CONSTRAINT classification_pk PRIMARY KEY (classification_id)
);

--step 3: Create a table for 'inventory'
CREATE TABLE IF NOT EXISTS public.inventory
(
    inv_id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    inv_make character varying NOT NULL,
    inv_model character varying NOT NULL,
    inv_year character(4) NOT NULL,
    inv_description text NOT NULL,
    inv_image character varying NOT NULL,
    inv_thumbnail character varying NOT NULL,
    inv_price numeric(9,0) NOT NULL,
    inv_miles integer NOT NULL,
    inv_color character varying NOT NULL,
    classification_id integer NOT NULL,
    CONSTRAINT inventory_pkey PRIMARY KEY (inv_id)
);

--step 4 create relationship between 'classification' and 'inventory' tables
ALTER TABLE IF EXISTS public.inventory
    ADD CONSTRAINT fk_classification FOREIGN KEY (classification_id)
    REFERENCES public.classification (classification_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE NO ACTION;


--step 5: Create a table for 'account'
CREATE TABLE IF NOT EXISTS public.account
(
    account_id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    account_firstname character varying NOT NULL,
    account_lastname character varying NOT NULL,
    account_email character varying NOT NULL,
    account_password character varying NOT NULL,
    account_type account_type NOT NULL DEFAULT 'Client'::account_type,
    CONSTRAINT account_pkey PRIMARY KEY (account_id)
);

-- Data for table `inventory`

INSERT INTO public.inventory (
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
  )


  --insert data for table 'inventory'
SELECT * FROM public.inventory
ORDER BY inv_id ASC 



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


