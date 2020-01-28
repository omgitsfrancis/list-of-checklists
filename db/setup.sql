CREATE DATABASE MyNotesDb;
GO 

USE MyNotesDb;

create table Lists (
	Id int NOT NULL PRIMARY KEY IDENTITY(1,1),
	ListName varchar(20)
);

create table ListItems (
	Id int NOT NULL PRIMARY KEY IDENTITY(1,1),
	ListId int FOREIGN KEY REFERENCES Lists(Id),
	Contents varchar(50),
	IsChecked BIT 
)
GO

use MyNotesDb;

insert into Lists (ListName) values ('List 1');
insert into Lists (ListName) values ('List 2');
insert into Lists (ListName) values ('List 3');
insert into Lists (ListName) values ('List 4');
insert into Lists (ListName) values ('List 5');

insert into ListItems (ListId, Contents, IsChecked) values (1, 'rghsrdhrsdhrdh', 1);
insert into ListItems (ListId, Contents, IsChecked) values (1, 'fdgfdgsrrhrs', 0);
insert into ListItems (ListId, Contents, IsChecked) values (1, 'Srsdhsrdhrdhsrdtuff', 0);
insert into ListItems (ListId, Contents, IsChecked) values (1, 'rdhgsdrhdhshr', 0);
insert into ListItems (ListId, Contents, IsChecked) values (1, 'Stsrhraharhrahauff', 0);

insert into ListItems (ListId, Contents, IsChecked) values (2, 'rghsrdhrsdhrdh', 1);
insert into ListItems (ListId, Contents, IsChecked) values (2, 'fdgfdgsrrhrs', 0);
insert into ListItems (ListId, Contents, IsChecked) values (2, 'Srsdhsrdhrdhsrdtuff', 0);

--insert into ListItems (ListId, Contents, IsChecked) values (3, 'rghsrdhrsdhrdh', 1);

insert into ListItems (ListId, Contents, IsChecked) values (4, 'Srsdhsrdhrdhsrdtuff', 1);
insert into ListItems (ListId, Contents, IsChecked) values (4, 'rdhgsdrhdhshr', 1);
insert into ListItems (ListId, Contents, IsChecked) values (4, 'Stsrhraharhrahauff', 1);

insert into ListItems (ListId, Contents, IsChecked) values (5, 'rghsrdhrsdhrdh', 1);
insert into ListItems (ListId, Contents, IsChecked) values (5, 'fdgfdgsrrhrs', 0);
insert into ListItems (ListId, Contents, IsChecked) values (5, 'Srsdhsrdhrdhsrdtuff', 0);
insert into ListItems (ListId, Contents, IsChecked) values (5, 'rdhgsdrhdhshr', 0);
insert into ListItems (ListId, Contents, IsChecked) values (5, 'Stsrhraharhrahauff', 0);
insert into ListItems (ListId, Contents, IsChecked) values (5, 'rghsrdhrsdhrdh', 1);
insert into ListItems (ListId, Contents, IsChecked) values (5, 'fdgfdgsrrhrs', 0);
insert into ListItems (ListId, Contents, IsChecked) values (5, 'Srsdhsrdhrdhsrdtuff', 0);
insert into ListItems (ListId, Contents, IsChecked) values (5, 'rghsrdhrsdhrdh', 1);
insert into ListItems (ListId, Contents, IsChecked) values (5, 'Srsdhsrdhrdhsrdtuff', 1);
insert into ListItems (ListId, Contents, IsChecked) values (5, 'rdhgsdrhdhshr', 1);
insert into ListItems (ListId, Contents, IsChecked) values (5, 'Stsrhraharhrahauff', 1);
GO