 DevCase – Product Dashboard
 Kullandığım Teknolojiler

Framework: Next.js (App Router)

Kütüphaneler: React, shadcn/ui, TailwindCSS

State Yönetimi: React Context API

Veri Çekme: Fetch API + useEffect

Tasarım: Responsive (mobil uyumlu) yapı

 Yaptığım Geliştirmeler
https://devcase.isiksoftyazilim.com/api/products?page=1 adresinden ürün verilerini çekerek arayüzde gösterdim.

Figma üzerinden sağlanan tasarıma sadık kalarak, shadcn/ui bileşenleri ile tablo yapısını oluşturdum.

Ürün satırlarında checkbox ile seçim yapılabilir hale getirdim.

Her ürün satırı için "Görüntüle", "Düzenle" ve "Sil" seçeneklerini içeren bir aksiyon menüsü ekledim.

Sayfa altına statik olarak bir pagination (sayfalama) arayüzü yerleştirdim (isteğe bağlı olarak dinamikleştirilebilir).

React Context API kullanarak component'ler arasında state paylaşımını sağladım.

TailwindCSS ile her cihazda sorunsuz çalışacak şekilde mobil uyumlu (responsive) yapı kurdum.

Kod yapısını component tabanlı, modüler ve okunabilir olacak şekilde yapılandırdım.

 Hedeflenen Beceriler ve Uygulamalar
Component tabanlı modern frontend geliştirme

REST API’den veri çekme ve işleme

Temiz ve sürdürülebilir kod yazımı

UI/UX prensiplerine uygun, kullanıcı dostu tasarım

Responsive (mobil uyumlu) arayüz geliştirme

React Context ile basit state yönetimi

🔗 Canlı Demo
Projeyi Vercel üzerinde deploy ettim:
https://product-dashboard-git-master-turksevenalperens-projects.vercel.app/

 Projeyi Çalıştırmak İçin 
1. Git Üzerinden Klonlama:
git clone https://github.com/turksevenalperen/product-dashboard.git
cd product-dashboard
npm install
npm run dev

3. Veya ZIP Dosyası Olarak:
Projeyi ZIP olarak indirin.

Visual Studio Code (VSCode) ile açın.

Aşağıdaki komutlarla projeyi başlatın:
npm install
npm run dev
