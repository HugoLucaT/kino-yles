-- This function is needed to insert data into the membership and user_data tables
-- it's used in ations.ts  

CREATE OR REPLACE FUNCTION insert_user_data_with_membership(
    auth_uuid UUID,
    username varchar,
    first_name varchar,
    last_name varchar,
    birth_date DATE,
    user_id UUID,
    membership_ids INT[],
    bought_tickets INT
)
RETURNS VOID AS $$
DECLARE
    membership_count INT;
BEGIN
    -- Insert into user_data table
    INSERT INTO user_data (auth_uuid, username, first_name, last_name, birth_date)
    VALUES (auth_uuid, username, first_name, last_name, birth_date);

    membership_count := array_length(membership_ids, 1);

    IF membership_count > 0 THEN
        FOR i IN 1..membership_count LOOP
            INSERT INTO user_membership (user_id, membership_id, bought_tickets)
            VALUES (user_id, membership_ids[i], bought_tickets);
        END LOOP;
    END IF;
END;
$$ LANGUAGE plpgsql;