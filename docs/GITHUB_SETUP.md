# GitHub Raw Content Setup

## Cara Setup Portfolio dengan GitHub Raw URLs

### 1. Buat Repository GitHub untuk Assets
1. Buat repository baru di GitHub (contoh: `portfolio-assets`)
2. Bisa public atau private (tapi raw URL hanya work untuk public)

### 2. Upload Files ke Repository
Struktur folder yang disarankan:
```
portfolio-assets/
├── projects.json
└── images/
    ├── bank-bni/
    │   ├── 1.png
    │   ├── 2.png
    │   └── ...
    ├── bank-ocbc/
    ├── npay/
    ├── tms/
    └── cashlez/
```

### 3. Format Raw URL
```
https://raw.githubusercontent.com/{username}/{repo}/{branch}/{path}
```

Contoh:
```
https://raw.githubusercontent.com/anggijuhniawan/portfolio-assets/main/projects.json
https://raw.githubusercontent.com/anggijuhniawan/portfolio-assets/main/images/bank-bni/1.png
```

### 4. Buat projects.json
Simpan file ini di root repository:

```json
[
  {
    "title": "Monitoring Transactions EDC Bank BNI",
    "description": "A web application to monitor transaction activities on EDC devices for Bank BNI.",
    "logo": "/logos/driwwwle.svg",
    "link": "http://146.196.106.203:64390/",
    "slug": "monitoring-transactions-edc-bank-bni",
    "image": "https://raw.githubusercontent.com/anggijuhniawan/portfolio-assets/main/images/bank-bni/1.png",
    "language": "TypeScript, React, Tailwind, Golang",
    "content": "This comprehensive web application...",
    "gallery": [
      "https://raw.githubusercontent.com/anggijuhniawan/portfolio-assets/main/images/bank-bni/1.png",
      "https://raw.githubusercontent.com/anggijuhniawan/portfolio-assets/main/images/bank-bni/2.png"
    ],
    "features": ["Feature 1", "Feature 2"],
    "techStack": ["TypeScript", "React"]
  }
]
```

### 5. Cara Update Content
1. Edit `projects.json` di GitHub (bisa lewat web editor)
2. Commit changes
3. Website auto fetch data terbaru (dengan revalidation)

### 6. Tips
- ✅ Free unlimited bandwidth
- ✅ Easy to update via GitHub web editor
- ✅ Version control built-in
- ✅ No API limits
- ⚠️ Cache 5 minutes (gunakan revalidate di Next.js)
- ⚠️ Repository harus public untuk raw URLs

### 7. Alternative: GitHub API
Jika repository private, gunakan GitHub API dengan Personal Access Token
