select image as board_image, name as board_name, board_type from boards
where board_id = $1
and user_id = $2