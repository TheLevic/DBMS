from Database import DB

filepath = "input"
DBsize = 10
rec_size = 71
# rec_size = 72 if a Windows file with cr lf at ends of the lines

print(input)
sample = DB()
sample.createDB(filepath)
sample.readDB(filepath, DBsize, rec_size)

print("\n------------- Testing getRecord ------------\n")

# Gets record 0
# Then prints the values of the 5 fields to the screen with the name of the
# field and the values read from the record, i.e.,
# id: 00003 experience: 3 married: no wages: 1.344461678 industry:
# Business and Repair Service
sample.getRecord(0)
print("Record 0, ID: "+sample.record["ID"]+"\t experience: "+sample.record["experience"]+"\t marriage: "+sample.record["marriage"]+"\t wages: "+str(sample.record["wages"])+"\t industry: "+sample.record["industry"])

# Gets record 9 (last record)
sample.getRecord(DBsize - 1)
print("Record 9, ID: "+sample.record["ID"]+"\t experience: "+sample.record["experience"]+"\t marriage: "+sample.record["marriage"]+"\t wages: "+str(sample.record["wages"])+"\t industry: "+sample.record["industry"])

print("\n------------- Testing binarySearch ------------\n")
# Find record with id 42 (should not be found)
sample.binarySearch("42")
if sample.found:
    print("ID: "+sample.record["ID"]+"\t experience: "+sample.record["experience"]+"\t marriage: "+sample.record["marriage"]+"\t wages: "+str(sample.record["wages"])+"\t industry: "+sample.record["industry"]+"\tRecord Number:" + str(sample.middle))
else:
    print("42 not found")

# Find record with id 00000 (the first one in the file)
sample.binarySearch("00000")
if sample.found:
    print("ID: "+sample.record["ID"]+"\t experience: "+sample.record["experience"]+"\t marriage: "+sample.record["marriage"]+"\t wages: "+str(sample.record["wages"])+"\t industry: "+sample.record["industry"]+"\tRecord Number:" + str(sample.middle))
else:
    print("00000 not found")
	
# Find record with id 00015 (the last one in the file)
sample.binarySearch("00015")
if sample.found:
    print("ID: "+sample.record["ID"]+"\t experience: "+sample.record["experience"]+"\t marriage: "+sample.record["marriage"]+"\t wages: "+str(sample.record["wages"])+"\t industry: "+sample.record["industry"]+"\tRecord Number:" + str(sample.middle))
else:
    print("00015 not found")

# Find record with id 00006 (somewhere in the middle)
sample.binarySearch("00006")
if sample.found:
    print("ID: "+sample.record["ID"]+"\t experience: "+sample.record["experience"]+"\t marriage: "+sample.record["marriage"]+"\t wages: "+str(sample.record["wages"])+"\t industry: "+sample.record["industry"]+"\tRecord Number:" + str(sample.middle))
else:
    print("00006 not found")

# Close database
sample.CloseDB()
