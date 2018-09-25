insert into boards (name, type, user_id, image)
values ($1, $2, $3, $4)
returning board_id