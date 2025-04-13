export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-4 mt-10 shadow-inner">
      <div className="container mx-auto text-center">
        <p className="text-sm sm:text-base">
          © {new Date().getFullYear()} Marco Filannino — Tutti i diritti
          riservati 💻
        </p>
      </div>
    </footer>
  );
}
