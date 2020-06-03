/*
Authors:
Ron Moshe
Afik Ziv
*/
#include <stdio.h>
#include <stdlib.h>
#include <limits.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/ipc.h>
#include <sys/shm.h>
#include <pthread.h>
#include <signal.h>
#include <math.h>




//Maximum cars for running one demostration
#define MAX_CARS 5000

struct Queue1
{ 
    int front, rear, size; 
    unsigned capacity; 
    int* array; 
}; 
  
int * createQueue(unsigned capacity, struct Queue1**, key_t key);
double nextTime(float, float);
int rear(struct Queue1*);
int front(struct Queue1*);
int dequeue(struct Queue1*);
void enqueue(struct Queue1*, int);
int isEmpty(struct Queue1*);
int isFull(struct Queue1*);
void *myThreadFunc();
int check_availability(double*, struct Queue1*, int*, int*, pthread_mutex_t, pthread_mutex_t,int*);
void sigquit();
void printStart();



int main(){
  struct Queue1* shmp;
  int cars, i, temp, shmid;
  double limit;
  double *running_time, *arrive_time, *washing_time;
  int *stations_arr, *wash_machine, *countCars;
  int pid;
  key_t key, key1, key2, key3, key4, key5, key6, key7;
  printf("Car Wash System\n");
  printf("Insert number of wash stations: ");
  
  scanf("%d",wash_machine);

  key7 = ftok("main.c", 3590);
  if (key7 == -1) {
    perror("Key for shared memory is currupt\n");
    exit(1);
  }
  shmid = shmget(key7,sizeof(int), 0644|IPC_CREAT);
  if (shmid == -1) {
    perror("Shared memory error first - stations\n");
    return 1;
    }
  
  // Attach to the segment to get a pointer to it.
  countCars = shmat(shmid, NULL, 0);
  if (countCars == (void *) -1) {
    perror("Shared memory attach");
    return 1;
  }
  *countCars = 0;
  
  key3 = ftok("main.c", 1960);
  if (key3 == -1) {
    perror("Key for shared memory is currupt\n");
    exit(1);
  }
  shmid = shmget(key3,sizeof(int), 0644|IPC_CREAT);
  if (shmid == -1) {
    perror("Shared memory error first - stations\n");
    return 1;
    }
  
  // Attach to the segment to get a pointer to it.
  wash_machine = shmat(shmid, NULL, 0);
  if (wash_machine == (void *) -1) {
    perror("Shared memory attach");
    return 1;
  }

  key2 = ftok("main.c", 19256);
  if (key2 == -1) {
    perror("Key for shared memory is currupt\n");
    exit(1);
  }
  shmid = shmget(key2,sizeof(int)*((*wash_machine)+2), 0644|IPC_CREAT);
  if (shmid == -1) {
    perror("Shared memory error first - array stations\n");
    return 1;
    }
  
  // Attach to the segment to get a pointer to it.
  stations_arr = shmat(shmid, NULL, 0);
  if (stations_arr == (void *) -1) {
    perror("Shared memory attach");
    return 1;
  }
//////////////////////////////////////////////////////////////

  /*Init arr wishing stations to 0 for empty stations*/
  for( i=0; i<*wash_machine; i++){
    stations_arr[i] = NULL;
  }
  /*
  for(i=0; i<*stations; i++){
    printf("%d ",stations_arr[i]);
  }
  */
  printf("\n\nThe system is starting to wash . . . \n\n");
  
  key5 = ftok("main.c", 5500);
  if (key5 == -1) {
    perror("Key for shared memory is currupt\n");
    exit(1);
  }
  shmid = shmget(key5,sizeof(double), 0644|IPC_CREAT);
  if (shmid == -1) {
    perror("Shared memory error first\n");
    return 1;
    }
  
  // Attach to the segment to get a pointer to it.
  arrive_time = shmat(shmid, NULL, 0);
  if (arrive_time == (void *) -1) {
    perror("Shared memory attach");
    return 1;
  }
  /*Choose float number between 1 to 2 for choose waiting arrive of cars*/
  srand((unsigned int)time(NULL));
  limit = 1.0;
  *arrive_time = ((double)rand()/(double)(RAND_MAX)) * limit;
  *arrive_time += 1.0;
  //Calc Poisson distribution
  *arrive_time = nextTime(*arrive_time, 4.0);
  printf("The arrive time for cars that is chosen is every %lf seconds\n", *arrive_time);
  
  key6 = ftok("main.c", 7300);
  if (key5 == -1) {
    perror("Key for shared memory is currupt\n");
    exit(1);
  }
  shmid = shmget(key6,sizeof(double), 0644|IPC_CREAT);
  if (shmid == -1) {
    perror("Shared memory error first\n");
    return 1;
    }
  
  // Attach to the segment to get a pointer to it.
  washing_time = shmat(shmid, NULL, 0);
  if (washing_time == (void *) -1) {
    perror("Shared memory attach");
    return 1;
  }

  /*Choose float number between 2 to 4 for choose time for washing cars*/
  srand((unsigned int)time(NULL));
  limit = 2.0;
  *washing_time = ((double)rand()/(double)(RAND_MAX)) * limit;
  *washing_time += 2.3;
  
  *washing_time = nextTime(*washing_time, 2.0);
  printf("The washing time for cars that is chosen is every %lf seconds\n", *washing_time);

  key4 = ftok("main.c", 1025);
  if (key4 == -1) {
    perror("Key for shared memory is currupt\n");
    exit(1);
  }
  
  shmid = shmget(key4, sizeof(double), 0644|IPC_CREAT);
  if (shmid == -1) {
    perror("Shared memory error first\n");
    return 1;
    }
   
  running_time = shmat(shmid, NULL, 0);
  if (running_time == (void *) -1) {
    perror("Shared memory error");
    return 1;
  }
  
  
  srand((unsigned int)time(NULL));
  limit = 10.0;
  *running_time = ((double)rand()/(double)(RAND_MAX)) * limit;
  *running_time += 25.0;
  //Calc Poisson distribution
  *running_time = nextTime(*running_time, 35.0);
  printf("The system running time that is chosen is every %lf seconds\n", *running_time);
  //Create shered memory queue for cars///////////////////////////////////////////////////
  struct Queue1* queue; 
  //Create key for sheard memory
  key = ftok("main.c", 21);
  //printf("KEYYYYYYY === %d",key);
  if (key == -1) {
    perror("Key for shared memory is currupt\n");
    exit(1);
  }

  shmid = shmget(key, sizeof(struct Queue1
  ), 0644|IPC_CREAT);
  if (shmid == -1) {
    perror("Shared memory error first\n");
    return 1;
    }
  
  // Attach to the segment to get a pointer to it.
  shmp = shmat(shmid, NULL, 0);
  if (shmp == (void *) -1) {
    perror("Shared memory attach");
    return 1;
  }
  //key for array inside the queue
  key1 = ftok("main.c", 10030);
  //printf("KEYYYYYYY === %d",key);
  if (key1 == -1) {
    perror("Key for shared memory is currupt\n");
    exit(1);
  }
  int * arr_queue = createQueue(MAX_CARS,&shmp, key1);
  
  
  
  pthread_mutex_t Mutex = PTHREAD_MUTEX_INITIALIZER; //create mutex
  pthread_mutex_t Mutex1 = PTHREAD_MUTEX_INITIALIZER;


  if(pthread_mutex_init(&Mutex,NULL) != 0){
    perror("Error in mutex\n");
    exit(1);
  }

  if(pthread_mutex_init(&Mutex1,NULL) != 0){
    perror("Error in mutex 1\n");
    exit(1);
  }

  pid = fork();
  if(pid==0){
    signal(SIGQUIT, sigquit); 
    
    int i, j;
    int pid_sun;
    
    srand((unsigned int)time(NULL));
    for(i = 1; i <= MAX_CARS ; i++){
      pid_sun = fork();
      *arrive_time = nextTime(*arrive_time, 4.0);
      long arrive_unit_sec = (long)(1000000.0 * (*arrive_time));
      usleep(arrive_unit_sec);
      if(pid_sun == 0) {        
        pthread_mutex_lock(&Mutex);
        enqueue(shmp,i); 
        pthread_mutex_unlock(&Mutex);
        printf("\nVehicle %d arrived at the facility and joins the queue\n",i);
        printf("Vehicle process => PPID=%d, PID=%d, NUM=%d\n\n", getppid(), getpid(), i);
        srand(time(0));
        int flag = check_availability(washing_time,shmp, wash_machine ,stations_arr, Mutex, Mutex1, countCars);      
      }
    } 
  }
  else{
      long running_unit_sec = (long)(1000000.0 * (*running_time));
      usleep(running_unit_sec);
      kill(pid, SIGQUIT);      
      sleep(4);
      printf("\nThe number of cars that have been washed in demostration is %d\n",*countCars); 
      printf("sending SIGQUIT after %lf seconds the program shutdown demostration\n\n",*running_time); 


      //Destroy Mutex:
      pthread_mutex_destroy(&Mutex1);
      pthread_mutex_destroy(&Mutex);


      //Close Shared Memo:
      shmctl(running_time,IPC_RMID,0);
      shmctl(shmp,IPC_RMID,0);
      shmctl(arr_queue,IPC_RMID,0);
      shmctl(stations_arr,IPC_RMID,0);
      shmctl(wash_machine,IPC_RMID,0);
      shmctl(arrive_time,IPC_RMID,0);
      shmctl(countCars,IPC_RMID,0);
      return 0;
  }
  return 0;
}


