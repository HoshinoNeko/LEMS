drop table if exists user; create table user
                           (
                               id       long not null auto_increment comment 'UID',
                               s_id      long not null comment 'Student ID',
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
                                     id       long not null auto_increment comment 'Instrument ID',
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
                                 id       long not null auto_increment comment 'Incident ID',
                                 s_id      long not null comment 'Student ID',
                                 i_id      long not null comment 'Instrument ID',
                                 date      datetime default current_timestamp() null comment 'Incident date',
                                 done      tinyint(1) default 1 not null comment 'Return job is done',
                                 remark   varchar(512)                             null comment 'Remark',
                                 constraint return_pk
                                     primary key (id),
                                     foreign key (s_id) references user(id),
                                     foreign key (i_id) references instrument(id)
                             )
    comment 'Return table';

drop table if exists incident; create table incident
                               (
                                   id       long not null auto_increment comment 'Incident ID',
                                   user_id  long                              null comment 'User ID',
                                   instrument_id long                        null comment 'Instrument ID',
                                   title    varchar(128)                     not null comment 'Incident title',
                                   content  text                             null comment 'Incident content',
                                   date     datetime default current_timestamp() null comment 'Incident date',
                                   done   tinyint(1)     default 1     not null comment 'Incident is done',
                                   cost    int null comment 'incident cost',
                                   remark   varchar(512)                     null comment 'Remark',
                                   constraint incident_pk
                                       primary key (id),
                                   foreign key (user_id) references user(id),
                                   foreign key (instrument_id) references instrument(id)
                               )
    comment 'Incident table';
drop table if exists schedule; create table schedule
                               (
                                   id       long not null auto_increment comment 'Schedule ID',
                                   user_id  long                              null comment 'User ID',
                                   instrument_id  long                              null comment 'Instrument ID',
                                   rent_date datetime    default now()    not null comment 'Rent date',
                                   done   tinyint(1)     default 1     not null comment 'Schedule is done',
                                   duration int                              not null comment 'Rent Duration',
                                   remark   varchar(512)                     null comment 'Remark',
                                   constraint schedule_pk
                                       primary key (id),
                                       foreign key (user_id) references user(id),
                                       foreign key (instrument_id) references instrument(id)
                               )
    comment 'Schedule table';
drop table if exists announcement; create table announcement
                               (
                                   id        bigint not null auto_increment comment 'Announcement ID',
                                   user_id   bigint       null comment 'User ID',
                                   title     text      null comment 'Announcement title',
                                   content   text      null comment 'Announcement content',
                                   add_date  datetime   default current_timestamp not null comment 'Announcement Add date',
                                   constraint announcement_pk
                                       primary key (id),
                                       foreign key (user_id) references user(id)
                               )
    comment 'Announcement table';
