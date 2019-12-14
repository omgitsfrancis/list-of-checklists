USE MyNotesDb

create table Lists (
	Id int NOT NULL PRIMARY KEY IDENTITY(1,1),
	ListName varchar(20)
)

create table ListItems (
	Id int NOT NULL PRIMARY KEY IDENTITY(1,1),
	ListId int FOREIGN KEY REFERENCES Lists(Id),
	Contents varchar(50),
	IsChecked BIT 
)