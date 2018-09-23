insert into tasks (name, card_id, details, board_id)
values ($1, $2, $3, $4)
returning task_id, name as task_name, details as task_details