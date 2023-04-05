#!/bin/bash
sftp lccrider@turing.uark.edu <<EOF
put python_db_example.py
put runpython.sh
# put SID.txt
exit
EOF
ssh lccrider@turing.uark.edu <<EOF
chmod +x runpython.sh
./runpython.sh
1
csce
2
1
1
csce
3
2004
CSCE
123456
216
JBHT
MWF
10:45:00
11:35:00
2023-08-01
2023-07-12
100
0
6
EOF