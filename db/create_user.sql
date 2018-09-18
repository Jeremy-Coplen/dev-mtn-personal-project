insert into users (username, email, profile_image, auth_id)
values ($1, $2, $3, $4)
returning *