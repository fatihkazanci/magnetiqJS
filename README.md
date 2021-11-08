# magnetiqJS
Web uygulamaları için herhangi bir 3.parti kütüphanelerine bağımlı olmadan hızlı ve interaktif kullanıcı işlemlerini oluşturmasını sağlayan bir kütüphanedir. 

# Installation
Include the compiled files in your page.
```html
<script src="mq.min.js"></script>
```

# Usage

Öncelikle yeni bir magnetiqJS nesnesi oluşturup onun üzerinden değişken,dizi,obje veya listemizi oluşturalım.

```javascript
var mq = new magnetiq();
mq.$var.welcomeDescription = "Welcome to MagnetiqJS";
```
ardından magnetiqJS ile oluştulan değişken,dizi,obje veya listelerimizi direk olarak HTML içerisinde görüntülemek için alttaki gibi bir blok kullanmalısınız.
```html
<div>
  <h1>{{ welcomeDescription }}</h1>
</div>
```
magnetiqJS ile oluşturulan bu değişkenin çıktısı aşağıdaki gibi olacaktır.

![image](https://user-images.githubusercontent.com/33206545/140715452-fb891f31-a20f-4bc8-8c99-c5e0a93d6fb2.png)

# Variable

MagnetiqJs ile oluşturulan değişkenler interaktif olarak değiştirlebilir.
```javascript
mq.$var.counter = 0;
```
<b>counter</b> adlı magnetiq değişkenin oluşturduktan sonra bunun html bloğunu ekleyelim. 
```html
    <button onclick="counterFunction()" id="counter">Click Me</button>
    <b>This is counter: {{ counter }}</b>
```
Ardından örnek olarak <i>counterFunction</i> adlı fonksiyon oluşturup <b>counter</b> değerimizi her tıklamada bir artırıcak şekilde yapalım.
```javascript
       function counterFunction() {
            mq.$var.counter++;
        }
```
sonrasında bu işlemin çıktığı aşağıdaki gibi olacaktır.
![image](https://user-images.githubusercontent.com/33206545/140716502-0916fd2b-18d2-4f60-af79-07ada061fea4.png)

# mq-for
Bir dizi veya listenizi HTML içerinde görüntülemek istiyorsanız, öncelikle magnetiqjs'i kullanarak bir dizi veya liste oluşturalım.

```javascript
mq.$var.nations = ["Turkey","England","USA","Germany","France"];
```
daha sonrasında bunu html içerisinde kullanmak için mq-for attribute'sini ekleyelim.
```html
    <div mq-for="nation in nations">
        <i>{{ nation }}</b> <br>
    </div>
```
eğer oluşturulan dizide sıralama yapmak istiyorsak <b>mq-sort</b> attribute'sini kullanabiliriz.
```html
    <div mq-for="nation in nations" mq-sort="nation:desc">
        <i>{{ nation }}</b> <br>
    </div>
```
![image](https://user-images.githubusercontent.com/33206545/140718124-2f45a435-5831-4f88-a96d-3de0c43676e7.png)


başka bir örnek olarak iç içe döngü şeklindede kullanabiliriz.
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
Eğer bir html etiketini belirli işlem satırlarının istenen koşullar sağlandığında çalışmasını istiyorsak <b>mq-if</b> attribute'sini kullanabiliriz.

```html
<div mq-if="5 > 4">
        "Ne söylediğini unutabilirler, ama onlara nasıl hissettirdiğini asla unutmayacaklar."<br>
        <b>Carl W. Buechner</b>
</div>
```
<b>mq-if</b> koşulu sadece magnetiqJs için değiş standart oluşturulan değişkenler içinde geçerlidir.
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

