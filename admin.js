/**
 * Jack's Grill - Admin Controller Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // Guard clause for authentication
  if (localStorage.getItem('jacks_grill_admin_authenticated') !== 'true') {
    window.location.replace('login.html');
    return;
  }

  // Baseline data structure representing the original Jack's Grill website
  const DEFAULT_DB = {
    business: {
      restaurantName: "Jack's Grill",
      tagline: "Family, Umdeni!",
      phone: "068 242 8640",
      whatsapp: "068 242 8640",
      address: "6 Staib Street, New Doornfontein, Johannesburg",
      hours: "Monday – Saturday: 09:00 – 21:00\nSunday & Holidays: 10:00 – 18:00",
      uberEats: "",
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      twitter: ""
    },
    theme: {
      logoLetter: "J",
      logoText: "JACK'S <span class=\"text-gold\">GRILL</span>",
      primaryColor: "#D8A234",
      secondaryColor: "#F59E0B",
      buttonColor: "#D8A234",
      fontFamily: "Outfit",
      faviconEmoji: "🔥",
      logoMode: "image",
      logoImage: "assets/images/logo.jpg"
    },
    homepage: {
      heroTitle: "JACK'S <span class=\"text-gradient\">GRILL</span>",
      heroSubtitle: "Family, Umdeni!",
      aboutTitle: "Where Family & Flavor Sizzle Together",
      aboutTagline: "\"Family, Umdeni!\"",
      aboutText1: "At Jack’s Grill, we don’t just serve meals; we craft communal culinary experiences. Nestled in the heart of New Doornfontein, Johannesburg, we have become the local benchmark for the ultimate South African grill, legendary Kasie Kotas, rich stews, and savory mince bunnies.",
      aboutText2: "Our philosophy is built entirely on the concept of \"Umdeni\" (Family). This means we cook every meal with the utmost respect, using premium fresh ingredients, hand-chopped toppings, and secret traditional spices. When you dine at Jack's, you're not just a customer—you're family.",
      aboutStatsNum: "100%",
      aboutStatsLabel: "Flame Grilled Taste",
      aboutStatsDesc: "Traditional wood and coal grill techniques handed down through generations.",
      gallery: [
        { image: "assets/images/hero_grill.jpg", category: "The Hearth", title: "Live Coal Flame-Grill" },
        { image: "assets/images/beef_stew.jpg", category: "Mains", title: "Tender Slow Stew" },
        { image: "assets/images/kasi_kota.jpg", category: "Local Specialties", title: "Ultimate Loaded Kota" },
        { image: "assets/images/mince_bunny.jpg", category: "Street Food", title: "Mince Bunny Chow" },
        { image: "assets/images/meat_platter.jpg", category: "Platas", title: "Steak + Chicken + Wors" },
        { image: "assets/images/bbq_wings.jpg", category: "Sides", title: "Wings & Shaker Fries" }
      ]
    },
    testimonials: [
      {
        author: "Lerato M.",
        role: "Local Resident — New Doornfontein",
        stars: 5,
        text: "The beef stew is out of this world! Melt-in-your-mouth beef, thick delicious gravy. It reminds me exactly of home cooking. Umdeni indeed!"
      },
      {
        author: "Sipho K.",
        role: "Kasi Food Enthusiast",
        stars: 5,
        text: "Hands down the best Kota in Johannesburg. The Russian sausage is juicy, the egg is perfectly soft-fried, and the cheese is beautifully melted."
      },
      {
        author: "Thabo N.",
        role: "Family Patriarch",
        stars: 5,
        text: "We ordered the massive R510 Family Feast for a Sunday gathering. The amount of quality steak, chicken, and wings we got was unbelievable. Highly recommend!"
      }
    ],
    menu: [
      {
        name: "Beef Stew",
        category: "mains",
        price: "R70",
        description: "Hearty, slow-simmered premium beef chunks in a thick, savory gravy. Served with Pap, Rice, or Samp.",
        image: "assets/images/beef_stew.jpg",
        isBestSeller: true,
        isSoldOut: false,
        badge: "Best Seller"
      },
      {
        name: "1/2 Chicken",
        category: "mains",
        price: "R70",
        description: "Sizzling flame-grilled half-chicken basted in Jack's signature smoky BBQ. Served with Pap, Rice, or Samp.",
        image: "assets/images/hero_grill.jpg",
        isBestSeller: false,
        isSoldOut: false,
        badge: "Hot off Coals"
      },
      {
        name: "2x Wors",
        category: "mains",
        price: "R70",
        description: "Double helpings of authentic, thick South African boerewors grilled over coals. Served with Pap, Rice, or Samp.",
        image: "assets/images/meat_platter.jpg",
        isBestSeller: false,
        isSoldOut: false,
        badge: ""
      },
      {
        name: "Steak",
        category: "mains",
        price: "R80",
        description: "A-grade tender beef steak grill-seared with traditional spice seasoning. Served with Pap, Rice, or Samp.",
        image: "assets/images/hero_grill.jpg",
        isBestSeller: false,
        isSoldOut: false,
        badge: "Prime Cut"
      },
      {
        name: "Chicken & Wors",
        category: "mains",
        price: "R100",
        description: "Gourmet dual feast of grilled quarter chicken and a juicy wors portion. Served with Pap, Rice, or Samp.",
        image: "assets/images/meat_platter.jpg",
        isBestSeller: false,
        isSoldOut: false,
        badge: ""
      },
      {
        name: "Steak & Wors",
        category: "mains",
        price: "R110",
        description: "Tender grilled sirloin steak combined with our traditional spiced boerewors. Served with Pap, Rice, or Samp.",
        image: "assets/images/meat_platter.jpg",
        isBestSeller: false,
        isSoldOut: false,
        badge: ""
      },
      {
        name: "Kasi Kota",
        category: "bunnies",
        price: "R45",
        description: "Classic quarter bread hollowed and loaded with golden fries, fried russian sausage, fried egg, cheese, and fresh kasi garnish.",
        image: "assets/images/kasi_kota.jpg",
        isBestSeller: false,
        isSoldOut: false,
        badge: "Joburg Favorite"
      },
      {
        name: "Mince Bunnye",
        category: "bunnies",
        price: "R40",
        description: "Traditional bunny chow loaded to overflowing with slow-simmered savory minced beef curry, topped with melted cheese and hand-cut chips.",
        image: "assets/images/mince_bunny.jpg",
        isBestSeller: false,
        isSoldOut: false,
        badge: "Traditional"
      },
      {
        name: "4 Full Wings",
        category: "wings",
        price: "R85",
        description: "Four crispy full-sized chicken wings flame-grilled and tossed in a sticky, sweet-and-smoky BBQ glaze. Served with golden fries.",
        image: "assets/images/bbq_wings.jpg",
        isBestSeller: false,
        isSoldOut: false,
        badge: "Gourmet Crisp"
      },
      {
        name: "Steak + Wings + Wors",
        category: "platters",
        price: "R160",
        description: "The local sharing favorite. Tender grilled steak, BBQ wings, and sizzled boerewors. Served with a mountain of hot Pap.",
        image: "assets/images/meat_platter.jpg",
        isBestSeller: false,
        isSoldOut: false,
        badge: "Perfect Sharing"
      },
      {
        name: "Steak + Chicken + Wors",
        category: "platters",
        price: "R210",
        description: "Satiating platter with rich tender steak, half flame-grilled chicken, and boerewors. Served with a generous portion of steaming Pap.",
        image: "assets/images/meat_platter.jpg",
        isBestSeller: false,
        isSoldOut: false,
        badge: ""
      },
      {
        name: "The Umdeni Feast",
        category: "platters",
        price: "R510",
        description: "Our ultimate family platter: 2x Steaks, 2x half Chickens, 2x portions of juicy Boerewors, and 2x crispy full Wings. Served with family-sized Pap.",
        image: "assets/images/meat_platter.jpg",
        isBestSeller: false,
        isSoldOut: false,
        badge: "Mega Family Feast"
      },
      {
        name: "Signature Fries",
        category: "fries",
        price: "R20 / R45",
        description: "Hand-cut, double-fried golden potato chips sprinkled with Jack's secret dry-rub kasi shaker seasoning.",
        image: "assets/images/bbq_wings.jpg",
        isBestSeller: false,
        isSoldOut: false,
        badge: ""
      },
      {
        name: "Chicken + Fries",
        category: "fries",
        price: "R80",
        description: "Golden flame-grilled chicken basted in spicy glaze and served with our generous signature rustic fries.",
        image: "assets/images/bbq_wings.jpg",
        isBestSeller: false,
        isSoldOut: false,
        badge: ""
      },
      {
        name: "Wings + Fries",
        category: "fries",
        price: "R70",
        description: "Glistening sticky-sweet BBQ grilled wings served hot with a heap of signature seasoned potato fries.",
        image: "assets/images/bbq_wings.jpg",
        isBestSeller: false,
        isSoldOut: false,
        badge: ""
      },
      {
        name: "Worse + Fries",
        category: "fries",
        price: "R65",
        description: "Thick traditional boerewors grilled over red-hot coals, paired beautifully with signature rustic fries.",
        image: "assets/images/meat_platter.jpg",
        isBestSeller: false,
        isSoldOut: false,
        badge: ""
      },
      {
        name: "Worse Roll + Fries",
        category: "fries",
        price: "R65",
        description: "Classic boerewors roll in a soft, fresh long bun drizzled with caramelised onions and sweet sauce, with side fries.",
        image: "assets/images/meat_platter.jpg",
        isBestSeller: false,
        isSoldOut: false,
        badge: "Value Meal"
      }
    ],
    specials: [
      {
        id: "special-1",
        name: "Kasi Kota & Fries Special",
        price: "R40.00",
        catchy: "Get our legendary quarter loaded kota for R5 less today!",
        image: "assets/images/kasi_kota.jpg"
      }
    ],
    credentials: {
      username: "admin",
      password: "JacksGrill2026"
    }
  };

  // State
  let currentDB = null;
  let activeImageSource = 'upload'; // upload or url
  let tempBase64Image = null;
  
  let logoActiveImageSource = 'upload'; // upload or url
  let logoTempBase64Image = null;

  // Initialize DB
  function initDatabase() {
    const saved = localStorage.getItem('jacks_grill_live_data');
    if (saved) {
      try {
        currentDB = JSON.parse(saved);
        // Fill any missing structural fields
        currentDB = { ...DEFAULT_DB, ...currentDB };
        if (currentDB.theme) {
          currentDB.theme = { ...DEFAULT_DB.theme, ...currentDB.theme };
        }
        if (!currentDB.specials) {
          currentDB.specials = [ ...DEFAULT_DB.specials ];
        }
        if (!currentDB.credentials) {
          currentDB.credentials = { ...DEFAULT_DB.credentials };
        }
      } catch (e) {
        currentDB = JSON.parse(JSON.stringify(DEFAULT_DB));
      }
    } else {
      currentDB = JSON.parse(JSON.stringify(DEFAULT_DB));
    }
  }

  initDatabase();

  // Navigation Tabs Handler
  const tabButtons = document.querySelectorAll('.sidebar-tab-btn');
  const panels = document.querySelectorAll('.admin-panel');
  const panelTitle = document.getElementById('currentPanelTitle');
  const panelSubtitle = document.getElementById('currentPanelSubtitle');

  const PANEL_INFO = {
    'dashboard-panel': { title: 'Dashboard Overview', sub: "Real-time status of Jack's Grill" },
    'menu-panel': { title: 'Menu Management', sub: 'Add, update, or delete culinary specialties' },
    'specials-panel': { title: 'Specials & Promotions', sub: 'Add or delete flame-grilled daily specials with catchy slogans' },
    'business-panel': { title: 'Business Profile', sub: 'Configure phone lines, hotlines, social profiles, and location assets' },
    'homepage-panel': { title: 'Homepage Content', sub: 'Edit text, reviews, and gallery listings' },
    'theme-panel': { title: 'Theme Settings', sub: 'Configure logos, font suites, and brand color swatches' },
    'security-panel': { title: 'Security & Login', sub: 'Update administrator login credentials securely' }
  };

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetId = btn.getAttribute('data-target');
      panels.forEach(p => p.classList.remove('active'));
      
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
        panelTitle.textContent = PANEL_INFO[targetId].title;
        panelSubtitle.textContent = PANEL_INFO[targetId].sub;
      }
    });
  });

  // Logout
  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('jacks_grill_admin_authenticated');
    window.location.replace('login.html');
  });

  // Reset to default settings
  document.getElementById('resetDefaultsBtn').addEventListener('click', () => {
    if (confirm('Are you absolutely sure you want to revert all custom changes back to the original Jack\'s Grill layout? This will clear all custom dishes.')) {
      currentDB = JSON.parse(JSON.stringify(DEFAULT_DB));
      saveToStorage(true);
      showToast('All changes reset to pristine default values!');
      renderAll();
    }
  });

  // Save changes button (Top bar)
  document.getElementById('saveGlobalBtn').addEventListener('click', () => {
    harvestFormValues();
    saveToStorage(true);
    showToast('Published live to Jack\'s Grill! Refresh public site to see updates.');
    updateStatsAndMeters();
    applyThemeToAdminShell();
  });

  // Storage and save
  function saveToStorage(publish = true) {
    localStorage.setItem('jacks_grill_live_data', JSON.stringify(currentDB));
    if (publish) {
      localStorage.setItem('jacks_grill_published_at', Date.now().toString());
    }
  }

  function showToast(msg) {
    const toast = document.getElementById('adminToast');
    const toastMsg = document.getElementById('toastMessage');
    toastMsg.textContent = msg;
    toast.classList.add('active');
    setTimeout(() => {
      toast.classList.remove('active');
    }, 3500);
  }

  // Calculate allocation percentage in LocalStorage
  function updateStatsAndMeters() {
    const dbString = JSON.stringify(currentDB);
    const byteLength = new Blob([dbString]).size;
    const maxKbytes = 5120; // ~5MB
    const percent = Math.min(((byteLength / (maxKbytes * 1024)) * 100), 100).toFixed(2);
    
    document.getElementById('storage-percentage').textContent = `${percent}%`;
    document.getElementById('storage-bar-fill').style.width = `${Math.max(parseFloat(percent), 1.5)}%`;

    // Stats
    document.getElementById('stat-total-items').textContent = currentDB.menu.length;
    document.getElementById('stat-best-sellers').textContent = currentDB.menu.filter(i => i.isBestSeller).length;
    document.getElementById('stat-sold-out').textContent = currentDB.menu.filter(i => i.isSoldOut).length;
  }

  // --- RENDER FUNCTIONS ---

  function applyThemeToAdminShell() {
    const t = currentDB.theme;
    if (!t) return;

    // Apply Logo Icon
    const logoIcons = document.querySelectorAll('.admin-sidebar .logo-icon');
    if (t.logoMode === 'image' && t.logoImage) {
      logoIcons.forEach(el => {
        el.innerHTML = `<img src="${t.logoImage}" alt="Logo" referrerpolicy="no-referrer" onerror="this.src='assets/images/logo.jpg'">`;
        el.classList.add('has-image');
      });
    } else {
      logoIcons.forEach(el => {
        el.textContent = t.logoLetter || "J";
        el.classList.remove('has-image');
      });
    }

    // Apply Logo Text
    if (t.logoText) {
      document.querySelectorAll('.admin-sidebar .logo-text').forEach(el => {
        el.innerHTML = t.logoText;
      });
    }

    // Apply Tagline
    if (currentDB.business && currentDB.business.tagline) {
      document.querySelectorAll('.admin-sidebar .logo-tagline').forEach(el => {
        el.textContent = currentDB.business.tagline;
      });
    }
  }

  function renderAll() {
    renderMenuTable();
    populateBusinessFields();
    populateHomepageFields();
    populateThemeFields();
    updateStatsAndMeters();
    renderSpecialsTable();
    populateSpecialsMenuSelect();
    applyThemeToAdminShell();
    populateSecurityFields();
  }

  // 1. Menu List Table
  const menuTableBody = document.getElementById('menuItemsTableBody');
  const menuSearch = document.getElementById('menuSearchInput');

  function renderMenuTable(filterText = '') {
    menuTableBody.innerHTML = '';
    
    const items = currentDB.menu.filter(item => {
      const matchName = item.name.toLowerCase().includes(filterText.toLowerCase());
      const matchCat = item.category.toLowerCase().includes(filterText.toLowerCase());
      return matchName || matchCat;
    });

    if (items.length === 0) {
      menuTableBody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; color: var(--light-grey); padding: 3rem;">
            No menu items found. Click "Add Menu Item" to get started!
          </td>
        </tr>
      `;
      return;
    }

    items.forEach((item, index) => {
      // Find exact index in original full DB array
      const fullIndex = currentDB.menu.indexOf(item);
      const row = document.createElement('tr');
      
      let badgeHTML = '';
      if (item.isSoldOut) {
        badgeHTML = '<span class="tbl-badge tbl-badge-soldout">Sold Out</span>';
      } else if (item.isBestSeller) {
        badgeHTML = '<span class="tbl-badge tbl-badge-seller">Best Seller</span>';
      } else {
        badgeHTML = '<span class="tbl-badge tbl-badge-active">Active</span>';
      }

      row.innerHTML = `
        <td>
          <img src="${item.image || 'assets/images/beef_stew.jpg'}" alt="${item.name}" class="tbl-food-img" onerror="this.src='assets/images/beef_stew.jpg'">
        </td>
        <td><strong>${item.name}</strong></td>
        <td><span class="font-mono text-gold" style="font-size:0.85rem">${item.category.toUpperCase()}</span></td>
        <td><strong>${item.price}</strong></td>
        <td>${item.isBestSeller ? '<i data-lucide="check" class="text-green"></i>' : '<span style="color:rgba(255,255,255,0.25)">-</span>'}</td>
        <td>${badgeHTML}</td>
        <td>
          <div class="row-actions">
            <button class="btn-icon edit-btn" data-index="${fullIndex}" title="Edit Item">
              <i data-lucide="edit-3"></i>
            </button>
            <button class="btn-icon delete-btn" data-index="${fullIndex}" title="Delete Item">
              <i data-lucide="trash-2"></i>
            </button>
          </div>
        </td>
      `;
      menuTableBody.appendChild(row);
    });

    // Reinitialize icons in newly added rows
    lucide.createIcons();
    attachTableActionListeners();
  }

  menuSearch.addEventListener('input', (e) => {
    renderMenuTable(e.target.value.trim());
  });

  // Add Item Dialog / Modal trigger
  const menuModal = document.getElementById('menuItemModal');
  const addMenuBtn = document.getElementById('addMenuItemBtn');
  const cancelModalBtn = document.getElementById('cancelModalBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const menuForm = document.getElementById('menuItemForm');
  const modalImagePreview = document.getElementById('modalImagePreview');

  function openMenuModal(index = -1) {
    menuForm.reset();
    tempBase64Image = null;
    
    if (index > -1) {
      // Edit mode
      const item = currentDB.menu[index];
      document.getElementById('modalTitle').textContent = 'Edit Menu Item';
      document.getElementById('menuItemIndex').value = index;
      document.getElementById('menuItemName').value = item.name;
      document.getElementById('menuItemPrice').value = item.price;
      document.getElementById('menuItemCategory').value = item.category;
      document.getElementById('menuItemBadge').value = item.badge || '';
      document.getElementById('menuItemDescription').value = item.description;
      document.getElementById('menuItemIsBestSeller').checked = item.isBestSeller;
      document.getElementById('menuItemIsSoldOut').checked = item.isSoldOut;
      
      tempBase64Image = item.image;
      modalImagePreview.src = item.image || '';
      document.getElementById('menuItemImageUrl').value = item.image.startsWith('data:') ? '' : item.image;
    } else {
      // Add mode
      document.getElementById('modalTitle').textContent = 'Add New Dish';
      document.getElementById('menuItemIndex').value = '';
      modalImagePreview.src = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><rect width=%22100%22 height=%22100%22 fill=%22%23222%22/><text x=%2250%%22 y=%2250%%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%23666%22>Preview</text></svg>';
    }

    menuModal.classList.add('active');
  }

  addMenuBtn.addEventListener('click', () => openMenuModal());
  document.getElementById('quickAddMenuBtn').addEventListener('click', () => {
    document.querySelector('.sidebar-tab-btn[data-target="menu-panel"]').click();
    openMenuModal();
  });

  // Modal close trigger
  [cancelModalBtn, closeModalBtn].forEach(b => {
    b.addEventListener('click', () => {
      menuModal.classList.remove('active');
    });
  });

  // Attach dynamic table actions
  function attachTableActionListeners() {
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.getAttribute('data-index'));
        openMenuModal(index);
      });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.getAttribute('data-index'));
        const item = currentDB.menu[index];
        if (confirm(`Are you sure you want to delete the dish "${item.name}"?`)) {
          currentDB.menu.splice(index, 1);
          saveToStorage();
          renderMenuTable();
          updateStatsAndMeters();
          showToast('Menu item deleted successfully!');
        }
      });
    });
  }

  // --- Image Selector Source Tabs ---
  const tabUpload = document.getElementById('btnSourceUpload');
  const tabUrl = document.getElementById('btnSourceUrl');
  const wrapUpload = document.getElementById('imgSourceUploadWrapper');
  const wrapUrl = document.getElementById('imgSourceUrlWrapper');

  tabUpload.addEventListener('click', () => {
    activeImageSource = 'upload';
    tabUpload.classList.add('img-src-tabactive');
    tabUrl.classList.remove('img-src-tabactive');
    wrapUpload.classList.remove('hidden');
    wrapUrl.classList.add('hidden');
  });

  tabUrl.addEventListener('click', () => {
    activeImageSource = 'url';
    tabUrl.classList.add('img-src-tabactive');
    tabUpload.classList.remove('img-src-tabactive');
    wrapUrl.classList.remove('hidden');
    wrapUpload.classList.add('hidden');
  });

  // Drag and Drop Base64 reader
  const fileInput = document.getElementById('menuItemImageFile');
  const dragDropArea = document.getElementById('dragDropArea');

  dragDropArea.addEventListener('click', () => fileInput.click());

  dragDropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dragDropArea.style.borderColor = 'var(--primary-gold)';
    dragDropArea.style.backgroundColor = 'rgba(216, 162, 52, 0.05)';
  });

  dragDropArea.addEventListener('dragleave', () => {
    dragDropArea.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    dragDropArea.style.backgroundColor = 'transparent';
  });

  dragDropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dragDropArea.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    dragDropArea.style.backgroundColor = 'transparent';
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFile(e.dataTransfer.files[0]);
    }
  });

  fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      handleImageFile(e.target.files[0]);
    }
  });

  function handleImageFile(file) {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }

    // Limit image size to prevent localStorage exhaustion
    if (file.size > 1500 * 1024) { // 1.5MB max size limit
      alert('File is too large! Please choose an image smaller than 1.5MB to preserve system persistence.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      tempBase64Image = e.target.result;
      modalImagePreview.src = tempBase64Image;
    };
    reader.readAsDataURL(file);
  }

  // Clear food image asset
  document.getElementById('btnClearImage').addEventListener('click', () => {
    tempBase64Image = '';
    modalImagePreview.src = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><rect width=%22100%22 height=%22100%22 fill=%22%23222%22/><text x=%2250%%22 y=%2250%%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%23666%22>No Image</text></svg>';
    document.getElementById('menuItemImageUrl').value = '';
  });

  // Preset URL trigger
  document.querySelectorAll('.preset-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      const url = tag.getAttribute('data-url');
      document.getElementById('menuItemImageUrl').value = url;
      tempBase64Image = url;
      modalImagePreview.src = url;
      showToast(`Selected Preset: ${tag.textContent}`);
    });
  });

  document.getElementById('menuItemImageUrl').addEventListener('input', (e) => {
    const url = e.target.value.trim();
    if (url) {
      tempBase64Image = url;
      modalImagePreview.src = url;
    }
  });

  // Submit Menu Item Form
  menuForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const indexStr = document.getElementById('menuItemIndex').value;
    const name = document.getElementById('menuItemName').value.trim();
    const price = document.getElementById('menuItemPrice').value.trim();
    const category = document.getElementById('menuItemCategory').value;
    const badge = document.getElementById('menuItemBadge').value.trim();
    const description = document.getElementById('menuItemDescription').value.trim();
    const isBestSeller = document.getElementById('menuItemIsBestSeller').checked;
    const isSoldOut = document.getElementById('menuItemIsSoldOut').checked;

    const dishData = {
      name,
      price,
      category,
      badge,
      description,
      isBestSeller,
      isSoldOut,
      image: tempBase64Image || 'assets/images/beef_stew.jpg'
    };

    if (indexStr) {
      // Edit
      const index = parseInt(indexStr);
      currentDB.menu[index] = dishData;
      showToast(`Successfully updated dish "${name}"!`);
    } else {
      // Add
      currentDB.menu.push(dishData);
      showToast(`Successfully added new dish "${name}"!`);
    }

    saveToStorage();
    renderMenuTable();
    updateStatsAndMeters();
    menuModal.classList.remove('active');
  });


  // 2. Business Settings Populator
  function populateBusinessFields() {
    const b = currentDB.business;
    document.getElementById('bizName').value = b.restaurantName || '';
    document.getElementById('bizTagline').value = b.tagline || '';
    document.getElementById('bizPhone').value = b.phone || '';
    document.getElementById('bizWhatsapp').value = b.whatsapp || '';
    document.getElementById('bizAddress').value = b.address || '';
    document.getElementById('bizHours').value = b.hours || '';
    document.getElementById('bizUberEats').value = b.uberEats || '';
    document.getElementById('bizFacebook').value = b.facebook || '';
    document.getElementById('bizInstagram').value = b.instagram || '';
    document.getElementById('bizTwitter').value = b.twitter || '';
  }

  // Quick Action hours trigger
  document.getElementById('quickEditHoursBtn').addEventListener('click', () => {
    document.querySelector('.sidebar-tab-btn[data-target="business-panel"]').click();
    setTimeout(() => {
      document.getElementById('bizHours').focus();
    }, 200);
  });

  // 3. Homepage Content Populator
  function populateHomepageFields() {
    const h = currentDB.homepage;
    document.getElementById('homeHeroTitle').value = h.heroTitle || '';
    document.getElementById('homeHeroSubtitle').value = h.heroSubtitle || '';
    document.getElementById('homeAboutTitle').value = h.aboutTitle || '';
    document.getElementById('homeAboutTagline').value = h.aboutTagline || '';
    document.getElementById('homeAboutText1').value = h.aboutText1 || '';
    document.getElementById('homeAboutText2').value = h.aboutText2 || '';
    document.getElementById('homeAboutStatsNum').value = h.aboutStatsNum || '';
    document.getElementById('homeAboutStatsLabel').value = h.aboutStatsLabel || '';
    document.getElementById('homeAboutStatsDesc').value = h.aboutStatsDesc || '';

    // Render reviews list
    renderTestimonialsAdmin();

    // Render gallery spots (6 items)
    renderGalleryAdmin();
  }

  // Reviews Administration module
  const tListContainer = document.getElementById('testimonialsListContainer');
  const tModal = document.getElementById('testimonialModal');
  const addTBtn = document.getElementById('addTestimonialBtn');
  const closeTBtn = document.getElementById('closeTModalBtn');
  const cancelTBtn = document.getElementById('cancelTModalBtn');
  const tForm = document.getElementById('testimonialForm');

  function renderTestimonialsAdmin() {
    tListContainer.innerHTML = '';
    currentDB.testimonials.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 't-admin-card';
      card.innerHTML = `
        <div class="t-admin-info">
          <div class="t-admin-meta">${item.author}</div>
          <div class="t-admin-role">${item.role}</div>
          <div class="t-admin-stars">${'⭐'.repeat(item.stars)}</div>
          <p class="t-admin-body">"${item.text}"</p>
        </div>
        <div class="row-actions">
          <button type="button" class="btn-icon edit-t-btn" data-index="${index}" title="Edit Review">
            <i data-lucide="edit-3"></i>
          </button>
          <button type="button" class="btn-icon delete-t-btn" data-index="${index}" title="Delete Review">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      `;
      tListContainer.appendChild(card);
    });

    lucide.createIcons();

    // Attach testimonial actions
    document.querySelectorAll('.edit-t-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.getAttribute('data-index'));
        const item = currentDB.testimonials[index];
        document.getElementById('tModalTitle').textContent = 'Edit Customer Review';
        document.getElementById('testimonialIndex').value = index;
        document.getElementById('tAuthor').value = item.author;
        document.getElementById('tRole').value = item.role;
        document.getElementById('tStars').value = item.stars.toString();
        document.getElementById('tText').value = item.text;
        tModal.classList.add('active');
      });
    });

    document.querySelectorAll('.delete-t-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.getAttribute('data-index'));
        const item = currentDB.testimonials[index];
        if (confirm(`Delete review from "${item.author}"?`)) {
          currentDB.testimonials.splice(index, 1);
          saveToStorage();
          renderTestimonialsAdmin();
          showToast('Review removed.');
        }
      });
    });
  }

  addTBtn.addEventListener('click', () => {
    tForm.reset();
    document.getElementById('tModalTitle').textContent = 'Add Customer Review';
    document.getElementById('testimonialIndex').value = '';
    tModal.classList.add('active');
  });

  [closeTBtn, cancelTBtn].forEach(b => {
    b.addEventListener('click', () => {
      tModal.classList.remove('active');
    });
  });

  tForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const indexStr = document.getElementById('testimonialIndex').value;
    const author = document.getElementById('tAuthor').value.trim();
    const role = document.getElementById('tRole').value.trim();
    const stars = parseInt(document.getElementById('tStars').value);
    const text = document.getElementById('tText').value.trim();

    const reviewData = { author, role, stars, text };

    if (indexStr) {
      currentDB.testimonials[parseInt(indexStr)] = reviewData;
      showToast('Review modified successfully!');
    } else {
      currentDB.testimonials.push(reviewData);
      showToast('Review added successfully!');
    }

    saveToStorage();
    renderTestimonialsAdmin();
    tModal.classList.remove('active');
  });


  // Gallery Manager spots populator
  const galleryGrid = document.getElementById('galleryManagerGrid');
  
  function renderGalleryAdmin() {
    galleryGrid.innerHTML = '';
    
    // Ensure 6 spots are configured
    if (!currentDB.homepage.gallery || currentDB.homepage.gallery.length < 6) {
      currentDB.homepage.gallery = JSON.parse(JSON.stringify(DEFAULT_DB.homepage.gallery));
    }

    currentDB.homepage.gallery.forEach((item, index) => {
      const spot = document.createElement('div');
      spot.className = 'g-admin-spot';
      spot.innerHTML = `
        <div class="g-admin-preview">
          <img src="${item.image}" alt="${item.title}" onerror="this.src='assets/images/hero_grill.jpg'">
          <span class="g-admin-num">Spot ${index + 1}</span>
        </div>
        <div class="form-group" style="margin-bottom:0.5rem">
          <label style="font-size:0.75rem">Image Path or URL</label>
          <input type="text" class="form-control g-img-input" data-index="${index}" value="${item.image}">
        </div>
        <div class="form-group" style="margin-bottom:0.5rem">
          <label style="font-size:0.75rem">Overlay Category</label>
          <input type="text" class="form-control g-cat-input" data-index="${index}" value="${item.category}">
        </div>
        <div class="form-group" style="margin-bottom:0">
          <label style="font-size:0.75rem">Overlay Title</label>
          <input type="text" class="form-control g-title-input" data-index="${index}" value="${item.title}">
        </div>
      `;
      galleryGrid.appendChild(spot);
    });
  }


  // 4. Theme settings populator
  let logoEditorInitialized = false;

  function initLogoEditorOnce() {
    if (logoEditorInitialized) return;
    logoEditorInitialized = true;

    const modeSelect = document.getElementById('themeLogoMode');
    const textGroup = document.getElementById('logoTextLetterGroup');
    const uploaderGroup = document.getElementById('logoImageUploaderGroup');

    // Toggle visibility function
    function toggleLogoModeUI() {
      const mode = modeSelect.value;
      if (mode === 'image') {
        textGroup.style.display = 'none';
        uploaderGroup.style.display = 'block';
      } else {
        textGroup.style.display = 'block';
        uploaderGroup.style.display = 'none';
      }
    }

    modeSelect.addEventListener('change', toggleLogoModeUI);

    // Logo image tabs switching
    const tabUpload = document.getElementById('logoBtnSourceUpload');
    const tabUrl = document.getElementById('logoBtnSourceUrl');
    const wrapUpload = document.getElementById('logoImgSourceUploadWrapper');
    const wrapUrl = document.getElementById('logoImgSourceUrlWrapper');

    tabUpload.addEventListener('click', () => {
      logoActiveImageSource = 'upload';
      tabUpload.classList.add('img-src-tabactive');
      tabUrl.classList.remove('img-src-tabactive');
      wrapUpload.classList.remove('hidden');
      wrapUrl.classList.add('hidden');
    });

    tabUrl.addEventListener('click', () => {
      logoActiveImageSource = 'url';
      tabUrl.classList.add('img-src-tabactive');
      tabUpload.classList.remove('img-src-tabactive');
      wrapUrl.classList.remove('hidden');
      wrapUpload.classList.add('hidden');
    });

    // File browser & Drag/Drop
    const fileInput = document.getElementById('themeLogoImageFile');
    const dragArea = document.getElementById('logoDragDropArea');

    dragArea.addEventListener('click', () => fileInput.click());

    dragArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      dragArea.style.borderColor = 'var(--primary-gold)';
      dragArea.style.backgroundColor = 'rgba(216, 162, 52, 0.05)';
    });

    dragArea.addEventListener('dragleave', () => {
      dragArea.style.borderColor = 'rgba(255, 255, 255, 0.1)';
      dragArea.style.backgroundColor = 'transparent';
    });

    dragArea.addEventListener('drop', (e) => {
      e.preventDefault();
      dragArea.style.borderColor = 'rgba(255, 255, 255, 0.1)';
      dragArea.style.backgroundColor = 'transparent';
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleLogoImageFile(e.dataTransfer.files[0]);
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        handleLogoImageFile(e.target.files[0]);
      }
    });

    function handleLogoImageFile(file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
      }
      if (file.size > 1500 * 1024) { // 1.5MB max
        alert('File is too large! Please choose an image smaller than 1.5MB to preserve system persistence.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        logoTempBase64Image = e.target.result;
        document.getElementById('themeLogoImagePreview').src = logoTempBase64Image;
      };
      reader.readAsDataURL(file);
    }

    // Direct url input
    const urlInput = document.getElementById('themeLogoImageUrl');
    urlInput.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      if (val) {
        logoTempBase64Image = val;
        document.getElementById('themeLogoImagePreview').src = val;
      }
    });

    // Preset / Reset button
    document.getElementById('logoPresetDefaultBtn').addEventListener('click', () => {
      const url = 'assets/images/logo.jpg';
      urlInput.value = url;
      logoTempBase64Image = url;
      document.getElementById('themeLogoImagePreview').src = url;
      showToast('Selected: Polished Monogram JG');
    });

    // Reset button inside preview frame
    document.getElementById('logoBtnClearImage').addEventListener('click', () => {
      const url = 'assets/images/logo.jpg';
      logoTempBase64Image = url;
      document.getElementById('themeLogoImagePreview').src = url;
      urlInput.value = url;
      showToast('Logo reset to default polished monogram');
    });
  }

  function populateThemeFields() {
    const t = currentDB.theme;
    
    document.getElementById('themePrimaryColor').value = t.primaryColor || '#D8A234';
    document.getElementById('themePrimaryColorPicker').value = t.primaryColor || '#D8A234';
    
    document.getElementById('themeSecondaryColor').value = t.secondaryColor || '#F59E0B';
    document.getElementById('themeSecondaryColorPicker').value = t.secondaryColor || '#F59E0B';
    
    document.getElementById('themeButtonColor').value = t.buttonColor || '#D8A234';
    document.getElementById('themeButtonColorPicker').value = t.buttonColor || '#D8A234';
    
    document.getElementById('themeFontFamily').value = t.fontFamily || 'Outfit';
    document.getElementById('themeFavicon').value = t.faviconEmoji || '🔥';
    document.getElementById('themeLogoLetter').value = t.logoLetter || 'J';
    document.getElementById('themeLogoText').value = t.logoText || '';

    // Image logo settings
    document.getElementById('themeLogoMode').value = t.logoMode || 'image';
    logoTempBase64Image = t.logoImage || 'assets/images/logo.jpg';
    document.getElementById('themeLogoImagePreview').src = logoTempBase64Image;
    document.getElementById('themeLogoImageUrl').value = logoTempBase64Image.startsWith('data:') ? '' : logoTempBase64Image;

    // Trigger mode visibility toggle
    initLogoEditorOnce();
    const modeSelect = document.getElementById('themeLogoMode');
    const textGroup = document.getElementById('logoTextLetterGroup');
    const uploaderGroup = document.getElementById('logoImageUploaderGroup');
    if (modeSelect.value === 'image') {
      textGroup.style.display = 'none';
      uploaderGroup.style.display = 'block';
    } else {
      textGroup.style.display = 'block';
      uploaderGroup.style.display = 'none';
    }

    // Color picker connection
    syncColorsWithPicker();
  }

  function syncColorsWithPicker() {
    const pInput = document.getElementById('themePrimaryColor');
    const pPicker = document.getElementById('themePrimaryColorPicker');
    const sInput = document.getElementById('themeSecondaryColor');
    const sPicker = document.getElementById('themeSecondaryColorPicker');
    const bInput = document.getElementById('themeButtonColor');
    const bPicker = document.getElementById('themeButtonColorPicker');

    pInput.addEventListener('input', (e) => {
      pPicker.value = e.target.value;
      document.getElementById('prev-swatch-prim').style.backgroundColor = e.target.value;
    });
    pPicker.addEventListener('input', (e) => {
      pInput.value = e.target.value;
      document.getElementById('prev-swatch-prim').style.backgroundColor = e.target.value;
    });

    sInput.addEventListener('input', (e) => {
      sPicker.value = e.target.value;
      document.getElementById('prev-swatch-sec').style.backgroundColor = e.target.value;
    });
    sPicker.addEventListener('input', (e) => {
      sInput.value = e.target.value;
      document.getElementById('prev-swatch-sec').style.backgroundColor = e.target.value;
    });

    bInput.addEventListener('input', (e) => {
      bPicker.value = e.target.value;
    });
    bPicker.addEventListener('input', (e) => {
      bInput.value = e.target.value;
    });
  }

  document.getElementById('quickThemeBtn').addEventListener('click', () => {
    document.querySelector('.sidebar-tab-btn[data-target="theme-panel"]').click();
  });


  // --- HARVEST VALUES ON SAVE ---
  function harvestFormValues() {
    // 1. Business
    currentDB.business.restaurantName = document.getElementById('bizName').value.trim();
    currentDB.business.tagline = document.getElementById('bizTagline').value.trim();
    currentDB.business.phone = document.getElementById('bizPhone').value.trim();
    currentDB.business.whatsapp = document.getElementById('bizWhatsapp').value.trim();
    currentDB.business.address = document.getElementById('bizAddress').value.trim();
    currentDB.business.hours = document.getElementById('bizHours').value.trim();
    currentDB.business.uberEats = document.getElementById('bizUberEats').value.trim();
    currentDB.business.facebook = document.getElementById('bizFacebook').value.trim();
    currentDB.business.instagram = document.getElementById('bizInstagram').value.trim();
    currentDB.business.twitter = document.getElementById('bizTwitter').value.trim();

    // 2. Homepage texts
    currentDB.homepage.heroTitle = document.getElementById('homeHeroTitle').value.trim();
    currentDB.homepage.heroSubtitle = document.getElementById('homeHeroSubtitle').value.trim();
    currentDB.homepage.aboutTitle = document.getElementById('homeAboutTitle').value.trim();
    currentDB.homepage.aboutTagline = document.getElementById('homeAboutTagline').value.trim();
    currentDB.homepage.aboutText1 = document.getElementById('homeAboutText1').value.trim();
    currentDB.homepage.aboutText2 = document.getElementById('homeAboutText2').value.trim();
    currentDB.homepage.aboutStatsNum = document.getElementById('homeAboutStatsNum').value.trim();
    currentDB.homepage.aboutStatsLabel = document.getElementById('homeAboutStatsLabel').value.trim();
    currentDB.homepage.aboutStatsDesc = document.getElementById('homeAboutStatsDesc').value.trim();

    // Harvest gallery grid inputs (6 items)
    const gallerySpots = [];
    for (let i = 0; i < 6; i++) {
      const img = document.querySelector(`.g-img-input[data-index="${i}"]`).value.trim();
      const cat = document.querySelector(`.g-cat-input[data-index="${i}"]`).value.trim();
      const title = document.querySelector(`.g-title-input[data-index="${i}"]`).value.trim();
      gallerySpots.push({ image: img, category: cat, title: title });
    }
    currentDB.homepage.gallery = gallerySpots;

    // 3. Theme elements
    currentDB.theme.primaryColor = document.getElementById('themePrimaryColor').value.trim();
    currentDB.theme.secondaryColor = document.getElementById('themeSecondaryColor').value.trim();
    currentDB.theme.buttonColor = document.getElementById('themeButtonColor').value.trim();
    currentDB.theme.fontFamily = document.getElementById('themeFontFamily').value;
    currentDB.theme.faviconEmoji = document.getElementById('themeFavicon').value;
    currentDB.theme.logoLetter = document.getElementById('themeLogoLetter').value.trim();
    currentDB.theme.logoText = document.getElementById('themeLogoText').value.trim();
    currentDB.theme.logoMode = document.getElementById('themeLogoMode').value;
    currentDB.theme.logoImage = logoTempBase64Image || 'assets/images/logo.jpg';
  }

  // Live website preview action button
  document.getElementById('quickViewSiteBtn').addEventListener('click', () => {
    window.open('index.html', '_blank');
  });

  // --- SPECIALS MANAGEMENT ---

  function populateSpecialsMenuSelect() {
    const select = document.getElementById('specialMenuSelect');
    if (!select) return;
    
    // Save current selection
    const currentVal = select.value;
    select.innerHTML = '<option value="">-- Choose a dish (Optional) --</option>';
    
    currentDB.menu.forEach(item => {
      const option = document.createElement('option');
      option.value = item.name;
      option.textContent = `${item.name} (${item.price})`;
      select.appendChild(option);
    });
    
    select.value = currentVal;
  }

  // Handle menu selection auto-fill
  const specialMenuSelect = document.getElementById('specialMenuSelect');
  if (specialMenuSelect) {
    specialMenuSelect.addEventListener('change', (e) => {
      const selectedName = e.target.value;
      if (!selectedName) return;
      
      const item = currentDB.menu.find(i => i.name === selectedName);
      if (item) {
        document.getElementById('specialName').value = item.name;
        document.getElementById('specialPrice').value = item.price;
        document.getElementById('specialImage').value = item.image || '';
        document.getElementById('specialCatchy').value = `Get our legendary ${item.name} on special today!`;
      }
    });
  }

  function renderSpecialsTable() {
    const tbody = document.getElementById('specialsTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (!currentDB.specials || currentDB.specials.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; color: var(--light-grey); padding: 3rem;">
            No active specials. Create one using the form on the left!
          </td>
        </tr>
      `;
      return;
    }
    
    currentDB.specials.forEach((special, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>
          <img src="${special.image || 'assets/images/meat_platter.jpg'}" alt="${special.name}" class="tbl-item-img" style="width: 48px; height: 48px; object-fit: cover; border-radius: 8px;" onerror="this.src='assets/images/meat_platter.jpg'">
        </td>
        <td><strong>${special.name}</strong></td>
        <td><span class="text-gold" style="font-weight: 600;">${special.price}</span></td>
        <td style="font-size: 0.85rem; max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${special.catchy}</td>
        <td style="text-align: right;">
          <button class="btn btn-secondary btn-icon-only delete-special-btn" data-id="${special.id}" title="Delete Special" style="padding: 0.4rem; border-radius: 6px; display: inline-flex; align-items: center; justify-content: center;">
            <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
          </button>
        </td>
      `;
      tbody.appendChild(row);
    });

    if (window.lucide) window.lucide.createIcons();

    // Attach delete handlers
    tbody.querySelectorAll('.delete-special-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.getAttribute('data-id');
        deleteSpecial(id);
      });
    });
  }

  function deleteSpecial(id) {
    if (confirm('Are you sure you want to delete this special promo? It will stop popping up on the website.')) {
      currentDB.specials = currentDB.specials.filter(s => s.id !== id);
      saveToStorage(true);
      showToast('Special promo deleted successfully.');
      renderSpecialsTable();
    }
  }

  // Handle specials form submit
  const addSpecialForm = document.getElementById('addSpecialForm');
  if (addSpecialForm) {
    addSpecialForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('specialName').value.trim();
      const price = document.getElementById('specialPrice').value.trim();
      const catchy = document.getElementById('specialCatchy').value.trim();
      const image = document.getElementById('specialImage').value.trim() || 'assets/images/meat_platter.jpg';
      
      const newSpecial = {
        id: 'special_' + Date.now(),
        name: name,
        price: price,
        catchy: catchy,
        image: image
      };
      
      if (!currentDB.specials) currentDB.specials = [];
      currentDB.specials.push(newSpecial);
      
      saveToStorage(true);
      showToast('Special promotion created and published live!');
      
      // Reset form
      addSpecialForm.reset();
      renderSpecialsTable();
    });
  }

  // --- SECURITY & LOGIN MANAGEMENT ---

  function populateSecurityFields() {
    const usernameInput = document.getElementById('adminUsernameInput');
    if (usernameInput && currentDB && currentDB.credentials) {
      usernameInput.value = currentDB.credentials.username || 'admin';
    }
  }

  const updateCredentialsForm = document.getElementById('updateCredentialsForm');
  if (updateCredentialsForm) {
    updateCredentialsForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const newUsername = document.getElementById('adminUsernameInput').value.trim();
      const currentPassword = document.getElementById('adminCurrentPasswordInput').value;
      const newPassword = document.getElementById('adminNewPasswordInput').value;
      const confirmPassword = document.getElementById('adminConfirmPasswordInput').value;

      if (!currentDB.credentials) {
        currentDB.credentials = { username: 'admin', password: 'JacksGrill2026' };
      }

      // Verify current password
      const savedPassword = currentDB.credentials.password || 'JacksGrill2026';
      if (currentPassword !== savedPassword) {
        alert('Incorrect current password! Please enter your active password to authenticate changes.');
        return;
      }

      // If new password fields are filled
      if (newPassword || confirmPassword) {
        if (newPassword !== confirmPassword) {
          alert('New passwords do not match! Please verify your spelling.');
          return;
        }
        if (newPassword.length < 4) {
          alert('New password is too short! Please use at least 4 characters.');
          return;
        }
        currentDB.credentials.password = newPassword;
      }

      currentDB.credentials.username = newUsername;
      
      // Save
      saveToStorage(true);
      showToast('Admin login credentials updated successfully!');
      
      // Clear password inputs
      document.getElementById('adminCurrentPasswordInput').value = '';
      document.getElementById('adminNewPasswordInput').value = '';
      document.getElementById('adminConfirmPasswordInput').value = '';

      // Refresh credentials state
      populateSecurityFields();
    });
  }

  // Render everything initial
  renderAll();
});
