select t.task_id, t.name as task_name from tasks t
join cards c on c.card_id = t.card_id
where c.archived = false
and t.archived = true
and c.board_id = $1