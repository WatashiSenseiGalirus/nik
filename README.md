# NIK Parse • Vercel Ready 🚀

Parse & Validasi **Nomor Induk Kependudukan (NIK)** KTP Indonesia.

Versi ini sudah siap di-deploy ke **Vercel** dengan:

- ✅ **API Endpoint** publik (`/api/parse`)
- ✅ **Halaman Official** estetis, futuristik, penuh visual keren (neon + particles + glassmorphism)
- ✅ Zero dependency runtime (parser pure JS)
- ✅ CORS enabled
- ✅ GET & POST support

---

## 🌐 Deploy ke Vercel (1-click)

1. Push repo ini ke GitHub
2. Import project di [vercel.com](https://vercel.com)
3. Deploy — selesai!

Atau via CLI:

```bash
npx vercel
```

---

## 📡 API

### GET
```
GET /api/parse?nik=3204110609970001
```

### POST
```bash
curl -X POST https://YOUR-DOMAIN.vercel.app/api/parse \
  -H "Content-Type: application/json" \
  -d '{"nik":"3204110609970001"}'
```

### Response (success)
```json
{
  "status": "success",
  "pesan": "NIK valid",
  "data": {
    "nik": "3204110609970001",
    "kelamin": "LAKI-LAKI",
    "lahir": "06/09/1997",
    "provinsi": "JAWA BARAT",
    "kotakab": "KAB. BANDUNG",
    "kecamatan": "CICALENGKA",
    "uniqcode": "0001",
    "tambahan": {
      "kodepos": "40395",
      "pasaran": "Sabtu Legi, 6 September 1997",
      "usia": "28 Tahun ...",
      "ultah": "... Lagi",
      "zodiak": "Virgo"
    }
  },
  "meta": {
    "timestamp": "...",
    "source": "nik-parse-vercel",
    "version": "2.0.0"
  }
}
```

---

## 📁 Struktur

```
nik-parse-vercel/
├── api/
│   └── parse.js          ← Serverless API
├── lib/
│   └── nik_parse.js      ← Core parser (original + export)
├── public/
│   └── index.html        ← Official futuristic page
├── package.json
├── vercel.json
└── README.md
```

---

## 🙏 Credit

Core parser by **[@bachors](https://github.com/bachors/nik_parse.js)**  
Redesigned & Vercel-ready 2025
