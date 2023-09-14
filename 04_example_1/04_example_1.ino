#define PIN_LED 13
int cnt,toggle=0;

void setup() {
  pinMode(PIN_LED, OUTPUT);
  Serial.begin(115200);
  while(!Serial){
    ;
  }

  digitalWrite(PIN_LED, toggle);
}

void loop() {
  Serial.println(++cnt);
  toggle=toggle_state(toggle);
  digitalWrite(PIN_LED, toggle);
  delay(1000);
}

int toggle_state(int toggle){
  if(toggle==0){
    toggle=1;
  }else if(toggle==1){
    toggle=0;
  }
  return toggle;
}
