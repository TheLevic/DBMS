import pandas as pd

class DB():
    recordSize = 82;
    def __init__(self):
        self.numRecords = 0;
        self.numOverflow = 0;
        self.fileDataPtr = None;
        self.configPtr = None;

    #Writing a record to the database
    def writeRecord(self, name, rank, city, state, zip, employees):
        self.fileDataPtr.write("{:30.30}".format(name));
        self.fileDataPtr.write("{:5.5}".format(rank));
        self.fileDataPtr.write("{:30.30}".format(city));
        self.fileDataPtr.write("{:2.2}".format(state));
        self.fileDataPtr.write("{:5.5}".format(zip));
        self.fileDataPtr.write("{:10.10}".format(employees));
        self.fileDataPtr.write("\n");

    def createDB(self):
        

