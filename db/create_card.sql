insert into cards (board_id, name)
values ($1, $2)
returning name as card_name, card_id