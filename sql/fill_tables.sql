set session my.email = 'clementbolin@gmail.com';
set session my.password = 'clementbolin';
set session my.first_name = 'Clement';
set session my.last_name = 'Bolin';
set session my.birthdate = '2001-05-25';
set session my.username = 'clementbolin';
set session my.number_user = '1';


-- load the pgcrypto extension to gen_random_uuid ()
CREATE EXTENSION pgcrypto;

INSERT INTO users
select id
      , gen_random_uuid ()
      , current_setting('my.username')
      , current_setting('my.password')
      , current_setting('my.email')
      , current_setting('my.first_name')
      , current_setting('my.last_name')
      , current_setting('my.birthdate')::date
FROM GENERATE_SERIES(1, 1) as id;
