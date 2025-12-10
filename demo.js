/**
 * demo.js
 * Plik "Backendowy" - zawiera dane i logikę biznesową.
 * Obsługuje zarówno Klientów (CRM) jak i Magazyn (WMS).
 */

// ==========================================
// SEKCJA 1: KLIENCI (CRM) - Nie ruszamy tego
// ==========================================

const mockClients = [
  {
    id: 1,
    firstName: "Anna",
    lastName: "Nowak",
    email: "anna.nowak@przyklad.pl",
    phone: "+48 600 111 222",
    company: "SoftPol Sp. z o.o.",
    city: "Warszawa",
    status: "active",
    registeredAt: "2023-01-15",
    avatar: "https://ui-avatars.com/api/?name=Anna+Nowak&background=0D8ABC&color=fff"
  },
  {
    id: 2,
    firstName: "Piotr",
    lastName: "Kowalski",
    email: "p.kowalski@demo.com",
    phone: "+48 501 234 567",
    company: "Bud-Max",
    city: "Kraków",
    status: "inactive",
    registeredAt: "2023-02-20",
    avatar: "https://ui-avatars.com/api/?name=Piotr+Kowalski&background=random"
  },
  {
    id: 3,
    firstName: "Katarzyna",
    lastName: "Wiśniewska",
    email: "k.wisniewska@test.pl",
    phone: "+48 790 987 654",
    company: "Kancelaria Prawna Lex",
    city: "Gdańsk",
    status: "active",
    registeredAt: "2023-03-10",
    avatar: "https://ui-avatars.com/api/?name=Katarzyna+Wisniewska&background=random"
  },
  {
    id: 4,
    firstName: "Michał",
    lastName: "Wójcik",
    email: "m.wojcik@firma.pl",
    phone: "+48 666 555 444",
    company: "Wójcik Transport",
    city: "Wrocław",
    status: "pending",
    registeredAt: "2023-04-05",
    avatar: "https://ui-avatars.com/api/?name=Michal+Wojcik&background=random"
  },
  {
    id: 5,
    firstName: "Agnieszka",
    lastName: "Kamińska",
    email: "a.kaminska@webmail.pl",
    phone: "+48 505 333 999",
    company: null,
    city: "Poznań",
    status: "active",
    registeredAt: "2023-05-12",
    avatar: "https://ui-avatars.com/api/?name=Agnieszka+Kaminska&background=random"
  },
  {
    id: 6,
    firstName: "Tomasz",
    lastName: "Lewandowski",
    email: "tomek.lew@tech.pl",
    phone: "+48 601 202 303",
    company: "Tech Start",
    city: "Lublin",
    status: "active",
    registeredAt: "2023-06-01",
    avatar: "https://ui-avatars.com/api/?name=Tomasz+Lewandowski&background=random"
  }
];

export const ClientService = {
  getAll: () => [...mockClients],
  getById: (id) => mockClients.find(client => client.id === id),
  getActive: () => mockClients.filter(client => client.status === "active"),
  search: (query) => {
    const lowerQuery = query.toLowerCase();
    return mockClients.filter(client => 
      client.lastName.toLowerCase().includes(lowerQuery) ||
      (client.company && client.company.toLowerCase().includes(lowerQuery))
    );
  },
  add: (newClient) => {
    const newId = mockClients.length > 0 ? Math.max(...mockClients.map(c => c.id)) + 1 : 1;
    const clientWithId = { ...newClient, id: newId, registeredAt: new Date().toISOString().split('T')[0] };
    mockClients.push(clientWithId);
    return clientWithId;
  },
  delete: (id) => {
    const index = mockClients.findIndex(c => c.id === id);
    if (index > -1) {
      mockClients.splice(index, 1);
      return true;
    }
    return false;
  }
};

// ==========================================
// SEKCJA 2: MAGAZYN (WMS) - Nowe dane dla Twojego HTML
// ==========================================

// Dane początkowe dla Inventory
const initialInventory = [
    { id: 101, name: "Laptop Gamingowy Dell", category: "Elektronika", quantity: 5, price: 4500.00, status: "ok" },
    { id: 102, name: "Kabel HDMI 2m", category: "Akcesoria", quantity: 150, price: 25.00, status: "ok" },
    { id: 103, name: "Mysz Bezprzewodowa", category: "Akcesoria", quantity: 8, price: 120.00, status: "low" },
    { id: 104, name: "Karta Graficzna RTX 4070", category: "Części", quantity: 2, price: 2800.00, status: "low" },
    { id: 105, name: "Monitor 27 cali 4K", category: "Elektronika", quantity: 12, price: 1600.00, status: "ok" }
];

// Kopia robocza (state)
let mockInventory = [...initialInventory];

export const InventoryService = {
    // Pobierz wszystko
    getAll: () => {
        return [...mockInventory];
    },

    // Dodaj produkt
    add: (product) => {
        const newId = mockInventory.length > 0 ? Math.max(...mockInventory.map(p => p.id)) + 1 : 101;
        
        // Logika statusu
        let status = 'ok';
        if (product.quantity < 10) status = 'low';

        const newProduct = { 
            ...product, 
            id: newId, 
            price: parseFloat(product.price),
            quantity: parseInt(product.quantity),
            status: status 
        };
        mockInventory.push(newProduct);
        return newProduct;
    },

    // Usuń produkt
    delete: (id) => {
        mockInventory = mockInventory.filter(item => item.id !== id);
        return true;
    },

    // Statystyki
    getStats: () => {
        const totalItems = mockInventory.reduce((acc, item) => acc + item.quantity, 0);
        const totalValue = mockInventory.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        return {
            totalItems,
            totalValue: totalValue.toFixed(2)
        };
    },

    // Reset danych (do przycisku Reset)
    reset: () => {
        mockInventory = [...initialInventory];
        return mockInventory;
    }
};

// Domyślny eksport (dla kompatybilności wstecznej)
export default { clients: mockClients, inventory: mockInventory };