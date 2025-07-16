# 📚 Semantic Web-Based Journal Repository

Sistem repositori jurnal berbasis web yang dikembangkan dengan menerapkan teknologi Semantic Web dan Ontologi untuk meningkatkan pencarian yang lebih relevan dan terstruktur. Dibangun menggunakan Next.js , Apache Jena Fuseki sebagai RDF store, dan MySQL untuk autentikasi pengguna.

---

## 🚀 Fitur Utama

- 🔐 **Login Admin dan Author**
- 🔍 **Pencarian Artikel Berbasis Semantik (SPARQL)**
- 👨‍🏫 **Pencarian Author berdasarkan Nama, Keahlian, dan Prodi**
- ➕ **CRUD Artikel**
- 🧑‍🔬 **CRUD Author**

---

## ⚙️ Teknologi yang Digunakan

| Teknologi     | Deskripsi                                       |
| ------------- | ----------------------------------------------- |
| Next.js       | Frontend dan Backend Framework (React-based)    |
| TypeScript    | Bahasa pemrograman utama                        |
| Apache Jena   | RDF triple store dan SPARQL endpoint            |
| Fuseki Server | Server penyimpanan ontologi berbasis RDF        |
| MySQL         | Penyimpanan data login dan autentikasi pengguna |
| SPARQL        | Query untuk pengambilan dan manipulasi data RDF |
| Chakra UI     | Komponen UI modern                              |

---

## 🛠️ Instalasi

1. **Clone repositori:**
   ```bash
   git clone https://github.com/your-username/semantic-journal-repo.git
   cd semantic-journal-repo
   ```

## 📌 SPARQL Contoh Query

```sparql
PREFIX journal: <http://www.if.upnjatim.ac.id/ontologies/2025/faculty#>

SELECT ?articleTitle ?authorName
WHERE {
  ?article journal:articleTitle ?articleTitle ;
           journal:isArticleOf ?author .
  ?author journal:authorName ?authorName .
}
```
