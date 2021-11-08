# magnetiqJS
MagnetiqJS is a library that creates fast and interactive user operations without being dependent to any third-party libraries. 

# Installation
Include the compiled files in your page.
```html
<script src="mq.min.js"></script>
```

# Usage

Firstly create a new magnetiqJS object and then create a variable, array, object or lists over it. 

```javascript
var mq = new magnetiq();
mq.$var.welcomeDescription = "Welcome to MagnetiqJS";
```
Then use a block like below to display variables, arrays, objects or lists created with magnetiqJS directly in HTML. 
```html
<div>
  <h1>{{ welcomeDescription }}</h1>
</div>
```
The output of this variable created with magnetiqJS will be as follows. 

![image](https://user-images.githubusercontent.com/33206545/140715452-fb891f31-a20f-4bc8-8c99-c5e0a93d6fb2.png)

# Variable

Variables created with magnetiqJS can be changed interactive. 
```javascript
mq.$var.counter = 0;
```
After creating magnetiq variable named as <b>counter</b> add its HTML block.  
```html
    <button onclick="counterFunction()" id="counter">Click Me</button>
    <b>This is counter: {{ counter }}</b>
```
Then, as an example, create a function called <b>counterFunction</b> and set it to increase <b>counter</b> value with every click.  
```javascript
       function counterFunction() {
            mq.$var.counter++;
        }
```
The output of this process will be as follows. 
![image](https://user-images.githubusercontent.com/33206545/140716502-0916fd2b-18d2-4f60-af79-07ada061fea4.png)

# mq-for
If you want to display an array or your list in HTML, first create an array or list using magnetiqJS. 

```javascript
mq.$var.nations = ["Turkey","England","USA","Germany","France"];
```
Then to use it in HTML, add its <b>mq-for</b> attribute. 
```html
    <div mq-for="nation in nations">
        <i>{{ nation }}</b> <br>
    </div>
```
If you want to sort the array, you can use the <b>mq-sort</b> attribute. 
```html
    <div mq-for="nation in nations" mq-sort="nation:desc">
        <i>{{ nation }}</b> <br>
    </div>
```
![image](https://user-images.githubusercontent.com/33206545/140718124-2f45a435-5831-4f88-a96d-3de0c43676e7.png)


As another example, you can use it as a nested loop. 
```javascript
mq.$var.persons = [
            {
                name:"Fatih",
                hobbies: ["PC","Football"]
            },
            {
                name:"Caner",
                hobbies: ["PC","Volleyball"]
            },
            {
                name:"Ahmet",
                hobbies: ["PC","Car"]
            }
        ]
```
```html
<h3>Persons</h3>
    <ul>
        <li mq-for="person in persons">
            <div>{{ person.name }}</div>
            <div>
                <div><b>Hobbies:</b></div>
                <span mq-for="hobby in person.hobbies">
                    <i>{{ hobby }}</i> 
                </span>
            </div>
        </li>
    </ul>
```
![image](https://user-images.githubusercontent.com/33206545/140718146-8d05b6f7-8aac-4c3c-b80c-edde948c32c7.png)

# mq-if
If you want an HTML tag to run when certain transaction lines are met, you can use the <b>mq-if</b> attribute.  

```html
<div mq-if="5 > 4">
        "Ne söylediğini unutabilirler, ama onlara nasıl hissettirdiğini asla unutmayacaklar."<br>
        <b>Carl W. Buechner</b>
</div>
```
The <b>mq-if</b> condition applies not only to magnetiqJs but also to standard variables. 
```javascript
var currentNumber = 5;
```

```html
<div mq-if="currentNumber > 4">
        "Ne söylediğini unutabilirler, ama onlara nasıl hissettirdiğini asla unutmayacaklar."<br>
        <b>Carl W. Buechner</b>
</div>
```
![image](https://user-images.githubusercontent.com/33206545/140719879-bbf595eb-8194-4c66-a08a-d9288cb91953.png)

