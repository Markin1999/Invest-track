
# 📈 Invest Track

Sito web che ti permette di **monitorare i tuoi investimenti personali** in aziende, visualizzare statistiche, annotare eventi rilevanti e accedere alle ultime notizie aziendali tramite l'API di [Finnhub](https://finnhub.io).

---

## 🚀 Funzionalità principali

- ✅ Inserimento azienda, importo investito e quantità acquistata
- 🔢 Calcolo automatico del **prezzo medio** di acquisto
- 📊 Dashboard riepilogativa con:
  - Totale investito
  - Numero di aziende
  - Grafico della distribuzione
- 🔄 Modifica degli investimenti esistenti
- 📝 Diario personale per ogni azienda con note, commenti e pensieri strategici
- 📰 Integrazione con **Finnhub API** per visualizzare notizie reali e aggiornate sull’azienda
- 🔐 Gestione utenti (login & registrazione)
- 📱 Design responsive per utilizzo da smartphone

---

## 🧰 Stack Tecnologico

- **Frontend:** React + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** SQLite3 o PostgreSQL
- **API esterna:** [Finnhub.io](https://finnhub.io) (notizie aziendali)
- **Autenticazione:** JWT o sessioni (in base allo stack scelto)

---

## 📦 Installazione locale

```bash
git clone https://github.com/Markin1999/invest-track.git
cd invest-track
npm install
npm run dev

