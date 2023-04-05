#!/bin/bash
sftp lccrider@turing.uark.edu <<EOF
put python_db_example.py
put runpython.sh
put hw3_soln.sh
put SID.txt
exit
EOF
ssh lccrider@turing.uark.edu <<EOF
echo "Starting typescript"
typescript -f session.log
chmod +x runpython.sh
chmod +x hw3_soln.sh
./runpython.sh
1
csce
1
biol
meeg
2
1
1
csce
2
2
1
csce
1
1
eleg
2
2
2
4
2
2
2
1
3
2004
csce
123456
239
JBHT
mwf
8:35:00
9:25:00
2023-08-01
2023-09-01
36
36
2
1
1
csce
2
2
1
csce
4
csce
3193
2930
MAX_ENROLLMENT
140
2
2
1
csce
4
csce
2114
1449
PROF_ID
222222
2
1
1
csce
5
6
echo "Stopping typescript"
exit
EOF
