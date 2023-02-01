import csv
import os

class DB():
    recordSize = 86;

    def __init__(self):
        self.numRecords = 0;
        self.numOverflow = 0;
        self.fileDataPtr = None;
        self.configPtr = None;
        self.configFileName = None;
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
       self.configFileName = filename + ".config";

       #Read the csv file and write into data files
       with open(self.csvFileName, "r") as csvFile:
          data_list = list(csv.DictReader(csvFile, fieldnames=('name', 'rank', 'city', 'state', 'zip', 'employees')));
          self.numRecords = len(data_list);

       with open(self.configFileName, "w") as configFile:
            configFile.write("numRecords = " + str(self.numRecords));
            self.configPtr = configFile;
        
        
        # Call the writeRecord method to write the data to the database
       with open(self.dbFileName, "w") as db:
            self.fileDataPtr = db;
            for dict in data_list:
                self.writeRecord(dict["name"], dict["rank"], dict["city"], dict["state"], dict["zip"], dict["employees"]);
            self.fileDataPtr = None;

    def openDB(self, filename):
        if (self.isOpen()):
            "Please close the current database before opening a new one."
            return False;

        elif (not os.path.isfile(filename + ".data")):
            print("The database file does not exist.");
            return False;
        else:
            self.dbFileName = filename + ".data";
            self.fileDataPtr = open(self.dbFileName, "r"); 
            self.csvFileName = filename + ".csv";
            self.configFileName = filename + ".config";
            self.configPtr = open(self.configFileName, "r");
            self.numRecords = int(self.configPtr.readline().split(" = ")[1]);
            return True;
    
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
    

    #Write a binary search method to search for a record in the database using the primary key
    def binarySearch(self, key):
        low = 0;
        high = self.numRecords - 1;
        while (low <= high):
            mid = (low + high) // 2;
            self.fileDataPtr.seek(mid * self.recordSize);
            name = self.fileDataPtr.read(30).strip();
            if (key == name):
                return mid;
            elif (key < name):
                high = mid - 1;
            else:
                low = mid + 1;
        return -1;

    # Write a method to display a record from the database using the primary key
    def displayRecord(self, key):
        try:
            if (self.isOpen()):
                index = self.binarySearch(key);
                if (index != -1):
                    self.fileDataPtr.seek(index * self.recordSize);
                    name = self.fileDataPtr.read(30).strip();
                    rank = self.fileDataPtr.read(5).strip();
                    city = self.fileDataPtr.read(30).strip();
                    state = self.fileDataPtr.read(3).strip();
                    zip = self.fileDataPtr.read(7).strip();
                    employees = self.fileDataPtr.read(10).strip();
                    return "Name: " + name + "\t Rank: " + rank + "\t City: " + city + "\t State: " + state + "\t Zip: " + zip + "\t Employees: " + employees + "\n";
                else:
                    return "Record not found.";
            else:
                return "There is no database open.";
        except:
            return "An error occurred while trying to display the record. Please make sure the correct database is open and try again.";


    def main(self):
        choice =  None;
        while (choice != "8"):
            print("\n\nHello, please select an option from the menu below:");
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
            elif choice == "4":
                key = input("Enter the name of the company: ");
                print("\n")
                print(self.displayRecord(key));

def run():
    db = DB();
    db.main();
if __name__ == "__main__":
    run();
