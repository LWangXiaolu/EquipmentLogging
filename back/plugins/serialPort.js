//under construction
const SerialPort=require('serialport');
const myport=new SerialPort('COM1',{
    baudRate:19200
})

const Readline=SerialPort.parsers.Readline;
const parser=new Readline();

myport.pipe(parser);
