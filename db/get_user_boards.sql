select bu.id as bu_id, b.board_id as b_id, b.user_id as b_user_id, b.name as name, b.board_type as board_type from boards_users bu
inner join boards b on b.board_id = bu.board_id
where bu.user_id = $1