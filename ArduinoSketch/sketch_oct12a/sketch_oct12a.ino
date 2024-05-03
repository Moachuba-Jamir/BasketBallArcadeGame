//potentiometer : counterclock wise reduces the range of the ir sensor and vice versa
//pruple = pin 8 
//brown = 5v
//white = ground
#define SERIAL_PORT Serial

int irSensor =  8;
int switchPin = 2;

void setup() {
  // put your setup code here, to run once:

  // for switch 
  pinMode(switchPin, INPUT_PULLUP);

  // extablishing connection to USB port with a baud rate of 9600
  SERIAL_PORT.begin(9600);

  // for IR sensor 
  pinMode(irSensor, INPUT);
};

void loop() {
  // put your main code here, to run repeatedly:
  int sensorVal = digitalRead(irSensor);

  if(sensorVal == HIGH){
    SERIAL_PORT.println(0); //Object not detected
  }else{
    SERIAL_PORT.println(1); //object detected
    delay(200);
  }
    delay(20);

    int pinValue = digitalRead(switchPin);
    
    if(pinValue == LOW){
      // switchValue = pinValue;
      SERIAL_PORT.println("s");
    };
};