delete from tasks
where board_id = $1;

delete from cards
where board_id = $1;

delete from boards
where board_id = $1;