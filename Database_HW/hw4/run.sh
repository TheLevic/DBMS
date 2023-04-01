#!/bin/bash
sftp lccrider@turing.uark.edu <<EOF
put python_db_example.py
put runpython.sh
exit
EOF
ssh lccrider@turing.uark.edu <<EOF
chmod +x runpython.sh
./runpython.sh
1
MEEG
6
EOF