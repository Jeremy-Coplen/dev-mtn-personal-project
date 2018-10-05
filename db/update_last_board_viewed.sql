update users
set last_board_viewed = $1
where user_id = $2;

select * from users
where user_id = $2;