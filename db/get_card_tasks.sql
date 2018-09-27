select name as task_name, task_id, details as task_details, archived as task_archived from tasks
where card_id = $1
and archived = $2
order by task_id