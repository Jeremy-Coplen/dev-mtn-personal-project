insert into tasks (name, card_id, details)
values ($1, $2, $3)
returning task_id, name as task_name, details as task_details