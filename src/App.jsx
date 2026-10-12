
import { useState } from 'react';
import {
  BrowserRouter,
  Link,
  NavLink,
  Routes,
  Route,
  useNavigate,
} from 'react-router';
import initialBooks from './Utils/books';
import './App.css';

function AlbumContent({ books, tambahBuku, pilihBuku }) {
  const [bukuUtama, setBukuUtama] = useState(0);
  const buku = books[bukuUtama] || books[0];

  function bukuBerikutnya() {
    setBukuUtama((index) => (index + 1) % books.length);
  }

  function bukuSebelumnya() {
    setBukuUtama(
      (index) => (index - 1 + books.length) % books.length
    );
  }

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-label">TEMUKAN BUKU FAVORITMU</span>
          <h1>{buku.title}: Temukan Cerita dan Inspirasi Baru</h1>
          <p>{buku.description}</p>

          <div className="hero-buttons">
            <button
              className="signup-btn hero-buy"
              onClick={() => alert(`Kamu memilih buku ${buku.title}`)}
            >
              Beli Sekarang
            </button>

            <button
              className="detail-btn"
              onClick={() => pilihBuku(buku.id)}
            >
              Detail Buku
            </button>
          </div>

          <div className="hero-pagination">
            <button
              type="button"
              className="detail-btn"
              onClick={bukuSebelumnya}
              aria-label="Buku sebelumnya"
            >
              ←
            </button>

            <span>
              {bukuUtama + 1} / {books.length}
            </span>

            <button
              type="button"
              className="detail-btn"
              onClick={bukuBerikutnya}
              aria-label="Buku berikutnya"
            >
              →
            </button>
          </div>
        </div>

        <div className="hero-image-wrap">
          <img
            src={buku.image}
            alt={buku.title}
            className="hero-image"
          />
          <div className="image-caption">
            <span>Buku Pilihan</span>
            <strong>{buku.title}</strong>
            <small>{buku.author}</small>
          </div>
        </div>
      </section>

      <section className="book-section" id="koleksi">
        <div className="section-heading">
          <div>
            <span className="hero-label">KOLEKSI KAMI</span>
            <h2>Buku untuk Setiap Cerita</h2>
            <p>Pilih bacaan yang cocok untuk menemani harimu.</p>
          </div>
        </div>

        <button className="signup-btn" onClick={tambahBuku}>
          + Tambah Buku
        </button>

        <div className="book-grid">
          {books.map((item) => (
            <article className="book-card" key={item.id}>
              <img src={item.image} alt={item.title} />

              <div className="book-card-body">
                <span className="book-category">
                  Tahun {item.year}
                </span>
                <h3>{item.title}</h3>
                <p>Oleh {item.author}</p>
                <p>{item.description}</p>

                <div className="book-card-bottom">
                  <strong>{item.year}</strong>
                  <button onClick={() => pilihBuku(item.id)}>
                    Lihat Detail
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function BookContent({ books, bukuTerpilih, kembali }) {
  const buku =
    books.find((item) => item.id === bukuTerpilih) || books[0];

  return (
    <section className="detail-page">
      <button className="back-button" onClick={kembali}>
        ← Kembali ke Home
      </button>

      <div className="detail-layout">
        <img src={buku.image} alt={buku.title} />

        <div>
          <span className="hero-label">Tahun {buku.year}</span>
          <h1>{buku.title}</h1>
          <p className="detail-author">
            Ditulis oleh {buku.author}
          </p>
          <p>{buku.description}</p>
          <h2 className="detail-price">{buku.year}</h2>

          <button
            className="signup-btn"
            onClick={() => alert(`Kamu memilih buku ${buku.title}`)}
          >
            Beli Sekarang
          </button>
        </div>
      </div>
    </section>
  );
}

function TeamContent() {
  const anggota = [
    {
      nama: 'Muhtari Anwar',
      jabatan: 'Web Developer',
      foto: '/images/anwar.jpeg',
    },
    {
      nama: 'Fadel Yihua',
      jabatan: 'Desain dan Konten',
      foto: '/images/fadel.jpg',
    },
    {
      nama: 'Ahmad Ghazy',
      jabatan: 'Pengelolaan Buku',
      foto: '/images/ghazy.jpg',
    },
  ];

  return (
    <section className="subpage">
      <span className="hero-label">DI BALIK BOOKSTORE</span>
      <h1>Kenalan dengan Tim Kami</h1>

      <p className="subpage-intro">
        Kami ingin membuat pengalaman menemukan buku menjadi lebih mudah,
        nyaman, dan menyenangkan bagi semua pembaca.
      </p>

      <div className="team-grid">
        {anggota.map((orang) => (
          <article className="team-card" key={orang.nama}>
            <img
              src={orang.foto}
              alt={`Foto ${orang.nama}`}
              className="team-avatar team-photo"
              onError={(event) => {
                event.currentTarget.style.display = 'none';
              }}
            />
            <h3>{orang.nama}</h3>
            <p>{orang.jabatan}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ContactContent() {
  function kirimPesan(event) {
    event.preventDefault();
    alert('Terima kasih! Pesan kamu berhasil disiapkan.');
    event.currentTarget.reset();
  }

  return (
    <section className="subpage contact-page">
      <span className="hero-label">KAMI SIAP MEMBANTU</span>
      <h1>Hubungi Bookstore</h1>

      <p className="subpage-intro">
        Punya pertanyaan atau saran tentang koleksi buku kami?
        Kirim pesan melalui formulir berikut.
      </p>

      <form className="contact-form" onSubmit={kirimPesan}>
        <label htmlFor="nama">Nama lengkap</label>
        <input
          id="nama"
          name="nama"
          type="text"
          placeholder="Masukkan nama kamu"
          required
        />

        <label htmlFor="email">Alamat email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="nama@email.com"
          required
        />

        <label htmlFor="pesan">Pesan</label>
        <textarea
          id="pesan"
          name="pesan"
          rows="5"
          placeholder="Tulis pesan kamu di sini..."
          required
        />

        <button className="signup-btn" type="submit">
          Kirim Pesan
        </button>
      </form>
    </section>
  );
}

function FooterContent() {
  return (
    <footer className="site-footer">
      <strong>▣ bookstore</strong>
      <p>Temukan buku, temukan cerita.</p>
      <small>© 2026 Bookstore. Dibuat oleh Muhtari Anwar.</small>
    </footer>
  );
}

function AppLayout() {
  const [books, setBooks] = useState(initialBooks);
  const [bukuTerpilih, setBukuTerpilih] = useState(initialBooks[0].id);
  const navigate = useNavigate();

  function bukaDetail(id) {
    setBukuTerpilih(id);
    navigate('/book');
    window.scrollTo(0, 0);
  }

  function kembaliHome() {
    navigate('/');
    window.scrollTo(0, 0);
  }

  function tambahBuku() {
    const title = prompt('Masukkan judul buku:');
    if (!title || !title.trim()) return;

    const author = prompt('Masukkan nama penulis:');
    if (!author || !author.trim()) return;

    const yearInput = prompt('Masukkan tahun terbit:', '2026');
    const year = Number(yearInput);

    if (!yearInput || !Number.isFinite(year) || year <= 0) {
      alert('Tahun terbit tidak valid.');
      return;
    }

    const newBook = {
      id: Date.now(),
      title: title.trim(),
      author: author.trim(),
      year,
      description: 'Buku baru dalam koleksi Bookstore.',
      image: 'https://placehold.co/300x400?text=Buku+Baru',
    };

    setBooks((currentBooks) => [...currentBooks, newBook]);
    alert('Buku berhasil ditambahkan!');
  }

  return (
    <div className="app-shell">
      <header className="bookstore-navbar">
        <div className="navbar-inner">
          <Link to="/" className="brand-logo">
            <span className="brand-icon">▣</span> bookstore
          </Link>

          <nav className="navbar-menu">
            <NavLink to="/" end
              className={({ isActive }) => isActive ? 'menu-current' : ''}>
              Home
            </NavLink>

            <NavLink to="/book"
              className={({ isActive }) => isActive ? 'menu-current' : ''}>
              Book
            </NavLink>

            <NavLink to="/team"
              className={({ isActive }) => isActive ? 'menu-current' : ''}>
              Team
            </NavLink>

            <NavLink to="/contact"
              className={({ isActive }) => isActive ? 'menu-current' : ''}>
              Contact
            </NavLink>
          </nav>

          <div className="navbar-actions">
            <button
              className="login-btn"
              onClick={() => alert('Fitur Login belum diaktifkan.')}
            >
              Login
            </button>

            <button
              className="signup-btn"
              onClick={() => alert('Fitur Register belum diaktifkan.')}
            >
              Register
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <AlbumContent
                books={books}
                tambahBuku={tambahBuku}
                pilihBuku={bukaDetail}
              />
            }
          />

          <Route
            path="/book"
            element={
              <BookContent
                books={books}
                bukuTerpilih={bukuTerpilih}
                kembali={kembaliHome}
              />
            }
          />

          <Route path="/team" element={<TeamContent />} />
          <Route path="/contact" element={<ContactContent />} />

          <Route
            path="*"
            element={
              <section className="subpage">
                <h1>Halaman tidak ditemukan</h1>
                <button className="signup-btn" onClick={kembaliHome}>
                  Kembali ke Home
                </button>
              </section>
            }
          />
        </Routes>
      </main>

      <FooterContent />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
