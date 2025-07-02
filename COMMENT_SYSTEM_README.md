# Blog Comment System

Bu proje artık gelişmiş bir blog yorum sistemiyle donatılmıştır. Sistem misafir kullanıcıların yorum yapmasına izin verir ve admin onay sistemi ile çalışır.

## Özellikler

### 🔓 Misafir Yorum Yapma
- Kullanıcıların oturum açmadan yorum yapabilmesi
- İsim, email ve yorum alanları zorunlu
- Email doğrulaması
- Yorumlar otomatik olarak "onay bekliyor" durumunda

### ✅ Admin Onay Sistemi
- Tüm yorumlar varsayılan olarak onay bekliyor
- Admin/Editor rolündeki kullanıcılar yorumları onaylayabilir
- Yorumlar onaylandıktan sonra blog'da görünür
- Spam ve uygunsuz yorumları silme imkanı

### 📊 Dashboard Yönetimi
- `/dashboard/comments` sayfasında tüm yorumları yönetme
- Bekleyen, onaylanan ve tüm yorumlar için ayrı sekmeler
- Her yorum için:
  - Yazar bilgileri (isim, email)
  - Yorum içeriği
  - Hangi blog yazısına ait olduğu
  - Tarih bilgisi
  - Onayla/Sil butonları

## Teknik Detaylar

### Backend API Endpoints

#### Genel Kullanım
- `POST /api/blog-posts/:postId/comments` - Yeni yorum ekleme (herkese açık)
- `GET /api/blog-posts/:id` - Blog yazısı ve onaylı yorumlar (herkese açık)

#### Admin/Editor İşlemleri
- `GET /api/blog-posts/comments` - Tüm yorumları listele
- `GET /api/blog-posts/admin/:id` - Blog yazısı ve tüm yorumlar (pending dahil)
- `PUT /api/blog-posts/:postId/comments/:commentId/approve` - Yorumu onayla
- `DELETE /api/blog-posts/:postId/comments/:commentId` - Yorumu sil

### Database Schema

Yorumlar için genişletilmiş şema:
```javascript
comments: [{
  name: String,        // Yorum yapan kişinin adı
  email: String,       // Email adresi
  comment: String,     // Yorum içeriği
  avatar: String,      // Profil resmi URL'i
  date: String,        // Yorum tarihi
  isApproved: Boolean, // Onay durumu (varsayılan: false)
  isGuest: Boolean,    // Misafir kullanıcı mı (varsayılan: true)
}]
```

### Frontend Bileşenleri

#### Blog Yorum Formu (`BlogReplyForm`)
- `/components/form/blog-reply-form.tsx`
- Misafir kullanıcılar için form
- Doğrulama ve hata yönetimi
- Toast bildirimleri

#### Yorum Listesi (`BlogDetailsComments`)
- `/components/blog/details/blog-details-comments.tsx`
- Sadece onaylı yorumları gösterir
- Statik ve dinamik veri desteği

#### Admin Yorum Yönetimi
- `/app/dashboard/comments/page.tsx`
- Tüm yorumları yönetme arayüzü
- Sekme tabanlı filtreleme
- Sayfalama desteği

## Kullanım

### Kullanıcı Perspektifi
1. Blog yazısının altındaki yorum formunu doldurun
2. İsim, email ve yorumunuzu girin
3. "Yorum Gönder" butonuna tıklayın
4. "Yorumunuz gönderildi. Onaylandıktan sonra görünecektir." mesajını görün

### Admin Perspektifi
1. Dashboard'a giriş yapın
2. Sol menüden "Comments" seçeneğine tıklayın
3. "Bekleyen Yorumlar" sekmesinde yeni yorumları görün
4. Uygun yorumları "Onayla" butonuyla onaylayın
5. Spam yorumları "Sil" butonuyla silin

## Güvenlik

- Email doğrulaması yapılır
- SQL injection koruması
- XSS koruması için HTML sanitization
- Admin/Editor rolleri kontrol edilir
- Rate limiting (gerekirse eklenebilir)

## Gelecek Geliştirmeler

- [ ] Yorum beğenme sistemi
- [ ] Yanıt yapma (reply) özelliği
- [ ] Email bildirimleri
- [ ] Spam filtreleme
- [ ] Moderasyon kuralları
- [ ] Kullanıcı engelleme

## API Örnek Kullanımlar

### Yorum Ekleme
```javascript
const response = await fetch('/api/blog-posts/123/comments', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    comment: 'Harika bir yazı!'
  })
});
```

### Yorumları Listeleme (Admin)
```javascript
const response = await fetch('/api/blog-posts/comments?status=pending&page=1&limit=10', {
  headers: { Authorization: `Bearer ${token}` }
});
```

### Yorum Onaylama
```javascript
const response = await fetch('/api/blog-posts/123/comments/456/approve', {
  method: 'PUT',
  headers: { Authorization: `Bearer ${token}` }
});
``` 