// config.js
window.CONFIG = {
  // Store Details
  storeName: "Toko Rere", // Full Store Name
  shortStoreName: "Toko Rere",
  storeSubtitle: "⠀hello selamat datang di Toko manies ku, kami akan melayani sepenuh hati dari pukul 08.00 - 22.00 Wib. terpercaya sejak 2021 ♡",
  whatsappNumber: "6281350758516", // Format: 62xxxxxxxxxx (no + or spaces)
  telegramUsername: "Mavhdu",
  telegramLink: "https://t.me/rainstoreproof",
  websiteUrl: "",
  emailAdmin: "tokobyreree@gmail.com",
  workHours: "08:00 – 23:00 WITA",
  location: "Indonesia",
  qrisImagePath: "qris.png", // Path or URL to QRIS payment image

  // Google Sheets Config (for index.html)
  sheetIdProducts: "1S_Qx2ESPq4LzHSBMhvchRF0EkHaQR1fSDtfx9e_vM9w",
  sheetNameProducts: "Produk",
  sheetNameInfo: "informasi_modal",
  sheetNameTnc: "tnc", // Tab untuk Terms & Conditions (Kolom A: judul, Kolom B: deskripsi)

  // Theme Config
  // Options: "peony" (default), "green", "blue", "purple", "orange", "red", "custom"
  activeTheme: "custom",

  // Custom Theme Colors (Only used if activeTheme is set to "custom")
  customTheme: {
    primary: "#fcb7ce",       // Soft Pink Utama
    primaryHover: "#f29eb9",  // Pink Hover
    primaryLight: "#fde8ef",  // Pink Light
    secondary: "#fcb7ce",     // Secondary Color
    accent: "#FFD13B"         // Yellow Accent
  }
};

// Apply theme dynamically as early as possible
applyDynamicTheme();

// Automatic replacement on page load
document.addEventListener("DOMContentLoaded", () => {
  applyDynamicBranding();
});

