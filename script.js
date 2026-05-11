const products = [
  {
    id: 1,
    category: 'shoes',
    title: 'Iron Run X1',
    description: 'Легкие беговые кроссовки с амортизацией и динамичным дизайном.',
    price: '8 490 ₽',
    image: 'https://static1.biotus.ua/media/optimization/catalog/product/1600/_/c/_creatine_monohydrate_gummies_complex_perfectfit365_120__jpg.webp',
    fullDescription: 'Профессиональные беговые кроссовки Iron Run X1 разработаны для спортсменов, ищущих идеальное сочетание скорости и комфорта. Оснащены передовой амортизацией и дышащим материалом.',
    specs: ['Вес: 260 гр', 'Размеры: 36-46', 'Материал: синтетика + сетка', 'Подошва: резина']
  },
  {
    id: 2,
    category: 'apparel',
    title: 'Компрессионный топ',
    description: 'Спортивный топ для тренировок и восстановления мышц.',
    price: '3 190 ₽',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
    fullDescription: 'Компрессионный топ обеспечивает оптимальную поддержку мышц во время тренировок и ускорит восстановление. Изготовлен из высокотехнологичной ткани.',
    specs: ['Размеры: XS-XL', 'Материал: нейлон 87%, спандекс 13%', 'УФ защита', 'Влагоотводящий']
  },
  {
    id: 3,
    category: 'gear',
    title: 'Функциональный рюкзак',
    description: 'Эргономичный рюкзак с отделениями для бутылки и ноутбука.',
    price: '4 750 ₽',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
    fullDescription: 'Многофункциональный рюкзак Iron Men идеально подходит для посещения спортзала, тренировок и путешествий. Прочный материал и эргономичная спинка.',
    specs: ['Объём: 25 литров', 'Материал: полиэстер 600D', 'Водоустойчив', 'Отделение для ноутбука до 17"']
  },
  {
    id: 4,
    category: 'shoes',
    title: 'Street Power',
    description: 'Кеды на каждый день, которые выдерживают активный ритм.',
    price: '6 290 ₽',
    image: 'https://images.unsplash.com/photo-1518894917744-24ae2b16ef32?w=400&h=300&fit=crop',
    fullDescription: 'Стильные и удобные кеды Street Power подойдут как для спортзала, так и для повседневной носки. Прочная подошва и стильный дизайн.',
    specs: ['Размеры: 36-46', 'Материал: холст + резина', 'Классический дизайн', 'Отличная вентиляция']
  },
  {
    id: 5,
    category: 'apparel',
    title: 'Тренировочные штаны',
    description: 'Эластичные штаны с вентиляцией для любых нагрузок.',
    price: '3 950 ₽',
    image: 'https://images.unsplash.com/photo-1506629082632-33d8e5d6626a?w=400&h=300&fit=crop',
    fullDescription: 'Удобные и стильные тренировочные штаны с высокой эластичностью и вентиляцией. Идеальны для интенсивных тренировок и занятий спортом.',
    specs: ['Размеры: XS-XL', 'Материал: полиэстер 88%, спандекс 12%', 'Эластичный пояс', 'Карманы']
  },
  {
    id: 6,
    category: 'gear',
    title: 'Защитные перчатки',
    description: 'Легкие перчатки с усиленной ладонью для тренировок.',
    price: '2 250 ₽',
    image: 'https://images.unsplash.com/photo-1572457897716-36f6e8c18d2b?w=400&h=300&fit=crop',
    fullDescription: 'Профессиональные защитные перчатки с усиленной ладонью для безопасных тренировок. Дышащий материал и прочная конструкция.',
    specs: ['Размеры: S, M, L, XL', 'Материал: неопрен + синтетика', 'Усиленная ладонь', 'Антибактериальная']
  },
];

const productGrid = document.getElementById('productGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');

function createProductCard(product) {
  const card = document.createElement('article');
  card.className = 'product-card animate-on-scroll';
  card.dataset.category = product.category;
  card.innerHTML = `
    <div class="product-media" style="background-image: url('${product.image}')"></div>
    <div class="product-info">
      <p class="product-category">${product.category}</p>
      <h3 class="product-title">${product.title}</h3>
      <p class="product-description">${product.description}</p>
      <div class="product-bottom">
        <span class="price">${product.price}</span>
        <button class="add-btn" type="button">Купить</button>
      </div>
      <button class="details-btn" data-product-id="${product.id}" type="button">Подробнее</button>
    </div>
  `;
  return card;
}

function renderProducts(filter = 'all') {
  productGrid.innerHTML = '';
  const filtered = products.filter((item) => filter === 'all' || item.category === filter);
  filtered.forEach((product) => productGrid.appendChild(createProductCard(product)));
  attachDetailsButtons();
  observeScrollAnimations();
}

function attachDetailsButtons() {
  const detailsButtons = document.querySelectorAll('.details-btn');
  detailsButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const productId = parseInt(e.target.dataset.productId);
      const product = products.find((p) => p.id === productId);
      if (product) openModal(product);
    });
  });
}

function openModal(product) {
  const modal = document.getElementById('productModal');
  const modalContent = document.querySelector('.modal-content');
  
  modalContent.innerHTML = `
    <button class="modal-close" aria-label="Закрыть">✕</button>
    <div class="modal-body">
      <div class="modal-image-wrapper">
        <img src="${product.image}" alt="${product.title}" class="modal-image" />
      </div>
      <div class="modal-details">
        <h2 class="modal-title">${product.title}</h2>
        <p class="modal-price">${product.price}</p>
        <p class="modal-full-desc">${product.fullDescription}</p>
        <div class="modal-specs">
          <h3>Характеристики:</h3>
          <ul>
            ${product.specs.map((spec) => `<li>${spec}</li>`).join('')}
          </ul>
        </div>
        <button class="btn btn-primary" type="button">Добавить в корзину</button>
      </div>
    </div>
  `;
  
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  
  const closeBtn = modalContent.querySelector('.modal-close');
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

function closeModal() {
  const modal = document.getElementById('productModal');
  modal.classList.remove('open');
  document.body.style.overflow = 'auto';
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    renderProducts(button.dataset.filter);
  });
});

mobileToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
  });
});

function observeScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.2 }
  );

  elements.forEach((element) => observer.observe(element));
}

renderProducts();
observeScrollAnimations();
