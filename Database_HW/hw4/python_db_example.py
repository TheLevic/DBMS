#   DO:  more $HOME/.my.cnf to see your MySQL username and  password
#  CHANGE:  MYUSERNAME and MYMYSQLPASSWORD in the test section of
#  this program to your username and mysql password
#  RUN: ./runpython.sh

import mysql.connector
from tabulate import tabulate
import SIDnumber


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


##### Test #######

# print(' ')
# print('Testing select: ')
# print('=======================================')
# executeSelect('SELECT * FROM DEPT')

# print(' ')
# print('\nTesting insert of dept MATH:')
# print('=======================================')
# insert("DEPT", "'MATH', 'Mathematics', 309, 'SCEN'")
# executeSelect('SELECT * FROM DEPT WHERE DEPT_CODE = "MATH";')

# print(' ')
# print('\nTesting delete of dept MATH:')
# print('=======================================')
# executeUpdate('DELETE FROM DEPT WHERE DEPT_CODE = "MATH";')
# executeSelect('SELECT * FROM DEPT WHERE DEPT_CODE = "MATH";')

# print(' ')
# print('\nTesting update of professor name :')
# print('=======================================')
# executeSelect("SELECT * FROM PROFESSOR WHERE PROF_ID = 123456;")
# executeUpdate("Update PROFESSOR set PROF_NAME = 'Susan Dyer' WHERE PROF_ID = 123456;")
# executeSelect("SELECT * FROM PROFESSOR WHERE PROF_ID = 123456;")


mysql_username = 'lccrider'  # please change to your username
mysql_password = 'rao8eeMu'  # please change to your MySQL password
try:
    open_database('localhost', mysql_username, mysql_password, mysql_username)  # open database
    print("Database opened successfully\n\n")
except Exception as e:
    print("Error: " + e)
    exit(1)

choice = 0

while choice != "6":
    print("Please select on of the following options:")
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
        selectedDept = input("Enter the department code for the professors you want to show: ")
        executeSelect("SELECT * FROM PROFESSOR WHERE DEPT_CODE = '" + selectedDept + "';")
    elif choice == "2":
        print("Please select on of the following options:")
        print("1. List all Classes")
        print("2. List all open classes")
        choice = input("Enter your choice: ")
        print("Please select on of the following options:")
        print("1. List Classes by department")
        print("2. List Classes by level")
        innerchoice = input("Enter your choice: ")
        if innerchoice == "1":
            thirdchoice = input("Please input Department Code:")
        if innerchoice == "2":
            thirdchoice = input("Please input Level of class:")
       
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
        # Ask user what course they want to add a section for
        selectedCourse = input("Please enter the course number that you want to add a section for: ")
        selectedSID = SIDnumber.SID
        SIDnumber.increment()
        selectedDept = input("Please enter the department code that you want to add a section for: ")
        selectedProf = input("Please enter the professor ID that you want to add a section for: ")
        #Getting all input for adding to section table
        selectedRoom = input("Please enter the room number that the section will be held in: ")
        selectedBuilding = input("Please enter the building that the section will be held in: ")
        selectedDays = input("Please enter the days that the section will be held on: ")
        selectedStartTime = input("Please enter the start time of the section: ")
        selectedEndTime = input("Please enter the end time of the section: ")
        selectedStartDay = input("Please enter the start day of the section: ")
        selectedEndDay = input("Please select the end date of the section: ")
        selectedMaxEnrollment = input("Please enter the maximum enrollment of the section: ")
        selectedCurrentEnrollment = input("Please enter the current enrollment of the section: ")

        # Check that all input variables are not null
        if selectedCourse != "" and selectedDept != "" and selectedProf != "" and selectedRoom != "" and selectedBuilding != "" and selectedDays != "" and selectedStartTime != "" and selectedEndTime != "" and selectedStartDay != "" and selectedEndDay != "" and selectedMaxEnrollment != "" and selectedCurrentEnrollment != "":
            # Insert new section into section table
            insert("SECTION", "'"+selectedSID+"', '"+selectedCourse+"', '"+selectedDept+"', '"+selectedProf+"', '"+selectedRoom+"', '"+selectedBuilding+"', '"+selectedDays+"', '"+selectedStartTime+"', '"+selectedEndTime+"', '"+selectedStartDay+"', '"+selectedEndDay+"', '"+selectedMaxEnrollment+"', '"+selectedCurrentEnrollment+"'")
            # Display all sections
            executeSelect("SELECT * FROM SECTION;") 

close_db()  # close database

