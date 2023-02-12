import csv
import time
import os

class DB():
    

    def __init__(self):
        self.numRecords = 0;
        self.record = None;
        self.recordSize = 116;
        self.numOverflow = 0;
        self.fileDataPtr = None;
        self.configPtr = None;
        self.configFileName = None;
        self.csvFileName = None;
        self.dbFileName = None;

    #Writing a record to the database
    def writeRecord(self, name, rank, city, state, zip, employees ):
        self.fileDataPtr.write("{:60.60}".format(name));
        self.fileDataPtr.write("{:5.5}".format(rank));
        self.fileDataPtr.write("{:30.30}".format(city));
        self.fileDataPtr.write("{:3.3}".format(state));
        self.fileDataPtr.write("{:7.7}".format(zip));
        self.fileDataPtr.write("{:10.10}".format(employees));
        self.fileDataPtr.write("\n");
        self.fileDataPtr.flush();
    
    #Reading a record based on what what record number is passed in
    def readRecord(self, recordNum):
        name = rank = city = state = zip = employees = None;
        if recordNum >=0 and recordNum < self.numRecords:
            self.fileDataPtr.seek(0,0)
            self.fileDataPtr.seek(recordNum*self.recordSize)
            line= self.fileDataPtr.readline().rstrip('\n')
            flag = True
            if flag:
                name = line[0:60]
                rank = line[60:65]
                city = line[65:95]
                state = line[95:98]
                zip = line[98:105]
                employees = line[105:115];
                self.record = dict({"name":name,"rank":rank,"city":city,"state":state,"zip":zip,"employees":employees})
                print("\nRecord Number: " + str(recordNum) + "\tName: " + name + "\t Rank: " + rank + "\t City: " + city + "\t State: " + state + "\t Zip: " + zip + "\t Employees: " + employees + "\n");
            else:
                print("Record not found.");
        else:
            print("Sorry, record number " + str(recordNum) + " does not exist.");

    #Creating the database and necessary files
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
        
        # Call the writeRecord method to write the data to the database
       with open(self.dbFileName, "w") as db:
            self.fileDataPtr = db;
            for dict in data_list:
                self.writeRecord(dict["name"], dict["rank"], dict["city"], dict["state"], dict["zip"], dict["employees"]);
       self.fileDataPtr= None;

    #Opening the database and setting ptrs
    def openDB(self, filename):
        if (self.isOpen()):
            "Please close the current database before opening a new one."
            return False;

        elif (not os.path.isfile(filename + ".data")):
            print("The database file does not exist.");
            return False;
        else:
            self.dbFileName = filename + ".data";
            self.fileDataPtr = open(self.dbFileName, "r+");
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
            print("Database closed successfully.");
        else:
            print("There is no database to close.");
    

    #Write a binary search method to search for a record in the database using the primary key
    def binarySearch(self, key):
        low = 0;
        high = self.numRecords - 1;
        while (low <= high):
            mid = (low + high) // 2;
            self.fileDataPtr.seek(mid * self.recordSize);
            name = self.fileDataPtr.read(60).strip();
            if (key == name):
                return mid;
            elif (key < name):
                high = mid - 1;
            else:
                low = mid + 1;
        return -1;

    # Write a method to display a record from the database using the primary key
    def findRecord(self, key):
        if (self.isOpen()):
            index = self.binarySearch(key);
            if (index != -1):
                self.fileDataPtr.seek(index * self.recordSize);
                name = self.fileDataPtr.read(60).strip();
                rank = self.fileDataPtr.read(5).strip();
                city = self.fileDataPtr.read(30).strip();
                state = self.fileDataPtr.read(3).strip();
                zip = self.fileDataPtr.read(7).strip();
                employees = self.fileDataPtr.read(10).strip();
                if (rank == "-1" or city == "-1" or state == "-1" or zip == "-1" or employees == "-1"):
                    return "Record not found."
                else:
                    print("Record Number: " + str(index) + "\tName: " + name + "\t Rank: " + rank + "\t City: " + city + "\t State: " + state + "\t Zip: " + zip + "\t Employees: " + employees + "\n");
            else:
                return "Record not found.";
        else:
            return "There is no database open.";

    def updateRecord(self, name, rank, city, state, zip, employees):
        if (self.isOpen()):
            index = self.binarySearch(name);
            if index == -1:
                print("Couldn't find record. Please try again.\n");
                return False;
            else:
                self.fileDataPtr.seek(index * self.recordSize);
                time.sleep(.2);                
                self.writeRecord(name, rank, city, state, zip, employees);
                return True;

    def deleteRecord(self, name):
        if (self.isOpen()):
            index = self.binarySearch(name); 
            if index == -1:
                print("Sorry, couldn't find that company name");
                return False;

            self.fileDataPtr.seek(index * self.recordSize);
            self.writeRecord(name, "-1", "-1", "-1","-1","-1");
            return True;

        else:
            print("There is no database open.")



    def main(self):
        choice =  None;
        while (choice != "9"):
            print("\n\nHello, please select an option from the menu below:");
            print("1. Create a new database from a csv file");
            print("2. Open an existing database");
            print("3. Close the current database");
            print("4. Display a record from the database using company name");
            print("5. Get a record from the database using the record number")
            print("6. Update a record in the database using primary key");
            print("7. Create Report");
            print("8. Delete a record from the database using primary key");
            print("9. Exit the program");

            choice = input("Enter your choice: ");
            if choice == "1":
                print("\n");
                filename = input("Enter the name of the csv file (not including .csv): ");
                self.createDB(filename);
            elif choice == "2":
                print("\n");
                filename = input("Enter the name of the database file: ");
                self.openDB(filename);
            elif choice == "3":
                print("\n");
                self.closeDB();
            elif choice == "4":
                print("\n")
                key = input("Enter the name of the company: ");
                print("\n")
                print(self.findRecord(key));
            elif choice == "5":
                print("\n")
                recordNum = int(input("Enter the record number: "));
                self.readRecord(recordNum);
            elif choice == "6":
                print("\n");
                recordToUpdate = input("Please enter the companies name that you want to update: ");
                rank = input("Please enter the new rank of the company: ");
                city = input("Please enter the new city for the company: ");
                state = input("Please enter the new state for the company: ");
                zip = input("Please enter the new zip code for the company: ");
                employees = input("Please enter the new number of employees for the company: ");

                if(self.updateRecord(recordToUpdate, rank, city,state, zip, employees)):
                    print("Record has been updated");
            elif choice == "8":
                name = input("Enter the name of the record you want to delete: ");
                print("\n");
                if(self.deleteRecord(name)):
                    print("Record has been deleted");

def run():
    db = DB();
    db.main();
if __name__ == "__main__":
    run();
