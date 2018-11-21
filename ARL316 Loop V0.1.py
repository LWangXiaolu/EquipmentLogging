# -*- coding: utf-8 -*-
"""
Created on Tue Jul 18 14:38:56 2017

@author: dwoodcock
"""
#change COM2 to VCOM port number for specific logger
#update Text file names to logger location plus leq or 15minSTATS

#process
# Loop 1 for 15 minutes then run loop2 once - repeats automatically

#updates to finish
#10 second sample to be exactly 10 seconds on 10 second intervals 10, 20, 30, 40, 50, 00
# clear ARL buffer memory cache after 2 weeks

import serial,time, math
from binascii import hexlify

#initial setup
COM = 'COM1'
LEQ_TEXT_FILE_NAME = 'OfficeTest.txt'
STATS_TEXT_FILE_NAME = 'OfficeTest_15minSTATS.txt'

#Setup Text File Headders
with open(LEQ_TEXT_FILE_NAME, 'a') as f:
    f.write('Date' + '\t' + '\t' + 'Time' + '\t' + '\t' + 'Leq' + '\n')
    f.close()

ser = serial.Serial(COM, 19200, timeout=3) #3 secont delay   
ser.flushInput()
ser.flushOutput()
def Loop1():
    while True:
        ser.write(b's') #report SPL "s" #1 SPL and date/time
        time.sleep(0.3)
        SPL = ser.read(2) #read 2 bits
        if SPL ==b'':
            print('Data not received')
            time.sleep(0.7)
        else:
            Lspl=SPL[:1] #Left SPL number
            Rspl=SPL[-1:] #right SPL number

            Lspl=int(ord(Lspl))
            Rspl=int(ord(Rspl))

            spl = ((256 * Lspl) + Rspl) / 10
            time.sleep(0.7) #adjust for latency changes
            break
    
    #calculate 10 Second Leq
    Leq= round(spl,1)
    Leq = str(Leq) #convert to string for joining with time
    Newtime = str(time.strftime("%H:%M:%S")) #get time on 10 sec intervals
    Newdate = str(time.strftime("%d/%m/%Y"))
    print(Newdate, Newtime,' 1 second Leq =',Leq)
    #write values to txt file
    with open(LEQ_TEXT_FILE_NAME, 'a') as f:
        f.write(Newdate + "\t" + Newtime + "\t" + Leq + "\n")
        f.close()   

#continuous loops
while True:
    try:
        end_time = time.time() + 60 * 15
        while time.time() < end_time:
            Loop1()
    except KeyboardInterrupt:
        ser.close()
        print("serial closed") 
        break  # Break loop on Ctr + C press and run serial close
