document.addEventListener("DOMContentLoaded", function() {
    // Elements
    const navMenuLinks = document.querySelectorAll('.nav-menu ul li a');
    const modal = document.querySelector('.modal');
    const closeModalBtn = document.querySelector('.modal-content .close');
    const modalButton = document.querySelector('.hero-section button');
    const chatButton = document.querySelector('#chatbotWindow');
    const chatbotCloseBtn = document.querySelector('#chatbotWindow .close');
    const languageSelector = document.querySelector('#languageSelector');
    const body = document.querySelector('body');

    // Navigation menu active link
    navMenuLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // Remove active class from all links
            navMenuLinks.forEach(link => link.classList.remove('active'));
            // Add active class to the clicked link
            event.target.classList.add('active');
        });
    });

    // Modal open/close functionality
    modalButton.addEventListener('click', function() {
        modal.style.display = 'flex';
    });

    closeModalBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Chatbot toggle visibility
    document.querySelector('.chatbot-toggle').addEventListener('click', function() {
        chatButton.style.display = (chatButton.style.display === 'none' || chatButton.style.display === '') ? 'block' : 'none';
    });

    // Close chatbot
    chatbotCloseBtn.addEventListener('click', function() {
        chatButton.style.display = 'none';
    });

    // Language switcher functionality
    languageSelector.addEventListener('change', function(event) {
        const selectedLanguage = event.target.value;
        changeLanguage(selectedLanguage);
    });

    // Function to change language
    function changeLanguage(language) {
        const texts = {
            en: {
                heroTitle: "Welcome to Our Website",
                heroSubtitle: "We provide the best services.",
                heroButton: "Get Started",
                modalTitle: "Thank You for Visiting",
                modalButton: "Close"
            },
            tr: {
                heroTitle: "Web Sitemize Hoş Geldiniz",
                heroSubtitle: "En iyi hizmeti sağlıyoruz.",
                heroButton: "Başlayın",
                modalTitle: "Ziyaretiniz İçin Teşekkürler",
                modalButton: "Kapat"
            }
        };

        const elements = {
            heroTitle: document.querySelector('.hero-section h2'),
            heroSubtitle: document.querySelector('.hero-section p'),
            heroButton: document.querySelector('.hero-section button'),
            modalTitle: document.querySelector('.modal-content h2'),
            modalButton: document.querySelector('.modal-content button')
        };

        const selectedTexts = texts[language] || texts.en;

        elements.heroTitle.textContent = selectedTexts.heroTitle;
        elements.heroSubtitle.textContent = selectedTexts.heroSubtitle;
        elements.heroButton.textContent = selectedTexts.heroButton;
        elements.modalTitle.textContent = selectedTexts.modalTitle;
        elements.modalButton.textContent = selectedTexts.modalButton;
    }

    // Initialize with default language (English)
    changeLanguage('en');
});


function updateCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    let totalPrice = 0;
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Sepetiniz boş.</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <p>${item.name} - ₺${item.price}</p>
                <button onclick="removeFromCart('${item.name}')">Çıkar</button>
            `;
            cartItems.appendChild(cartItem);
            totalPrice += item.price;
        });
    }
    // Sepet toplamını güncelle
    document.getElementById('totalPrice').innerText = totalPrice;
}


const shippingOptions = {
    'standard': 10,
    'express': 20,
    'overnight': 30
};

function updateShippingCost() {
    const shippingMethod = document.getElementById('shipping-method').value;
    const shippingCost = shippingOptions[shippingMethod];
    document.getElementById('shipping-cost').innerText = `Kargo Ücreti: ₺${shippingCost}`;
}

document.getElementById('shipping-method').addEventListener('change', updateShippingCost);


function completeOrder() {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const paymentMethod = document.getElementById('payment-method').value;

    if (name && address && paymentMethod) {
        alert('Ödeme işleminiz başarıyla tamamlandı! Siparişiniz onaylanmıştır.');
        // Sipariş sonrası işlemler (veri kaydetme, e-posta gönderme vb.) eklenebilir.
    } else {
        alert('Lütfen tüm bilgileri eksiksiz doldurun.');
    }
}
// Kayıt ve giriş sayfaları arasında geçiş yapma
function toggleSignup() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('signupModal').style.display = 'block';
}

function toggleLogin() {
    document.getElementById('signupModal').style.display = 'none';
    document.getElementById('loginModal').style.display = 'block';
}

// Modal kapama fonksiyonları
function closeModal() {
    document.getElementById('loginModal').style.display = 'none';
}

function closeSignup() {
    document.getElementById('signupModal').style.display = 'none';
}

// Kullanıcı girişi başarılı olduğunda kullanıcı panelini göster
function loginSuccess(name, email) {
    document.getElementById('userName').textContent = name;
    document.getElementById('userEmail').textContent = email;
    document.getElementById('userPanel').style.display = 'block';
    closeModal();  // Giriş modalını kapat
}

// Kullanıcı bilgilerini düzenleme
function editProfile() {
    const newName = prompt("Yeni adınızı girin:", document.getElementById('userName').textContent);
    const newEmail = prompt("Yeni e-posta adresinizi girin:", document.getElementById('userEmail').textContent);

    if (newName && newEmail) {
        document.getElementById('userName').textContent = newName;
        document.getElementById('userEmail').textContent = newEmail;
    }
}

// Çıkış yapma
function logout() {
    document.getElementById('userPanel').style.display = 'none';
    alert("Çıkış yapıldı.");
}
function showPasswordReset() {
    document.getElementById('passwordReset').style.display = 'block';
}

function closePasswordReset() {
    document.getElementById('passwordReset').style.display = 'none';
}
document.addEventListener("DOMContentLoaded", function() {
    let images = document.querySelectorAll("img.lazyload");
    let observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.src = entry.target.getAttribute("data-src");
                entry.target.classList.remove("lazyload");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    images.forEach(image => observer.observe(image));
});


document.addEventListener("DOMContentLoaded", function() {
    const backgroundDiv = document.querySelector('.background');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Arka plan resmini yükle
                const imageUrl = entry.target.getAttribute('data-src');
                entry.target.style.backgroundImage = `url(${imageUrl})`;
                observer.unobserve(entry.target); // Görüntü yüklendikten sonra gözlemciyi durdur
            }
        });
    }, { threshold: 0.1 });

    observer.observe(backgroundDiv);
});
document.getElementById('yorum-gonder').addEventListener('click', function() {
    var yorumMetni = document.getElementById('yorum-metni').value;
    var puan = document.getElementById('puan').value;
  
    // Yorum ve puanı veritabanına gönderme işlemi
    var formData = new FormData();
    formData.append('yorum_metni', yorumMetni);
    formData.append('puan', puan);
    formData.append('urun_id', 123); // Ürün ID'sini dinamik olarak alabilirsiniz
  
    fetch('/yorum-gonder.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if(data.success) {
        alert('Yorumunuz başarıyla gönderildi!');
        // Yorumları tekrar yükleyebiliriz
      } else {
        alert('Yorum gönderilemedi. Lütfen tekrar deneyin.');
      }
    });
  });
// Scroll ile animasyon başlatma
window.addEventListener('scroll', function () {
    const elements = document.querySelectorAll('.scroll-fade');
    elements.forEach((element) => {
      if (element.getBoundingClientRect().top < window.innerHeight) {
        element.classList.add('visible');
      }
    });
  });
    