double nextTime(float rateParameter,float max){
  usleep(500000);
  float next = -logf(1.0f - (float)rand() / (RAND_MAX + 0.50)) / (1.0 / rateParameter);
  if( next > max || next ==0){
    return max;
  } 
  return next;  
}

  
/*
my Queue is full when size becomes equal to the capacity  
*/
int isFull(struct Queue1* queue){
  return (queue->size == queue->capacity);
} 
  
/*
my Queue is empty when size is 0 
*/
int isEmpty(struct Queue1
* queue) 
{  return (queue->size == 0); } 
  
/*
Function to add an item to the queue.   
It changes rear and size 
*/
void enqueue(struct Queue1
* queue, int item) 
{ 
    if (isFull(queue)) 
        return; 
    queue->rear = (queue->rear + 1)%queue->capacity; 
    queue->array[queue->rear] = item; 
    queue->size = queue->size + 1; 
    //printf("\n%d enqueued to queue\n", item); 
} 

/*  
Function to remove an item from my queue.  
It changes front and size 
*/
int dequeue(struct Queue1* queue) 
{ 
    if (isEmpty(queue)) 
        return INT_MIN; 
    int item = queue->array[queue->front]; 
    queue->front = (queue->front + 1)%queue->capacity; 
    queue->size = queue->size - 1; 
    return item; 
} 
  
