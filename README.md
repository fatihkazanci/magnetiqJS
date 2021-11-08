# magnetiqJS
Web uygulamaları için herhangi bir 3.parti kütüphanelerine bağımlı olmadan hızlı ve interaktif kullanıcı işlemlerini oluşturmasını sağlayan bir kütüphanedir. 
#Installation
Include the compiled files in your page.
```html
<script src="mq.min.js"></script>
```
#Usage
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

#Değişken
MagnetiqJs ile oluşturulan değişkenler interaktif olarak değiştirlebilir.
```javascript
        var mq = new magnetiq();
        mq.$var.counter = 0;
```
<b>counter<b> adlı magnetiq değişkenin oluşturduktan sonra bunun html bloğunu ekleyelim. 
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

  
    

