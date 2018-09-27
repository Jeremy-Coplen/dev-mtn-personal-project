select name as card_name, card_id, board_id from cards
where board_id = $1
and archived = $2
order by card_id