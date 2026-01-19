export const csc111Questions = [
  {
    id: "csc111-001",
    question: "A DBMS is a collection of",
    options: [
      "Programs only",
      "Interrelated data only",
      "Interrelated data and programs",
      "Files only",
    ],
    answer: "Interrelated data and programs",
    reason:
      "A Database Management System consists of a collection of interrelated data and a set of programs to access that data.",
  },
  {
    id: "csc111-002",
    question: "The primary goal of a DBMS is to provide",
    options: [
      "Fast computers",
      "Secure hardware",
      "Convenient and efficient data storage and retrieval",
      "Cheap storage",
    ],
    answer: "Convenient and efficient data storage and retrieval",
    reason:
      "DBMS is designed to manage large bodies of information efficiently while making it easy for users to store and retrieve data.",
  },
  {
    id: "csc111-003",
    question: "Information is transformed from data mainly through",
    options: ["Hardware", "DBMS", "Compiler", "Operating system"],
    answer: "DBMS",
    reason:
      "The DBMS processes raw data into organized and meaningful information for the user.",
  },
  {
    id: "csc111-004",
    question: 'The word "data" comes from the word',
    options: ["Date", "Database", "Datum", "Detail"],
    answer: "Datum",
    reason: "Datum is the singular form of the Latin word data.",
  },
  {
    id: "csc111-005",
    question: "Data is considered",
    options: ["Meaningless", "Interchangeably", "Fixed", "Permanent"],
    answer: "Meaningless",
    reason:
      "Data is generally considered raw facts that lack meaning until they are processed into information.",
  },
  {
    id: "csc111-006",
    question: "A database is an ________ collection of data",
    options: ["Random", "Unorganized", "Organized", "Temporary"],
    answer: "Organized",
    reason:
      "By definition, a database is a structured and organized collection of related data.",
  },
  {
    id: "csc111-007",
    question: "Which of the following is NOT a database",
    options: ["MYSQL", "Oracle", "MongoDB", "MS Word"],
    answer: "MS Word",
    reason:
      "MS Word is a word processor, while the others are Database Management Systems.",
  },
  {
    id: "csc111-008",
    question: "File processing systems suffer from",
    options: [
      "Data independence",
      "Data redundancy",
      "High security",
      "Better performance",
    ],
    answer: "Data redundancy",
    reason:
      "Traditional file systems often have duplicated data across different files, leading to redundancy.",
  },
  {
    id: "csc111-009",
    question: "Data redundancy leads to",
    options: [
      "Data integrity",
      "Data inconsistency",
      "Data independence",
      "Data security",
    ],
    answer: "Data inconsistency",
    reason:
      "When data is redundant, different versions of the same data may not match, causing inconsistency.",
  },
  {
    id: "csc111-010",
    question: "Difficulty accessing data is a problem of",
    options: ["DBMS", "Database", "File system", "SQL"],
    answer: "File system",
    reason:
      "Traditional file systems make it difficult to retrieve specific data efficiently compared to a DBMS.",
  },
  {
    id: "csc111-011",
    question: "When data is scattered in different files, it is called",
    options: [
      "Data abstraction",
      "Data isolation",
      "Data integrity",
      "Metadata",
    ],
    answer: "Data isolation",
    reason:
      "Data isolation refers to the difficulty of accessing data because it is stored in various files and formats.",
  },
  {
    id: "csc111-012",
    question: "Atomicity problems occur due to",
    options: [
      "Human errors",
      "Incomplete transactions",
      "Hardware upgrades",
      "Backup systems",
    ],
    answer: "Incomplete transactions",
    reason:
      "Atomicity ensures that a transaction happens completely or not at all; partial completions cause atomicity problems.",
  },
  {
    id: "csc111-013",
    question: "Concurrent-access anomalies occur when",
    options: [
      "One user accesses data",
      "Many users update data simultaneously",
      "Data is read-only",
      "Data is encrypted",
    ],
    answer: "Many users update data simultaneously",
    reason:
      "When multiple users attempt to update the same data at the same time, it can lead to inconsistent values.",
  },
  {
    id: "csc111-014",
    question: "Security is difficult to enforce in",
    options: ["DBMS", "Database", "File system", "SQL"],
    answer: "File system",
    reason:
      "In file systems, security constraints are hard to apply as files are often owned by different programs.",
  },
  {
    id: "csc111-015",
    question: "Integrity constraints are enforced by",
    options: ["Users", "Programs", "Hardware", "Compiler"],
    answer: "Programs",
    reason:
      "In traditional systems, integrity constraints are coded directly into application programs.",
  },
  {
    id: "csc111-016",
    question: "Data processed to be useful is called",
    options: ["Metadata", "Information", "Knowledge", "Database"],
    answer: "Information",
    reason:
      "Information is data that has been processed, organized, or structured to be meaningful.",
  },
  {
    id: "csc111-017",
    question: "Data that describes data is called",
    options: ["Information", "Metadata", "Schema", "Instance"],
    answer: "Metadata",
    reason:
      "Metadata provides information about the characteristics and structure of other data.",
  },
  {
    id: "csc111-018",
    question: "A key is used to",
    options: [
      "Store data",
      "Encrypt data",
      "Uniquely identify records",
      "Delete data",
    ],
    answer: "Uniquely identify records",
    reason:
      "Keys, such as primary keys, are used to distinguish one record from another in a database table.",
  },
  {
    id: "csc111-019",
    question: "A database system consists of",
    options: [
      "Hardware only",
      "Software only",
      "Data only",
      "Hardware, software, people, and data",
    ],
    answer: "Hardware, software, people, and data",
    reason:
      "A complete database system involves the physical machines, the DBMS software, the users, and the stored data.",
  },
  {
    id: "csc111-020",
    question: "DBMS software helps in",
    options: [
      "Playing media",
      "Data management",
      "Web browsing",
      "File compression",
    ],
    answer: "Data management",
    reason:
      "The core function of a DBMS is to facilitate the management, storage, and retrieval of data.",
  },
  {
    id: "csc111-021",
    question: "The self-describing nature of DBMS comes from",
    options: ["SQL", "Tables", "Metadata", "Index"],
    answer: "Metadata",
    reason:
      "DBMS includes a data dictionary that contains metadata describing the structure of the database itself.",
  },
  {
    id: "csc111-022",
    question: "Program-data independence means",
    options: [
      "Programs depend on data",
      "Data depends on programs",
      "Programs and data are independent",
      "No programs are used",
    ],
    answer: "Programs and data are independent",
    reason:
      "It allows the structure of the data to be changed without requiring changes to the application programs.",
  },
  {
    id: "csc111-023",
    question: "Data abstraction hides",
    options: ["User interface", "Storage details", "Data values", "Programs"],
    answer: "Storage details",
    reason:
      "Data abstraction provides a simplified view of the data while hiding the complex underlying storage details.",
  },
  {
    id: "csc111-024",
    question: "Multiple views of data allow",
    options: [
      "One user view",
      "Same data for all users",
      "Different user perspectives",
      "No user access",
    ],
    answer: "Different user perspectives",
    reason:
      "A DBMS can provide different users with different views of the same database based on their needs.",
  },
  {
    id: "csc111-025",
    question: "Concurrency control ensures",
    options: [
      "Faster computers",
      "Correct transaction execution",
      "Data duplications",
      "Single users",
    ],
    answer: "Correct transaction execution",
    reason:
      "Concurrency control manages simultaneous access to data to prevent errors and maintain data integrity.",
  },
  {
    id: "csc111-026",
    question: "NTFS is an example of",
    options: ["DBMS", "File system", "Database", "Query language"],
    answer: "File system",
    reason:
      "NTFS (New Technology File System) is a file system used by the Windows operating system.",
  },
  {
    id: "csc111-027",
    question: "SQL is used in",
    options: ["File systems", "DBMS", "Operating systems", "Hardware"],
    answer: "DBMS",
    reason:
      "SQL is the standard language used to interact with and manage relational Database Management Systems.",
  },
  {
    id: "csc111-028",
    question: "DBMS provides ________ security than file system",
    options: ["Less", "Equal", "More", "No"],
    answer: "More",
    reason:
      "DBMS offers sophisticated security mechanisms like user permissions and encryption that file systems lack.",
  },
  {
    id: "csc111-029",
    question: "Data consistency in DBMS is",
    options: ["Low", "Medium", "High", "Absent"],
    answer: "High",
    reason:
      "DBMS enforces constraints and rules to ensure data remains accurate and consistent across the system.",
  },
  {
    id: "csc111-030",
    question: "Crash recovery is supported by",
    options: ["File system", "DBMS", "Compiler", "Editor"],
    answer: "DBMS",
    reason:
      "DBMS includes recovery subsystems to restore data to a consistent state after a system failure or crash.",
  },
  {
    id: "csc111-031",
    question: "Airlines use DBMS mainly for",
    options: ["Music", "Ticket booking", "Gaming", "Chatting"],
    answer: "Ticket booking",
    reason:
      "Airlines rely on DBMS to manage real-time seat availability, flight schedules, and passenger reservations.",
  },
  {
    id: "csc111-032",
    question: "DBMS is used in",
    options: ["Banking", "Education", "Healthcare", "All of the above"],
    answer: "All of the above",
    reason:
      "DBMS is a fundamental tool used across almost every industry for managing data.",
  },
  {
    id: "csc111-033",
    question: "Facebook stores",
    options: ["Small data", "No data", "Large-databases", "Temporary data"],
    answer: "Large-databases",
    reason:
      "Social media platforms like Facebook manage massive amounts of user data using large-scale database systems.",
  },
  {
    id: "csc111-034",
    question: "Wikipedia is an example of",
    options: ["Small database", "Very large database", "File system", "OS"],
    answer: "Very large database",
    reason:
      "Wikipedia maintains a vast repository of information that requires a large-scale database for management.",
  },
  {
    id: "csc111-035",
    question: "E-commerce websites depend heavily on",
    options: ["Hardware", "DBMS", "Compiler", "Browser"],
    answer: "DBMS",
    reason:
      "E-commerce platforms use DBMS to manage products, customer information, orders, and inventory.",
  },
  {
    id: "csc111-036",
    question: "Naive users",
    options: [
      "Write SQL",
      "Design websites",
      "Use applications without DBMS knowledge",
      "Maintain servers",
    ],
    answer: "Use applications without DBMS knowledge",
    reason:
      "Naive users interact with the database through simplified applications without knowing how the DBMS works.",
  },
  {
    id: "csc111-037",
    question: "Railway ticket users are",
    options: [
      "Sophisticated users",
      "Naive users",
      "Database designers",
      "DBA",
    ],
    answer: "Naive users",
    reason:
      "People booking tickets are considered naive users because they use a pre-built interface to interact with the database.",
  },
  {
    id: "csc111-038",
    question: "System analysts",
    options: [
      "Write code",
      "Design hardware",
      "Analyse user requirements",
      "Backup databases",
    ],
    answer: "Analyse user requirements",
    reason:
      "System analysts determine the needs of the users and how the database system should meet those needs.",
  },
  {
    id: "csc111-039",
    question: "Sophisticated users interact with DBMS using",
    options: ["Hardware", "SQL queries", "File systems", "Backup tools"],
    answer: "SQL queries",
    reason:
      "Sophisticated users, such as analysts or engineers, write their own queries to manipulate data.",
  },
  {
    id: "csc111-040",
    question: "Database designers design",
    options: [
      "Queries only",
      "Tables and relationships",
      "Hardware",
      "Operating systems",
    ],
    answer: "Tables and relationships",
    reason:
      "Database designers are responsible for defining the structure, tables, and constraints of the database.",
  },
  {
    id: "csc111-041",
    question: "DBA control ________ levels of database",
    options: ["One", "Two", "Three", "Four"],
    answer: "Three",
    reason:
      "The Database Administrator (DBA) manages the physical, logical, and view levels of the database.",
  },
  {
    id: "csc111-042",
    question: "DBA provides",
    options: ["Security", "Backup", "Recovery", "All of the above"],
    answer: "All of the above",
    reason:
      "The DBA is responsible for maintaining the security, integrity, and availability of the database.",
  },
  {
    id: "csc111-043",
    question: "DBA account is also called",
    options: ["Guest account", "Normal user", "Superuser account", "Temporary"],
    answer: "Superuser account",
    reason:
      "The DBA has administrative privileges, making it a superuser account within the system.",
  },
  {
    id: "csc111-044",
    question: "Repairing database damage is the duty of",
    options: ["End user", "Programmer", "DBA", "Analyst"],
    answer: "DBA",
    reason:
      "The Database Administrator is responsible for restoring and repairing the database after corruption or failure.",
  },
  {
    id: "csc111-045",
    question: "Creating user accounts is done by",
    options: ["Naive users", "DBA", "Designers", "Casual users"],
    answer: "DBA",
    reason:
      "Granting access and creating accounts is a core administrative task performed by the DBA.",
  },
  {
    id: "csc111-046",
    question: "1-tier architecture has",
    options: [
      "Client only",
      "Server only",
      "Client, server, database on same machine",
      "Separate machines",
    ],
    answer: "Client, server, database on same machine",
    reason:
      "In a 1-tier architecture, the user interface and the database reside on the same computer.",
  },
  {
    id: "csc111-047",
    question: "1-tier architecture is mostly used for ________ purposes",
    options: ["Large web apps", "Learning", "Banking", "Telecom"],
    answer: "Learning",
    reason:
      "Because of its simplicity, 1-tier architecture is primarily used for local development and learning.",
  },
  {
    id: "csc111-048",
    question: "2-tier architecture follows",
    options: ["Peer-to-peer", "Client-server", "Centralized", "Distributed"],
    answer: "Client-server",
    reason:
      "2-tier architecture consists of a client layer and a server layer that communicate directly.",
  },
  {
    id: "csc111-049",
    question: "ODBC and JDBC are used in",
    options: ["1-tier", "2-tier", "3-tier", "File system"],
    answer: "2-tier",
    reason:
      "ODBC and JDBC are application program interfaces used to connect clients to database servers in a 2-tier setup.",
  },
  {
    id: "csc111-050",
    question: "3-tier architecture includes ________ layers",
    options: ["Two", "Three", "Four", "Five"],
    answer: "Three",
    reason:
      "It consists of the presentation (client) layer, the application (middle) layer, and the database (data) layer.",
  },
  {
    id: "csc111-051",
    question: "The middle layer in 3-tier architecture is called",
    options: ["Client", "Database", "Application server", "Storage"],
    answer: "Application server",
    reason:
      "The middle tier acts as an intermediary that processes business logic between the client and the database.",
  },
  {
    id: "csc111-052",
    question: "3-tier architecture improves",
    options: ["Data loss", "Security", "Redundancy", "Inconsistency"],
    answer: "Security",
    reason:
      "It improves security by preventing direct contact between the client and the data tier.",
  },
  {
    id: "csc111-053",
    question: "Direct client-server interaction is avoided in",
    options: ["1-tier", "2-tier", "3-tier", "File system"],
    answer: "3-tier",
    reason:
      "In 3-tier, the application server stands between the client and the database, preventing direct access.",
  },
  {
    id: "csc111-054",
    question: "3-tier architecture is used in",
    options: [
      "Small projects",
      "Large web applications",
      "File storage",
      "Desktop apps",
    ],
    answer: "Large web applications",
    reason:
      "3-tier architecture is scalable and secure, making it ideal for complex, large-scale web systems.",
  },
  {
    id: "csc111-055",
    question: "A disadvantage of 3-tier architecture is",
    options: [
      "Low security",
      "High redundancy",
      "Complexity",
      "No scalability",
    ],
    answer: "Complexity",
    reason:
      "Managing three separate layers with different technologies increases the overall system complexity.",
  },
  {
    id: "csc111-056",
    question: "Data modeling shows",
    options: [
      "Hardware configuration",
      "Data relationships",
      "Software bugs",
      "Network speed",
    ],
    answer: "Data relationships",
    reason:
      "Data modeling is the process of creating a visual representation of the data and its connections.",
  },
  {
    id: "csc111-057",
    question: "The relational model represents data in",
    options: ["Files", "Objects", "Tables", "Trees"],
    answer: "Tables",
    reason:
      "In a relational model, data is organized into rows and columns within tables (relations).",
  },
  {
    id: "csc111-058",
    question: "Relational model was proposed by",
    options: ["Peter Chen", "Edgar F. Codd", "Bill Gates", "James Gosling"],
    answer: "Edgar F. Codd",
    reason:
      "E.F. Codd, an IBM researcher, proposed the relational model in 1970.",
  },
  {
    id: "csc111-059",
    question: "ER model was designed by",
    options: ["Codd", "Chen", "Oracle", "IBM"],
    answer: "Chen",
    reason: "Peter Chen introduced the Entity-Relationship (ER) model in 1976.",
  },
  {
    id: "csc111-060",
    question: "An entity is a",
    options: ["Program", "Data object", "Query", "File"],
    answer: "Data object",
    reason:
      "An entity represents a real-world object or concept that can be uniquely identified.",
  },
  {
    id: "csc111-061",
    question: "Attributes describe",
    options: ["Relationships", "Entities", "Tables", "File"],
    answer: "Entities",
    reason:
      "Attributes are characteristics or properties that describe an entity.",
  },
  {
    id: "csc111-062",
    question: "Object-based model combines",
    options: [
      "File and DBMS",
      "ER and relational models",
      "Hardware and software",
      "SQL and XML",
    ],
    answer: "ER and relational models",
    reason:
      "Object-based models extend the relational model with features found in ER modeling and object-oriented programming.",
  },
  {
    id: "csc111-063",
    question: "XML is used in",
    options: ["Relational", "ER", "Object-based", "Semi-structured"],
    answer: "Semi-structured",
    reason:
      "XML is a standard format for representing semi-structured data where labels provide context for the data.",
  },
  {
    id: "csc111-064",
    question: "Semi-structured data allows",
    options: [
      "Fixed attributes",
      "No attributes",
      "Different attributes for same data type",
      "Only numeric data",
    ],
    answer: "Different attributes for same data type",
    reason:
      "Semi-structured models allow for flexible schemas where individual items can have different sets of attributes.",
  },
  {
    id: "csc111-065",
    question: "Data modeling reduces",
    options: ["Errors", "Storage", "Users", "Hardware"],
    answer: "Errors",
    reason:
      "Effective data modeling helps identify requirements clearly, reducing design errors in the database.",
  },
  {
    id: "csc111-066",
    question: "Database schema represents",
    options: [
      "Physical storage only",
      "Logical structure",
      "Data values",
      "Backup files",
    ],
    answer: "Logical structure",
    reason:
      "The schema is the overall design or blueprint that defines the structure of the database.",
  },
  {
    id: "csc111-067",
    question: "Schema is designed by",
    options: ["End users", "Database designers", "Naive users", "Clerks"],
    answer: "Database designers",
    reason:
      "Designers are responsible for creating the logical and physical schema during the design phase.",
  },
  {
    id: "csc111-068",
    question: "Physical schema defines",
    options: ["Tables", "Views", "Storage details", "Constraints"],
    answer: "Storage details",
    reason:
      "The physical schema describes how the data is actually stored on disks and hardware.",
  },
  {
    id: "csc111-069",
    question: "Logical schema defines",
    options: ["Disk location", "Hardware", "Tables and constraints", "Files"],
    answer: "Tables and constraints",
    reason:
      "The logical schema defines the structure of the data (tables, keys, relationships) as seen by the programmer.",
  },
  {
    id: "csc111-070",
    question: "A database instance is",
    options: ["Permanent", "Static", "Snapshot at a given time", "Schema"],
    answer: "Snapshot at a given time",
    reason:
      "An instance is the actual collection of information stored in the database at a specific moment.",
  },
  {
    id: "csc111-071",
    question: "Data independence means",
    options: [
      "Data is deleted",
      "Data is hidden",
      "Changes without affecting other levels",
      "No data",
    ],
    answer: "Changes without affecting other levels",
    reason:
      "Data independence allows one level of the database schema to be modified without requiring changes to other levels.",
  },
  {
    id: "csc111-072",
    question: "Logical data independence deals with",
    options: ["Storage devices", "Table structure", "Hardware", "Disk blocks"],
    answer: "Table structure",
    reason:
      "Logical data independence is the ability to change the logical schema without affecting application programs.",
  },
  {
    id: "csc111-073",
    question: "Physical data independence deals with",
    options: ["Table format", "Schema", "Storage changes", "Queries"],
    answer: "Storage changes",
    reason:
      "Physical data independence allows physical storage changes (like moving to a new disk) without affecting the logical schema.",
  },
  {
    id: "csc111-074",
    question: "Replacing HDD with SSD affects",
    options: ["Logical data", "Schema", "Physical data only", "User"],
    answer: "Physical data only",
    reason:
      "Changing the storage hardware is a physical level change that should not affect the logical structure of the data.",
  },
  {
    id: "csc111-075",
    question: "Metadata helps to",
    options: [
      "Delete data",
      "Locate and retrieve data",
      "Encrypt data",
      "Print data",
    ],
    answer: "Locate and retrieve data",
    reason:
      "By describing the data, metadata makes it possible for the DBMS to find and access information effectively.",
  },
  {
    id: "csc111-076",
    question: "DBMS converts data into",
    options: ["File", "Information", "Tables", "Hardware"],
    answer: "Information",
    reason:
      "The system processes raw input data and outputs meaningful information for the end user.",
  },
  {
    id: "csc111-077",
    question: "A relation in DBMS is",
    options: ["File", "Table", "Program", "Schema"],
    answer: "Table",
    reason:
      "In relational database terminology, the word 'relation' is used to refer to a table.",
  },
  {
    id: "csc111-078",
    question: "Rows in a table are also called",
    options: ["Fields", "Attributes", "Tuples", "Keys"],
    answer: "Tuples",
    reason:
      "A tuple represents a single record or row within a relation/table.",
  },
  {
    id: "csc111-079",
    question: "Columns in a table are",
    options: ["Records", "Fields", "Instances", "Files"],
    answer: "Fields",
    reason:
      "Columns are often called fields or attributes and represent specific properties of the records.",
  },
  {
    id: "csc111-080",
    question: "A primary key must be",
    options: ["Duplicate", "Null", "Unique", "Optional"],
    answer: "Unique",
    reason:
      "A primary key must contain unique values and cannot be null so that it can uniquely identify each row.",
  },
  {
    id: "csc111-081",
    question: "DBMS improves",
    options: ["Redundancy", "Inconsistency", "Data sharing", "Data loss"],
    answer: "Data sharing",
    reason:
      "DBMS allows multiple users and applications to access the same set of data concurrently.",
  },
  {
    id: "csc111-082",
    question: "Backup is used to prevent",
    options: ["Access", "Redundancy", "Data loss", "Query"],
    answer: "Data loss",
    reason:
      "Creating backups ensures that data can be restored if the original files are lost or corrupted.",
  },
  {
    id: "csc111-083",
    question: "Integrity constraints ensure",
    options: ["Wrong data", "Valid data", "No data", "Duplicate data"],
    answer: "Valid data",
    reason:
      "Integrity constraints are rules that prevent invalid data from being entered into the database.",
  },
  {
    id: "csc111-084",
    question: "SQL stands for",
    options: [
      "Simple Query Language",
      "Structured Query Language",
      "System Query Language",
      "Sequential Query Language",
    ],
    answer: "Structured Query Language",
    reason:
      "SQL is the standard language for relational database management and manipulation.",
  },
  {
    id: "csc111-085",
    question: "DBMS reduces",
    options: [
      "Data sharing",
      "Data security",
      "Data redundancy",
      "Data access",
    ],
    answer: "Data redundancy",
    reason:
      "DBMS centralizes data, which helps eliminate the need for storing the same information in multiple places.",
  },
  {
    id: "csc111-086",
    question: "Casual users access database",
    options: ["Frequently", "Occasionally", "Never", "Daily"],
    answer: "Occasionally",
    reason:
      "Casual users interact with the database occasionally but may require different information each time.",
  },
  {
    id: "csc111-087",
    question: "A database with tables, views, and triggers is part of",
    options: ["Hardware", "Logical schema", "Physical schema", "Metadata"],
    answer: "Logical schema",
    reason:
      "The logical schema defines the structure of the database including its tables, views, and relationships.",
  },
  {
    id: "csc111-088",
    question: "DBMS supports ________ transactions",
    options: ["Single-user", "Multi-user", "No-user", "Offline"],
    answer: "Multi-user",
    reason:
      "DBMS is designed to allow many users to perform transactions on the data at the same time.",
  },
  {
    id: "csc111-089",
    question: "The ER model is mainly used for",
    options: ["Programming", "Database design", "Storage", "Backup"],
    answer: "Database design",
    reason:
      "The Entity-Relationship model is a high-level conceptual tool used during the design phase of a database.",
  },
  {
    id: "csc111-090",
    question: "Constraints are used to ensure",
    options: ["Redundancy", "Security", "Integrity", "Speed"],
    answer: "Integrity",
    reason:
      "Integrity constraints ensure the accuracy and reliability of the data stored in the database.",
  },
  {
    id: "csc111-091",
    question: "Indexing improves",
    options: ["Storage", "Query performance", "Redundancy", "Errors"],
    answer: "Query performance",
    reason:
      "Indexes allow the DBMS to find and retrieve specific records much faster than scanning the entire table.",
  },
  {
    id: "csc111-092",
    question: "DBMS is more expensive than",
    options: ["OS", "File system", "Browser", "Editor"],
    answer: "File system",
    reason:
      "DBMS software requires purchase costs, high-end hardware, and specialized staff, making it more costly than simple file storage.",
  },
  {
    id: "csc111-093",
    question: "A database without redundancy is",
    options: ["Normalized", "Isolated", "Corrupted", "Redundant"],
    answer: "Normalized",
    reason:
      "Normalization is the process of organizing data to minimize redundancy and dependency.",
  },
  {
    id: "csc111-094",
    question: "The lowest level of abstraction is",
    options: ["View level", "Logical level", "Physical level", "Schema level"],
    answer: "Physical level",
    reason:
      "The physical level is the lowest level of abstraction as it describes how the data is actually stored.",
  },
  {
    id: "csc111-095",
    question: "The highest level of abstraction is",
    options: ["Physical", "Logical", "View", "Storage"],
    answer: "View",
    reason:
      "The view level is the highest level of abstraction because it only shows the parts of the database relevant to the user.",
  },
  {
    id: "csc111-096",
    question: "DBMS supports data",
    options: ["Loss", "Sharing", "Duplication", "Hiding"],
    answer: "Sharing",
    reason:
      "One of the key benefits of a DBMS is enabling multiple users and departments to share access to the data.",
  },
  {
    id: "csc111-097",
    question: "Tables are also known as",
    options: ["File", "Relations", "Records", "Fields"],
    answer: "Relations",
    reason:
      "In the formal relational model, a table is mathematically referred to as a relation.",
  },
  {
    id: "csc111-098",
    question: "A relationship set connects",
    options: ["Files", "Attributes", "Entities", "Schema"],
    answer: "Entities",
    reason:
      "In an ER model, a relationship describes an association or link between two or more entities.",
  },
  {
    id: "csc111-099",
    question: "Database lifecycle includes",
    options: [
      "Design only",
      "Implementation only",
      "Design, implementation, maintenance",
      "Storage only",
    ],
    answer: "Design, implementation, maintenance",
    reason:
      "The lifecycle encompasses the entire process from initial planning and design to deployment and ongoing updates.",
  },
  {
    id: "csc111-100",
    question:
      "DBMS is essential because programming languages cannot store data",
    options: ["Temporarily", "Securely", "Permanently", "Logically"],
    answer: "Permanently",
    reason:
      "While programming languages use variables for temporary storage, a DBMS provides persistent (permanent) storage on non-volatile memory.",
  },
];
