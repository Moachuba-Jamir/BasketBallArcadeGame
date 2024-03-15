//potentiometer : counterclock wise reduces the range of the ir sensor and vice versa
//pruple = pin 8 
//brown = 5v
//white = ground
#define SERIAL_PORT Serial
//Ir sensor testing 
int irSensor =  8;
// int switchValue = 0;

void setup() {
  // put your setup code here, to run once:
  pinMode(2, INPUT_PULLUP);
  SERIAL_PORT.begin(9600);
  pinMode(irSensor, INPUT);
};

void loop() {
  // put your main code here, to run repeatedly:
  int sensorVal = digitalRead(irSensor);

  if(sensorVal == HIGH){
      SERIAL_PORT.println(0); //obstacle not detected
  }else{
    SERIAL_PORT.println(1); //obstacle detected
    delay(300);
  }
    delay(20);

    int pinValue = digitalRead(2);
    
    if(pinValue == LOW){
      // switchValue = pinValue;
      SERIAL_PORT.println("s");
    };
};