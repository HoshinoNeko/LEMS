drop table if exists user; create table user
                           (
                               id       int not null auto_increment comment 'UID',
                               s_id      int not null comment 'Student ID',
                               sname text                                     null comment 'Username',
                               email    varchar(64)                              null comment 'User Email',
                               password   varchar(256)                                    not null comment 'Password',
                               enable   tinyint      default 0                   not null comment 'User is enabled',
                               reg_date datetime     default current_timestamp() null comment 'Register date',
                               reg_ip   varchar(182) default '127.0.0.1' null comment 'Register ip',
                               role     tinyint(1)   default 0                   not null comment 'Role',
                               remark   varchar(512)                             null comment 'Remark',
                               constraint user_pk
                                   primary key (id)
                           )
    comment 'User table';

drop table if exists instrument; create table instrument
                                 (
                                     id       int not null auto_increment comment 'Instrument ID',
                                     name     varchar(64)                              null comment 'Instrument Name',
                                     symbol   varchar(64)                              null comment 'Instrument Symbol',
                                     location varchar(64)                              null comment 'Instrument Location',
                                     instruction varchar(64)                           null comment 'Instrument Instruction',
                                     enable   tinyint      default 0                   not null comment  'Instrument is enabled',
                                     remark   varchar(512)                             null comment 'Remark',
                                     add_date datetime default current_timestamp() null comment 'Device add date',
                                     occupied tinyint default 0 not null comment 'Instrument is occupied',
                                     department varchar(64)                             null comment 'Department',
                                     constraint instrument_pk
                                         primary key (id)
                                 )
    comment 'Instrument table';

drop table if exists ireturn; create table ireturn
                             (
                                 id       int not null auto_increment comment 'Incident ID',
                                 s_id      int not null comment 'Student ID',
                                 i_id      int not null comment 'Instrument ID',
                                 date      datetime default current_timestamp() null comment 'Incident date',
                                 done      tinyint(1) default 1 not null comment 'Return job is done',
                                 remark   varchar(512)                             null comment 'Remark',
                                 constraint return_pk
                                     primary key (id),
                                     foreign key (s_id) references user(id),
                                     foreign key (i_id) references instrument(id)
                             )
    comment 'Incident table';

drop table if exists incident; create table incident
                               (
                                   id       int not null auto_increment comment 'Incident ID',
                                   user_id  int                              null comment 'User ID',
                                   instrument_id int                        null comment 'Instrument ID',
                                   title    varchar(128)                     not null comment 'Incident title',
                                   content  text                             null comment 'Incident content',
                                   done   tinyint(1)     default 1     not null comment 'Incident is done',
                                   remark   varchar(512)                     null comment 'Remark',
                                   constraint incident_pk
                                       primary key (id),
                                   foreign key (user_id) references user(id),
                                   foreign key (instrument_id) references instrument(id)
                               )
    comment 'Incident table';
drop table if exists schedule; create table schedule
                               (
                                   id       int not null auto_increment comment 'Schedule ID',
                                   user_id  int                              null comment 'User ID',
                                   instrument_id  int                              null comment 'Instrument ID',
                                   rent_date datetime    default now()    not null comment 'Rent date',
                                   duration int                              not null comment 'Rent Duration',
                                   remark   varchar(512)                     null comment 'Remark',
                                   constraint schedule_pk
                                       primary key (id),
                                   foreign key (user_id) references user(id),
                                   foreign key (instrument_id) references instrument(id)
                               )
    comment 'Schedule table';
