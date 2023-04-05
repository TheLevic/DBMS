#   DO:  more $HOME/.my.cnf to see your MySQL username and  password
#  CHANGE:  MYUSERNAME and MYMYSQLPASSWORD in the test section of
#  this program to your username and mysql password
#  RUN: ./runpython.sh

import mysql.connector
from tabulate import tabulate


def open_database(hostname, user_name, mysql_pw, database_name):
    global conn
    conn = mysql.connector.connect(host=hostname,
                                   user=user_name,
                                   password=mysql_pw,
                                   database=database_name
                                   )
    global cursor
    cursor = conn.cursor()


def printFormat(result):
    header = []
    for cd in cursor.description:  # get headers
        header.append(cd[0])
    print('')
    print('Query Result:')
    print('')
    print(tabulate(result, headers=header))  # print results in table format

# select and display query


def executeSelect(query):
    cursor.execute(query)
    printFormat(cursor.fetchall())


def insert(table, values):
    query = "INSERT into " + table + " values (" + values + ")" + ';'
    cursor.execute(query)
    conn.commit()


def executeUpdate(query):  # use this function for delete and update
    cursor.execute(query)
    conn.commit()


def close_db():  # use this function to close db
    cursor.close()
    conn.close()

def getUniqueSID():
    with open('SID.txt', 'r') as f:
        sid = f.readline()
        with open('SID.txt', 'w') as j:
            j.write(str(int(sid) + 1))
        return sid



# mysql_username = 'lccrider'  # please change to your username
# mysql_password = 'rao8eeMu'  # please change to your MySQL password
mysql_username = 'srs043'  # please change to your username
mysql_password = 'oow8Nu4o'  # please change to your MySQL password
try:
    open_database('localhost', mysql_username, mysql_password, mysql_username)  # open database
    print("Database opened successfully\n\n")
except Exception as e:
    print("Error: " + e)
    exit(1)

choice = 0

