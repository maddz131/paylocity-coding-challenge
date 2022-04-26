CREATE TABLE [dbo].[Dependent]
(
	[DependentID] INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	[FirstName] varchar(50) NOT NULL,
	[LastName] varchar(50) NOT NULL,
	[Relationship] varchar(50) NOT NULL,
	[EmployeeID] INT NOT NULL, 
    CONSTRAINT [FK_Dependent_ToTable] FOREIGN KEY ([EmployeeID]) REFERENCES [Employee]([EmployeeID])
)