function applyDynamicTheme() {
  const cfg = window.CONFIG;
  if (!cfg) return;

  const themes = {
    peony: {
      primary: "#CB96BA",
      primaryHover: "#B881A6",
      primaryLight: "#F0E2EB",
      secondary: "#B0B3D6",
      accent: "#D0DDC4"
    },
    green: {
      primary: "#00AA5B",
      primaryHover: "#03ac0e",
      primaryLight: "#e8f8f0",
      secondary: "#00c853",
      accent: "#ff5722"
    },
    blue: {
      primary: "#0084FF",
      primaryHover: "#006fe6",
      primaryLight: "#e6f7ff",
      secondary: "#00b8ff",
      accent: "#ff4d4f"
    },
    purple: {
      primary: "#7c3aed",
      primaryHover: "#6d28d9",
      primaryLight: "#f5f3ff",
      secondary: "#a855f7",
      accent: "#10b981"
    },
    orange: {
      primary: "#ff5722",
      primaryHover: "#f4511e",
      primaryLight: "#fff3e0",
      secondary: "#ff9800",
      accent: "#29b6f6"
    },
    red: {
      primary: "#e11d48",
      primaryHover: "#be123c",
      primaryLight: "#fff1f2",
      secondary: "#f43f5e",
      accent: "#eab308"
    }
  };

  let activeThemeColors = themes[cfg.activeTheme || "green"];

  // Fallback to custom theme if selected
  if (cfg.activeTheme === "custom" && cfg.customTheme) {
    activeThemeColors = {
      primary: cfg.customTheme.primary || "#00AA5B",
      primaryHover: cfg.customTheme.primaryHover || "#03ac0e",
      primaryLight: cfg.customTheme.primaryLight || "#e8f8f0",
      secondary: cfg.customTheme.secondary || cfg.customTheme.accent || "#00c853",
      accent: cfg.customTheme.accent || "#ff5722"
    };
  }

  if (activeThemeColors) {
    const secondaryColor = activeThemeColors.secondary || activeThemeColors.accent || activeThemeColors.primary;
    const css = `
      :root {
        --primary-color: ${activeThemeColors.primary} !important;
        --primary-color-hover: ${activeThemeColors.primaryHover} !important;
        --primary-light: ${activeThemeColors.primaryLight} !important;
        --secondary-color: ${secondaryColor} !important;
        --accent-color: ${activeThemeColors.accent} !important;
        --accent: ${activeThemeColors.primary} !important;
        --accent-2: ${secondaryColor} !important;
        --success-color: ${activeThemeColors.primary} !important;
        --gradient-primary: linear-gradient(135deg, ${activeThemeColors.primary} 0%, ${secondaryColor} 100%) !important;
        --gradient-accent: linear-gradient(135deg, ${activeThemeColors.accent} 0%, ${activeThemeColors.primary} 100%) !important;
        --bs-primary: ${activeThemeColors.primary} !important;
        --bs-primary-rgb: ${hexToRgb(activeThemeColors.primary)} !important;
        --bs-success: ${activeThemeColors.primary} !important;
        --bs-success-rgb: ${hexToRgb(activeThemeColors.primary)} !important;
      }

      .btn-primary,
      .btn-success {
        --bs-btn-bg: ${activeThemeColors.primary} !important;
        --bs-btn-border-color: ${activeThemeColors.primary} !important;
        --bs-btn-hover-bg: ${activeThemeColors.primaryHover} !important;
        --bs-btn-hover-border-color: ${activeThemeColors.primaryHover} !important;
        --bs-btn-active-bg: ${activeThemeColors.primaryHover} !important;
        --bs-btn-active-border-color: ${activeThemeColors.primaryHover} !important;
      }

      .btn-outline-primary {
        --bs-btn-color: ${activeThemeColors.primary} !important;
        --bs-btn-border-color: ${activeThemeColors.primary} !important;
        --bs-btn-hover-bg: ${activeThemeColors.primary} !important;
        --bs-btn-hover-border-color: ${activeThemeColors.primary} !important;
      }

      .text-success,
      .text-primary {
        color: ${activeThemeColors.primary} !important;
      }

      .bg-success,
      .bg-primary {
        background-color: ${activeThemeColors.primary} !important;
      }
    `;
    const styleEl = document.createElement("style");
    styleEl.id = "dynamic-theme-style";
    styleEl.innerHTML = css;
    if (document.head) {
      document.head.appendChild(styleEl);
    } else {
      document.addEventListener("DOMContentLoaded", () => {
        document.head.appendChild(styleEl);
      });
    }
  }
}

function hexToRgb(hex) {
  const normalized = String(hex || "").replace("#", "").trim();
  if (!/^[0-9a-f]{6}$/i.test(normalized)) return "0, 170, 91";
  const value = parseInt(normalized, 16);
  return `${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}`;
}

function applyDynamicBranding() {
  // Hanya menerapkan sinkronisasi minimal jika elemen belum diset di HTML
  const cfg = window.CONFIG;
  if (!cfg) return;

  // Update QRIS images jika ada
  if (cfg.qrisImagePath) {
    const qrisImages = document.querySelectorAll('img[src="qris.png"], img[alt*="QRIS"]');
    qrisImages.forEach(img => {
      img.src = cfg.qrisImagePath;
    });
  }

  // Update href tombol WA/Telegram jika masih '#'
  const waBtns = document.querySelectorAll('#tncWaBtn, .footer-wa-btn');
  waBtns.forEach(btn => {
    if (btn && (btn.getAttribute('href') === '#' || !btn.getAttribute('href')) && cfg.whatsappNumber) {
      btn.href = `https://wa.me/${String(cfg.whatsappNumber).replace(/[^0-9]/g, '')}`;
    }
  });

  const teleBtns = document.querySelectorAll('#tncTeleBtn, .footer-tele-btn');
  teleBtns.forEach(btn => {
    if (btn && (btn.getAttribute('href') === '#' || !btn.getAttribute('href')) && (cfg.telegramLink || cfg.telegramUsername)) {
      btn.href = cfg.telegramLink || `https://t.me/${cfg.telegramUsername}`;
    }
  });

  const footerYear = document.getElementById('footerYear');
  if (footerYear && !footerYear.textContent.trim()) {
    footerYear.textContent = new Date().getFullYear();
  }
}

// Export function globally
window.applyDynamicBranding = applyDynamicBranding;
