export function createSlug(title: string): string {
  return title
    .toLowerCase()
    // Türkçe karakterleri İngilizce karşılıklarına çevir
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/Ğ/g, 'G')
    .replace(/Ü/g, 'U')
    .replace(/Ş/g, 'S')
    .replace(/İ/g, 'I')
    .replace(/Ö/g, 'O')
    .replace(/Ç/g, 'C')
    // HTML etiketlerini kaldır
    .replace(/<[^>]*>/g, '')
    // Özel karakterleri kaldır, sadece harf, rakam ve boşluk bırak
    .replace(/[^a-z0-9\s-]/g, '')
    // Birden fazla boşluğu tek boşluğa çevir
    .replace(/\s+/g, ' ')
    // Boşlukları tire ile değiştir
    .replace(/\s/g, '-')
    // Birden fazla tireyi tek tireye çevir
    .replace(/-+/g, '-')
    // Başındaki ve sonundaki tireleri kaldır
    .replace(/^-+|-+$/g, '');
}

export function findBlogBySlug(blogData: any[], slug: string) {
  return blogData.find(blog => createSlug(blog.title) === slug);
} 