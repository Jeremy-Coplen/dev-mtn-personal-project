select board_id, name as board_name, type as board_type, image as board_image, user_id from boards
where user_id = $1
and archived = false