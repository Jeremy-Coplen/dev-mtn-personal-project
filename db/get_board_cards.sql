select b.name as board_name, b.board_type as board_type, c.name as card_name from boards_cards bc
join boards b on b.board_id = bc.board_id
join cards c on c.card_id = bc.card_id
where b.board_id = $1