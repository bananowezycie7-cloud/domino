// database.js
// Symulacja bazy danych w LocalStorage

const DB_KEY = 'neonwms_database_v1';

// Dane startowe (seed), jeśli baza jest pusta
const initialData = {
   // database.js

const initialData = {
    products: [
        // TU WKLEJASZ SWOJE DANE:
        { id: 1, name: "Nowy iPhone 15", category: "Telefon", quantity: 10, price: 5000.00, status: "ok" },
        { id: 2, name: "Samsung TV", category: "RTV", quantity: 2, price: 3200.00, status: "low" },
        { id: 3, name: "Kabel USB-C", category: "Akcesoria", quantity: 100, price: 20.00, status: "ok" }
        // Pamiętaj o przecinkach między klamrami { }!
    ],
};
    ],
    clients: [
        { id: 1, name: "TechSpire Sp. z o.o.", type: "B2B", nip: "525-000-11-22", address: "ul. Prosta 5, Warszawa", lastOrder: "2024-10-24", totalValue: 12500 },
        { id: 2, name: "Jan Kowalski", type: "B2C", nip: "-", address: "ul. Kwiatowa 7, Kraków", lastOrder: "2024-10-20", totalValue: 150 }
    ],
    settings: {
        emailNotifs: true,
        sounds: false,
        backup: true
    }
};

export const Database = {
    // Inicjalizacja bazy
    init() {
        if (!localStorage.getItem(DB_KEY)) {
            localStorage.setItem(DB_KEY, JSON.stringify(initialData));
            console.log("Baza danych zainicjowana domyślnymi danymi.");
        }
    },

    // Pobierz całą tabelę (np. 'products' lub 'clients')
    getAll(table) {
        const db = JSON.parse(localStorage.getItem(DB_KEY));
        return db[table] || [];
    },

    // Dodaj nowy rekord
    add(table, item) {
        const db = JSON.parse(localStorage.getItem(DB_KEY));
        if (!db[table]) db[table] = [];
        
        // Generowanie ID (proste auto-increment)
        const maxId = db[table].length > 0 ? Math.max(...db[table].map(i => i.id)) : 0;
        item.id = maxId + 1;
        
        db[table].push(item);
        this.save(db);
        return item;
    },

    // Usuń rekord
    delete(table, id) {
        const db = JSON.parse(localStorage.getItem(DB_KEY));
        if (!db[table]) return;
        
        db[table] = db[table].filter(item => item.id !== id);
        this.save(db);
    },

    // Zapisz zmiany w LocalStorage
    save(data) {
        localStorage.setItem(DB_KEY, JSON.stringify(data));
    },

    // Reset bazy do ustawień fabrycznych
    reset() {
        localStorage.setItem(DB_KEY, JSON.stringify(initialData));
        location.reload();
    },

    // Pobierz statystyki dla Dashboardu
    getStats() {
        const products = this.getAll('products');
        const totalItems = products.reduce((sum, item) => sum + parseInt(item.quantity), 0);
        const totalValue = products.reduce((sum, item) => sum + (parseFloat(item.price) * parseInt(item.quantity)), 0);
        
        return {
            totalItems,
            totalValue: totalValue.toFixed(2)
        };
    }
};

// Automatyczna inicjalizacja przy imporcie
Database.init();