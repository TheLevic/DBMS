import csv
import os.path

class DB:

#    recordSize = ? 

    #default constructor
    def __init__(self):
        self.filestream = None;
        self.numRecords = 0;
        self.dataFilePtr = None;
        self.numOverflow = None;

    #Open method
    def open(self, filepath):
        try:
            db = open(filepath + ".csv")
            self.numRecords = len(db.readlines());
            self.dataFilePtr = db;
            self.numOverflow = 0;

        except:
            print("Something went wrong while opening, please try again.");

    #close the database
    def CloseDB(self):
        try:
            self.filestream = None;
            self.numRecords = 0;
            self.dataFilePtr.close();
            self.dataFilePtr = None;
            self.numOverflow = None;
        except:
            print("Something went wrong closing the database");

    def isOpen(self):
        if (self.dataFilePtr):
            return True;
        else:
            return False;

    #create database
    def createDB(self,filename):
        #Generate file names
        csv_filename = filename + ".csv"
        text_filename = filename + ".data"

        # Read the CSV file and write into data files
        with open(csv_filename, "r") as csv_file:
            data_list = list(csv.DictReader(csv_file,fieldnames=('ID','experience','marriage','wages','industry')))

		# Formatting files with spaces so each field is fixed length, i.e. ID field has a fixed length of 10
        def writeDB(filestream, dict):
            filestream.write("{:10.10}".format(dict["ID"]))
            filestream.write("{:5.5}".format(dict["experience"]))
            filestream.write("{:5.5}".format(dict["marriage"]))
            filestream.write("{:20.20}".format(dict["wages"]))
            filestream.write("{:30.30}".format(dict["industry"]))
            filestream.write("\n")
        
        with open(text_filename,"w") as outfile:
            for dict in data_list:
                writeDB(outfile,dict)

    #read the database
    def readDB(self, filename, DBsize, rec_size):
        self.filestream = filename + ".data"
        self.record_size = DBsize
        self.rec_size = rec_size
        
        if not os.path.isfile(self.filestream):
            print(str(self.filestream)+" not found")
        else:
            self.text_filename = open(self.filestream, 'r+')

    #read record method
    def getRecord(self, recordNum):

        self.flag = False
        id = experience = marriage = wage = industry = "None"

        if recordNum >=0 and recordNum < self.record_size:
            self.text_filename.seek(0,0)
            self.text_filename.seek(recordNum*self.rec_size)
            line= self.text_filename.readline().rstrip('\n')
            self.flag = True
        
        if self.flag:
            id = line[0:10]
            experience = line[10:15]
            marriage = line[15:20]
            wage = line[20:40]
            industry = line[40:70]

        self.record = dict({"ID":id,"experience":experience,"marriage":marriage,"wages":wage,"industry":industry})

    #Binary Search by record id
    def binarySearch (self, input_ID):
        
        low = 0
        high = self.record_size - 1
        self.found = False

        while high >= low:

            self.middle = (low+high)//2
            self.getRecord(self.middle)
            # print(self.record)
            mid_id = self.record["ID"]
            
            if int(mid_id) == int(input_ID):
                self.found = True
                break
            elif int(mid_id) > int(input_ID):
                high = self.middle - 1
            elif int(mid_id) < int(input_ID):
                low = self.middle + 1


    