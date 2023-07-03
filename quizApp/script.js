//1.Adım: Soruları oluştur
class Soru{
   constructor(soruMetni,cevaplar,dogruCevap){
         this.soruMetni = soruMetni;
         this.cevaplar = cevaplar;
         this.dogruCevap = dogruCevap;
   }
   dogruMu(cevap){
            return this.dogruCevap === cevap;
   }
}

//2.Adım Quiz sınıfı oluştur
class Quiz{
    constructor(sorular){
            this.sorular = sorular;
            this.soruIndex = 0;
            this.skor = 0;
    }
    soruGetir(){
            return this.sorular[this.soruIndex];
    }
    cevapKontrol(cevap){
            if(this.soruGetir().dogruMu(cevap)){
                this.skor++;
            }
            this.soruIndex++;
    }
    sonrakiSoru(){
            this.soruIndex++;
    }
    quizBittiMi(){
            return this.soruIndex === this.sorular.length;
    }
}

//3. Adım Quiz nesnesi oluşturma
const quiz = new Quiz([
    new Soru("En iyi programlama dili hangisidir?",["C#","Javascript","Python","Java"],"Javascript"),
    new Soru("HTML ne anlama gelir?", ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Text Machine Language"], "Hyper Text Markup Language"),
    new Soru("En popüler programlama dili hangisidir?",["C#","Javascript","Python","Java"],"Javascript"),
    new Soru("CSS ne için kullanılır?", ["Styling web pages", "Creating database", "Managing server", "Building mobile apps"], "Styling web pages"),
    new Soru("En çok sevilen programlama dili hangisidir?",["C#","Javascript","Python","Java"],"Javascript")
]);

//4.Adım HTML elementleri seçme ve oluşturma
const quizContainer = document.getElementById("quiz");
const soruMetniElementi = document.createElement("p");
const cevaplarElementi = document.createElement("div");
const buton = document.createElement("button");
const sonucElementi = document.createElement("p");

//5.Adım Soruyu göster
function soruyuGoster(){
    if(quiz.quizBittiMi()){
        sonucuGoster();
    }else{
        soruMetniElementi.innerHTML = quiz.soruGetir().soruMetni;
        quizContainer.appendChild(soruMetniElementi);
        cevaplarElementi.innerHTML = "";
        quiz.soruGetir().cevaplar.forEach(cevap => {
            const cevapElementi = document.createElement("button");
            cevapElementi.innerHTML = cevap;  
            cevaplarElementi.appendChild(cevapElementi);
            cevapElementi.addEventListener("click", function() {
                quiz.cevapKontrol(cevap);
                soruyuGoster();
              });
        });
        quizContainer.appendChild(cevaplarElementi);
    }
}

//6.Adım Sonucu göster
function sonucuGoster(){
    quizContainer.innerHTML = "";
    soruMetniElementi.innerHTML = "";
    cevaplarElementi.innerHTML = "";
    sonucElementi.innerHTML = `Tebrikler ${quiz.skor}/${quiz.sorular.length} doğru cevap verdiniz.`;
    quizContainer.appendChild(sonucElementi);
}


//7.Adım Quizi başlat
soruyuGoster();