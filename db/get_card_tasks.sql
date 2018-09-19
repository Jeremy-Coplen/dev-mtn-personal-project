select name as task_name, task_id, card_id, details as task_details, archived as task_archived from tasks
where board_id = $1