/*
Function to get front of queue 
*/
int front(struct Queue1* queue){ 
    if (isEmpty(queue)) 
        return INT_MIN; 
    return queue->array[queue->front]; 
} 
  
/*
Function to get rear of queue 
*/
int rear(struct Queue1* queue){ 
    if (isEmpty(queue)) 
        return INT_MIN; 
    return queue->array[queue->rear]; 
}

/*
function to create our queue of given capacity.
It initializes size of queue as 0
*/
int * createQueue(unsigned capacity,struct Queue1** queue, key_t key) 
{ 
    int shmid;
    int* temp_arr;
    * queue = (struct Queue1*) malloc(sizeof(struct Queue1
    )); 
    (*queue)->capacity = capacity; 
    (*queue)->front = (*queue)->size = 0;  
    (*queue)->rear = capacity - 1;  
    shmid = shmget(key, (*queue)->capacity * sizeof(int), 0644|IPC_CREAT);
    if (shmid == -1) {
      perror("Shared memory error second\n");
      return 1;
      }
    
    // Attach to the segment to get a pointer to it.
    temp_arr =(int*)shmat(shmid, NULL, 0);
    if (temp_arr == (void *) -1) {
      perror("Shared memory attach");
      return 1;
    }
    (*queue)->array = temp_arr;
    return temp_arr;
}

/*
Function for create thread
*/
void *myThreadFunc(){
  printf("\ni'm created thread\n");
}

/* 
This function responsible for insert the cars into washing machines, 
before we do dequeue from the queue we check if there is a free wash machine, 
if not we wait till some wash machine will be available
 */
int check_availability(double* time_wash,struct Queue1
* shmp, int* stations ,int* stations_arr, pthread_mutex_t Mutex, pthread_mutex_t Mutex1,int* countCars){
  //The function for each car is responsible for get inside cars to wash boots      
  //printf("\n process =====> PID=%d\n", getpid());   
  
  int i, j;
  while(1){
    pthread_mutex_lock(&Mutex1);
    srand(time(0));
    for(i = 0; i<*stations ; i++){
      if(stations_arr[i] == 0){
        pthread_mutex_lock(&Mutex);
        int temp = dequeue(shmp);              
        pthread_mutex_unlock(&Mutex);
        if(temp<0){
          break;
        }
        else{ 
          pthread_mutex_lock(&Mutex);
          stations_arr[i] = temp;
          pthread_mutex_unlock(&Mutex);
          printf("\nIt's my turn now to get service and clean up, I'm a car number %d\narr stations cleaning ====",stations_arr[i]);
          for(j=0; j<*stations; j++){
            printf("%d ",stations_arr[j]);
          }
          printf("\n\n");
          pthread_mutex_unlock(&Mutex1);
          //Calc Poisson distribution
          pthread_mutex_lock(&Mutex);
          *time_wash = nextTime(*time_wash, 2.0);          
          pthread_mutex_unlock(&Mutex);
          int temp = (int)((*time_wash) * 1000000);
          usleep(temp);
          printf("\nI'm clean my pid is:%d and my number car is:%d\n",getpid(),stations_arr[i]);
          printf("I'm was get service at boot number:%d he is avalible\n",i+1);
          stations_arr[i]=0;
          *countCars+=1;
          pthread_mutex_unlock(&Mutex1);
          exit(1);
      }
      }
      
    }
  }
}

void printStart(){

}


void sigquit() 
{ 
    printf("\n\nFinish Close The Program BYE BYE.\n\n\n");
    exit(0); 
} 