while choice != "6":
    print("Please select one of the following options:")
    print("1. Find Professors")
    print("2. Find Sections")
    print("3. Add Section")
    print("4. Update Section")
    print("5. Report Enrollment")
    print("6. Quit")
    choice = input("Enter your choice: ")
    
    if choice == "1":
        # Select all sections in the spection table
        executeSelect("SELECT * FROM DEPT;")
        while True:
            selectedDept = input("Enter the department code for the professors you want to show: ")
            if (selectedDept == "CSCE" or "csce" or selectedDept == "ELEG" or "eleg" or selectedDept == "MEEG" or "meeg"):
                break
            else:
                print("Invalid choice, please try again")
        
        executeSelect("SELECT * FROM PROFESSOR WHERE DEPT_CODE = '" + selectedDept + "';")
    elif choice == "2":
        print("Please select on of the following options:")
        print("1. List all Classes")
        print("2. List all open classes")

        while True:
            choice = input("Enter your choice: ")
            if (choice == "1" or choice == "2"):
                break
            else:
                print("Invalid choice, please try again")
       
       
        print("Please select on of the following options:")
        print("1. List Classes by department")
        print("2. List Classes by level")

        while True:
            innerchoice = input("Enter your choice: ")
            if (innerchoice == "1" or innerchoice == "2"):
                break
            else:
                print("Invalid choice, please try again")



        if innerchoice == "1":
            while True:
                thirdchoice = input("Please input Department Code:")
                if (thirdchoice == "CSCE" or "csce" or thirdchoice == "ELEG" or "eleg" or thirdchoice == "MEEG" or "meeg"):
                    break
                else:
                    print("Invalid choice, please try again")
        if innerchoice == "2":
            while True:
                thirdchoice = input("Please input Level of class (i.e: 1, 2, 3, 4, 5, not 1000, 2000, etc..): ")
                if (thirdchoice == "1" or thirdchoice == "2" or thirdchoice == "3" or thirdchoice == "4" or thirdchoice == "5"):
                    break
                else:
                    print("Invalid choice, please try again")

       
        # Listing classes regardless of whether they are open
        if choice == "1":
            # listing by department
            if innerchoice == "1":
                executeSelect("SELECT DEPT_CODE, COURSE_NUM, BUILDING, ROOM_NUM, DAYS, START_TIME, END_TIME, (MAX_ENROLLMENT - CURRENT_ENROLLMENT) AS seats_available FROM SECTION WHERE DEPT_CODE ='"+thirdchoice +"';")
            if innerchoice == "2":
                executeSelect("SELECT DEPT_CODE, COURSE_NUM, BUILDING, ROOM_NUM, DAYS, START_TIME, END_TIME, (MAX_ENROLLMENT - CURRENT_ENROLLMENT) AS seats_available FROM SECTION WHERE COURSE_NUM LIKE '"+thirdchoice +"%';")
        # Listing all open classes
        if choice == "2":
            if innerchoice == "1":
                executeSelect("SELECT DEPT_CODE, COURSE_NUM, BUILDING, ROOM_NUM, DAYS, START_TIME, END_TIME, (MAX_ENROLLMENT - CURRENT_ENROLLMENT) AS seats_available FROM SECTION WHERE DEPT_CODE ='"+thirdchoice +"' AND MAX_ENROLLMENT>CURRENT_ENROLLMENT;")
            if innerchoice == "2":
                executeSelect("SELECT DEPT_CODE, COURSE_NUM, BUILDING, ROOM_NUM, DAYS, START_TIME, END_TIME, (MAX_ENROLLMENT - CURRENT_ENROLLMENT) AS seats_available FROM SECTION WHERE COURSE_NUM LIKE '"+thirdchoice +"%' AND MAX_ENROLLMENT>CURRENT_ENROLLMENT;")


    elif choice == "3":
        # Display all courses
        executeSelect("SELECT * FROM COURSE;")

        selectedCourse = input("Please enter the course number that you want to add a section for: ")
        try:
            selectedCourse = int(selectedCourse)
            selectedCourse = str(selectedCourse)
        except:
            print("Sorry, invalid input. Please try again.")
        

        selectedSID = getUniqueSID()

        selectedDept = input("Please enter the department code that you want to add a section for: ")
        try:
            selectedDept = int(selectedDept)
            slectedDept = str(selectedDept)
        except:
            print("Sorry, invalid input. Please try again.")




        selectedProf = input("Please enter the professor ID that you want to add a section for: ")
        try:
            selectedProf = int(selectedProf)
            selectedProf = str(selectedProf)
        except:
            print("Sorry, invalid input. Please try again.")
       
        selectedRoom = input("Please enter the room number that the section will be held in: ")
        try:
            selectedRoom = int(selectedRoom)
            selectedRoom = str(selectedRoom)
        except:
            print("Sorry, invalid input. Please try again.")


        while True:
            selectedBuilding = input("Please enter the building that the section will be held in: ")
            if (selectedBuilding == "JBHT" or selectedBuilding == "MEEG" or selectedBuilding == "BELL"):
               break 
            else:
                print("Sorry, invalid input. Please try again.")
            

        while True:
            selectedDays = input("Please enter the days that the section will be held on: ")
            if (selectedDays == "MWF" or selectedDays == "TR"):
                break
            else:
                print("Sorry, invalid input. Please try again.")


        selectedStartTime = input("Please enter the start time of the section: ")

        selectedEndTime = input("Please enter the end time of the section: ")

        selectedStartDay = input("Please enter the start day of the section: ")

        selectedEndDay = input("Please select the end date of the section: ")

        selectedMaxEnrollment = input("Please enter the maximum enrollment of the section: ")
        try:
            selectedMaxEnrollment = int(selectedMaxEnrollment)
            selectedMaxEnrollment = str(selectedMaxEnrollment)
        except:
            print("Sorry, invalid input. Please try again.")
        
        selectedCurrentEnrollment = input("Please enter the current enrollment of the section: ")
        try:
            selectedCurrentEnrollment = int(selectedCurrentEnrollment)
            selectedCurrentEnrollment = str(selectedCurrentEnrollment)
        except:
            print("Sorry, invalid input. Please try again.")

        # Check that all input variables are not null
        if selectedCourse != "" and selectedDept != "" and selectedProf != "" and selectedRoom != "" and selectedBuilding != "" and selectedDays != "" and selectedStartTime != "" and selectedEndTime != "" and selectedStartDay != "" and selectedEndDay != "" and selectedMaxEnrollment != "" and selectedCurrentEnrollment != "":
            # Insert new section into section table
            try:

                insert("SECTION", "'" + selectedSID + "', '" + selectedDept + "', '" + selectedCourse + "', '" + selectedProf + "', '" + selectedRoom + "', '" + selectedBuilding + "', '" + selectedDays + "', '" + selectedStartTime + "', '" + selectedEndTime + "', '" + selectedStartDay + "', '" + selectedEndDay + "', '" + selectedMaxEnrollment + "', '" + selectedCurrentEnrollment + "'")            
            except:
                print("Sorry, there was an error. Please try again.")

            # Display all sections
            executeSelect("SELECT * FROM SECTION;") 
        else:
            print("Sorry, you must enter all values. Nothing can be null.")
    
    elif choice == "4":
        #gets the department and course
        selectedDept = input("Please enter the department code of the section you would like to update: ")

        selectedCourse = input("Please enter the course number of the section you would like to update: ")

        #list the courses in this department
        
        executeSelect("SELECT * FROM SECTION WHERE COURSE_NUM = '"+selectedCourse+"' AND DEPT_CODE = '"+selectedDept+"';")
        selectedSID = input("Please enter the SID of the section you would like to update: ")
        selectedChange = input("What attribute would you like to change?: ")
        if selectedChange == "SID":
            print("Sorry, you cannot change the SID as it is the primary key")
        elif selectedChange == "DEPT_CODE" or selectedChange == "COURSE_NUM" or selectedChange == "PROF_ID" or selectedChange == "ROOM_NUM" or selectedChange == "BUILDING" or selectedChange == "DAYS" or selectedChange == "START_TIME" or selectedChange == "END_TIME" or selectedChange == "START_DAY" or selectedChange == "END_DAY" or selectedChange == "MAX_ENROLLMENT" or selectedChange == "CURRENT_ENROLLMENT":
            newValue = input("please input desired new value: ")
            try:
                executeUpdate("UPDATE SECTION SET "+selectedChange+" = '"+newValue+"'WHERE SID = '"+selectedSID+"';")
            except:
                print("there was an error with one of the inputs, please try again")
        else:
            print("sorry, that is an invalid input")
    
    elif choice == "5":
        executeSelect("SELECT SUM(CURRENT_ENROLLMENT), DEPT_CODE FROM SECTION GROUP BY DEPT_CODE ORDER BY SUM(CURRENT_ENROLLMENT);")

close_db()  # close database

