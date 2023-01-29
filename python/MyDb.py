import csv

class DB():
    recordSize = 86;

    def __init__(self):
        self.numRecords = 0;
        self.numOverflow = 0;
        self.fileDataPtr = None;
        self.configPtr = None;
        self.csvFileName = None;
        self.dbFileName = None;

    #Writing a record to the database
    def writeRecord(self, name, rank, city, state, zip, employees):
        self.fileDataPtr.write("{:30.30}".format(name));
        self.fileDataPtr.write("{:5.5}".format(rank));
        self.fileDataPtr.write("{:30.30}".format(city));
        self.fileDataPtr.write("{:3.3}".format(state));
        self.fileDataPtr.write("{:7.7}".format(zip));
        self.fileDataPtr.write("{:10.10}".format(employees));
        self.fileDataPtr.write("\n");

    def createDB(self, filename):
       self.csvFileName = filename + ".csv";
       self.dbFileName = filename + ".data";

       #Read the csv file and write into data files
       with open(self.csvFileName, "r") as csvFile:
          data_list = list(csv.DictReader(csvFile, fieldnames=('name', 'rank', 'city', 'state', 'zip', 'employees')));
          self.numRecords = len(data_list);
        
        # Call the writeRecord method to write the data to the database
       with open(self.dbFileName, "w") as db:
            self.fileDataPtr = db;
            for dict in data_list:
                self.writeRecord(dict["name"], dict["rank"], dict["city"], dict["state"], dict["zip"], dict["employees"]);

    def openDB(self, filename):
        if (self.isOpen()):
            return "Please close the current database before opening a new one."
        else:
            self.dbFileName = filename + ".data";
            self.fileDataPtr = open(self.dbFileName, "r"); 
            return "Database opened successfully."
    
    def isOpen(self):
        if self.fileDataPtr != None:
            return True;
        else:
            return False;

    def closeDB(self):
        if (self.isOpen()):
            self.fileDataPtr.close();
            self.fileDataPtr = None;
            self.numOverflow = 0;
            self.numRecords = 0;
            self.configPtr = None;
            self.csvFileName = None;
            self.dbFileName = None;
            return "Database closed successfully.";
        else:
            return "There is no database to close.";

    def main(self):
        print("Hello, please select an option from the menu below:");
        print("1. Create a new database from a csv file");
        print("2. Open an existing database");
        print("3. Close the current database");
        print("4. Display a record from the database using primary key");
        print("5. Update a record in the database using primary key");
        print("6. Create Report");
        print("7. Delete a record from the database using primary key");
        print("8. Exit the program");

        choice = input("Enter your choice: ");
        if choice == "1":
            filename = input("Enter the name of the csv file (not including .csv): ");
            self.createDB(filename);
        elif choice == "2":
            filename = input("Enter the name of the database file: ");
            self.openDB(filename);
        elif choice == "3":
            self.closeDB();


