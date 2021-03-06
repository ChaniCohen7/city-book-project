USE [CityBookDataBase]
GO
/****** Object:  Table [dbo].[Kid]    Script Date: 6/30/2021 2:33:27 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Kid](
	[FullName] [nvarchar](50) NULL,
	[BornDate] [date] NULL,
	[TZ] [varchar](10) NULL,
	[id] [int] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_Kid] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 6/30/2021 2:33:27 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[FirstName] [nvarchar](50) NULL,
	[LastName] [nvarchar](50) NULL,
	[TZ] [varchar](10) NULL,
	[BornDate] [date] NULL,
	[Genus] [nvarchar](10) NULL,
	[HMO] [nvarchar](50) NULL,
	[NumChildren] [int] NULL,
	[Id] [int] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Kid]  WITH CHECK ADD  CONSTRAINT [FK_Kid_User] FOREIGN KEY([id])
REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[Kid] CHECK CONSTRAINT [FK_Kid_User]
GO
