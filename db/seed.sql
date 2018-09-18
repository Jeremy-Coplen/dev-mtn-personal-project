create table users (
    user_id serial primary key,
    username varchar(30) not null,
    email varchar(180) not null,
    last_board_viewed integer references boards(board_id),
    profile_image text not null,
    background_image text not null default 'https://image.freepik.com/free-vector/desk-background-with-to-do-list-and-office-supplies_23-2147614795.jpg,'
    auth_id text not null
);

create table boards (
    board_id serial primary key,
    name varchar(180) not null,
    board_type varchar(8) not null,
    user_id integer references users(user_id)
);

create table cards (
    card_id serial primary key,
    board_id integer references boards(board_id),
    name varchar(30) not null
);

create table tasks (
    task_id serial primary key,
    name varchar(50) not null,
    card_id integer references cards(card_id),
    details varchar(260),
    archived boolean not null default false
);

create table teams (
    team_id serial primary key,
    name varchar(30) not null,
    image text not null default 'https://robohash.org/team.png?size=100x100'
);

create table boards_users (
    id serial primary key,
    board_id integer references boards(board_id),
    user_id integer references users(user_id)
);

create table boards_teams (
    id serial primary key,
    board_id integer references boards(board_id),
    team_id integer references teams(team_id)
);

create table users_teams (
    id serial primary key,
    user_id integer references users(user_id),
    team_id integer references teams(team_id)
);