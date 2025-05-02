const header = document.getElementById('header');
const target = document.getElementById('target');

let isIntersecting = false;

const observer = new IntersectionObserver(([entry]) => {
  isIntersecting = entry.isIntersecting;
  updateHeader();
}, {
  threshold: 0.1
});

observer.observe(target);

function updateHeader() {
  if (isIntersecting && window.scrollY > 0) {
    header.classList.add('active');
  } else {
    header.classList.remove('active');
  }
}

window.addEventListener('scroll', updateHeader);




const container = document.querySelector('.scroll-container');
const cards = Array.from(container.children);

// Генерируем случайный угол поворота от -12 до +12
function getRandomRotation() {
  return Math.floor(Math.random() * 50) - 12;
}

// Применяем случайные повороты и клонируем карточки
cards.forEach(card => {
  const rotation = getRandomRotation();
  card.style.transform = `rotate(${rotation}deg)`;

  const clone = card.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  clone.style.transform = `rotate(${getRandomRotation()}deg)`;
  container.appendChild(clone);
});

// Функция для обновления скорости анимации на основе ширины экрана
function updateScrollSpeed() {
  const containerWidth = container.offsetWidth;
  const baseSpeed = 50; // скорость прокрутки в пикселях в секунду
  const duration = containerWidth / baseSpeed;

  const minDuration = 8; // минимальная продолжительность анимации
  const maxDuration = 35; // максимальная продолжительность анимации
  const finalDuration = Math.min(Math.max(duration, minDuration), maxDuration);

  const adjustmentFactor = window.innerWidth > 1400 ? 0.998 : 0.999;
  container.style.animationDuration = finalDuration * adjustmentFactor + "s";
}

// Обновляем анимацию при загрузке, изменении размера окна и ориентации экрана
window.addEventListener("load", updateScrollSpeed);
window.addEventListener("resize", updateScrollSpeed);
window.addEventListener("orientationchange", updateScrollSpeed);

// Анимация для бесконечного скроллинга
function startInfiniteScroll() {
  const maxScroll = container.scrollWidth - container.clientWidth;
  container.style.animation = `scrollLeft infinite ${container.style.animationDuration} linear`;

  // Делаем зацикливание прокрутки
  container.addEventListener('scroll', () => {
    if (container.scrollLeft >= maxScroll) {
      container.scrollLeft = 0;
    }
  });
}

// Инициализируем анимацию
startInfiniteScroll();


const projects = document.querySelectorAll('.project');
const wrapper = document.querySelector('.project-wrapper');

const wrapperWidth = wrapper.clientWidth;
const wrapperHeight = wrapper.clientHeight;

projects.forEach(project => {
  const projectWidth = project.offsetWidth;
  const projectHeight = project.offsetHeight;

  const x = Math.random() * (wrapperWidth - projectWidth);
  const y = Math.random() * (wrapperHeight - projectHeight);
  const scale = 0.8 + Math.random() * 0.6;

  project.style.left = `${x}px`;
  project.style.top = `${y}px`;
  project.style.transform = `scale(${scale})`;
  project.dataset.scale = scale;
});



// Add this code to your existing JavaScript or replace the dock-related code

document.addEventListener('DOMContentLoaded', function () {
  const projects = document.querySelectorAll('.project');
  let activeProject = null;
  let initialX, initialY;
  let zIndexCounter = 10;

  // Create container for dock icons at the bottom
  const iconDock = document.createElement('div');
  iconDock.className = 'app-dock';
  document.querySelector('.project-wrapper').appendChild(iconDock);

  // Add reset button
  const resetButton = document.createElement('button');
  resetButton.className = 'reset-button';
  resetButton.innerHTML = '↻';
  resetButton.title = 'Reset all projects';
  iconDock.appendChild(resetButton);

  // Function to randomize project positions
  function randomizeProjectPositions() {
    projects.forEach((project) => {
      const wrapper = document.querySelector('.project-wrapper');
      const wrapperWidth = wrapper.clientWidth;
      const wrapperHeight = wrapper.clientHeight;

      // Set random width between 200px and 400px
      const randomWidth = 350 + Math.floor(Math.random() * 1);


      project.style.width = `${randomWidth}px`;

      // const randomHeight = 350 + Math.floor(Math.random() * 1);
      // project.style.height = `${randomHeight}px`;

      // Use header height for proper constraints
      const headerHeight = project.querySelector('.head').offsetHeight;

      const maxX = wrapperWidth - project.offsetWidth;
      const maxY = wrapperHeight - headerHeight;

      const x = Math.random() * maxX;
      const y = Math.random() * maxY;
      const scale = 1; // Keep scale at 1 (no scaling)

      // Animate movement with slight delay
      project.style.transition = 'left 0.5s, top 0.5s, transform 0.5s';

      setTimeout(() => {
        project.style.left = `${x}px`;
        project.style.top = `${y}px`;
        project.style.transform = `scale(${scale})`;
        project.style.display = 'flex';
        project.classList.remove('hidden');
        project.dataset.originalX = x;
        project.dataset.originalY = y;
        project.dataset.originalScale = scale;

        // Hide corresponding dock icon
        const icon = document.querySelector(`.app-icon[data-target="${project.id}"]`);
        if (icon) {
          icon.style.display = 'none';
        }
      }, Math.random() * 300);
    });
  }

  // Reset button handler
  resetButton.addEventListener('click', function () {
    // First bring back all hidden projects
    const hiddenProjects = document.querySelectorAll('.project.hidden');
    hiddenProjects.forEach(project => {
      // Remove hidden class and make visible
      project.classList.remove('hidden', 'minimizing');
      project.style.display = 'flex';
      project.style.opacity = '1';

      // Find and hide corresponding dock icon
      const projectId = project.id;
      const dockIcon = document.querySelector(`.app-icon[data-target="${projectId}"]`);
      if (dockIcon) {
        dockIcon.style.display = 'none';
      }
    });
    projects.forEach((project) => {
      const wrapper = document.querySelector('.project-wrapper');
      const wrapperWidth = wrapper.clientWidth;
      const wrapperHeight = wrapper.clientHeight;

      // Use header height for proper constraints
      const headerHeight = project.querySelector('.head').offsetHeight;

      const maxX = wrapperWidth - project.offsetWidth;
      const maxY = wrapperHeight - headerHeight;

      const x = Math.random() * maxX;
      const y = Math.random() * maxY;
      const scale = 0.8 + Math.random() * 0.3;

      // Animate movement with slight delay
      project.style.transition = 'left 0.5s, top 0.5s, transform 0.5s';

      // For better animation, first ensure element is visible with current position
      if (project.classList.contains('hidden')) {
        project.style.transition = 'none';
        project.classList.remove('hidden');
        project.style.display = 'flex';
        project.style.opacity = '1';
      }

      setTimeout(() => {
        project.style.transition = 'left 0.5s, top 0.5s, transform 0.5s';
        project.style.left = `${x}px`;
        project.style.top = `${y}px`;
        project.style.transform = `scale(${scale})`;
        project.dataset.originalX = x;
        project.dataset.originalY = y;
        project.dataset.originalScale = scale;
      }, Math.random() * 300);
    });

    // Hide all dock icons since all projects are now visible
    const dockIcons = document.querySelectorAll('.app-icon');
    dockIcons.forEach(icon => {
      icon.style.display = 'none';
    });
  });
  // Process projects and create icons
  projects.forEach((project, index) => {
    // Add unique ID to project
    project.id = 'project-' + index;

    
    // Add minimize button to header
    const header = project.querySelector('.head');
    const toolbar = project.querySelector('.toolbar')
    const hideButton = document.createElement('button');
    hideButton.className = 'hide-button';
    hideButton.innerHTML = '—';
    hideButton.title = 'Minimize';
    toolbar.appendChild(hideButton);

    // Create dock icon for minimized project
    const projectIcon = document.createElement('div');
    projectIcon.className = 'app-icon';
    projectIcon.dataset.target = 'project-' + index;

    // Use project title to create the image src
    const projectImg = project.querySelector('img[src^="source/screenshots/"]');
    const faviconSrc = projectImg.src.replace('.png', '-fav.png');

    // Create img element for favicon
    const faviconImage = document.createElement('img');

    faviconImage.src = faviconSrc;  // Путь к фавиконке

    projectIcon.appendChild(faviconImage);  // Добавляем картинку в иконку

    // Set title and hide icon by default
    projectIcon.style.display = 'none';
    iconDock.appendChild(projectIcon);

    // Minimize button handler
    hideButton.addEventListener('click', function (e) {
      e.stopPropagation();

      // Save current position for animation
      const rect = project.getBoundingClientRect();
      const wrapperRect = document.querySelector('.project-wrapper').getBoundingClientRect();

      // Find the target dock icon
      const targetIcon = document.querySelector(`.app-icon[data-target="${project.id}"]`);
      const iconRect = targetIcon.getBoundingClientRect();

      // Calculate flying animation - FIXED to use proper coordinates
      const currentX = parseInt(project.style.left) || 0;
      const currentY = parseInt(project.style.top) || 0;

      // Calculate target position relative to the wrapper
      // This targets the center of the dock icon
      const targetX = (iconRect.left + iconRect.width / 2) - wrapperRect.left - (project.offsetWidth / 2);
      const targetY = wrapperRect.height - iconDock.offsetHeight; // Bottom of wrapper minus dock height

      // Set animation properties
      project.style.transition = 'transform 0.4s ease, opacity 0.4s ease, left 0.4s ease, top 0.4s ease';
      project.style.transformOrigin = 'center center';

      // Animate flying to dock
      project.classList.add('minimizing');
      project.style.left = `${targetX}px`;
      project.style.top = `${targetY}px`;
      project.style.transform = 'scale(0.1)';
      project.style.opacity = '0';

      // Show dock icon after animation
      setTimeout(() => {
        project.classList.add('hidden');
        targetIcon.style.display = 'flex';
        targetIcon.classList.add('bounce');
        setTimeout(() => targetIcon.classList.remove('bounce'), 500);

        // Delay before hiding the project completely
        setTimeout(() => {
          project.style.display = 'none';
        }, 100);
      }, 400);
    });

    // Dock icon click handler to restore project
    projectIcon.addEventListener('click', function () {
      const targetProject = document.getElementById(this.dataset.target);

      // Get icon position for animation
      const iconRect = this.getBoundingClientRect();
      const wrapperRect = document.querySelector('.project-wrapper').getBoundingClientRect();

      // Get original position from data attributes
      const originalX = parseFloat(targetProject.dataset.originalX) || 100;
      const originalY = parseFloat(targetProject.dataset.originalY) || 100;
      const originalScale = parseFloat(targetProject.dataset.originalScale) || 1;

      // Set starting position (at the icon)
      targetProject.style.left = `${iconRect.left - wrapperRect.left}px`;
      targetProject.style.top = `${iconRect.top - wrapperRect.top}px`;
      targetProject.style.transform = 'scale(0.1)';
      targetProject.style.opacity = '0';
      targetProject.style.display = 'flex';

      // Start animation
      requestAnimationFrame(() => {
        targetProject.style.transition = 'transform 0.4s ease, opacity 0.4s ease, left 0.4s ease, top 0.4s ease';
        targetProject.style.transform = `scale(${originalScale})`;
        targetProject.style.left = `${originalX}px`;
        targetProject.style.top = `${originalY}px`;
        targetProject.style.opacity = '1';

        // Remove hidden class after small delay
        setTimeout(() => {
          targetProject.classList.remove('hidden', 'minimizing');
        }, 50);
      });

      // Bring project to top layer
      targetProject.style.zIndex = zIndexCounter++;

      // Hide dock icon
      this.style.display = 'none';
    });

    // Drag handlers
    header.addEventListener('mousedown', function (e) {
      // Skip if minimize button was clicked
      if (e.target === hideButton) return;

      e.preventDefault();
      activeProject = project;
      project.style.zIndex = zIndexCounter++;
      project.classList.add('dragging');

      const rect = project.getBoundingClientRect();
      initialX = e.clientX - rect.left;
      initialY = e.clientY - rect.top;

      document.addEventListener('mousemove', handleDrag);
      document.addEventListener('mouseup', stopDrag);
    });

    // Touch device support
    header.addEventListener('touchstart', function (e) {
      // Skip if minimize button was clicked
      if (e.target === hideButton) return;

      e.preventDefault();
      activeProject = project;
      project.style.zIndex = zIndexCounter++;
      project.classList.add('dragging');

      const touch = e.touches[0];
      const rect = project.getBoundingClientRect();
      initialX = touch.clientX - rect.left;
      initialY = touch.clientY - rect.top;

      document.addEventListener('touchmove', handleTouchDrag);
      document.addEventListener('touchend', stopTouchDrag);
    });
  });

  // Mouse drag handler
  function handleDrag(e) {
    if (!activeProject) return;

    const wrapper = document.querySelector('.project-wrapper');
    const wrapperRect = wrapper.getBoundingClientRect();

    const headerHeight = activeProject.querySelector('.head').offsetHeight;

    let newX = e.clientX - wrapperRect.left - initialX;
    let newY = e.clientY - wrapperRect.top - initialY;

    // Constrain boundaries
    const maxX = wrapperRect.width - activeProject.offsetWidth;
    const maxY = wrapperRect.height - headerHeight;

    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));

    // Disable transitions for smooth dragging
    activeProject.style.transition = 'none';
    activeProject.style.left = `${newX}px`;
    activeProject.style.top = `${newY}px`;

    // Update original position data
    activeProject.dataset.originalX = newX;
    activeProject.dataset.originalY = newY;
  }

  // Touch drag handler
  function handleTouchDrag(e) {
    if (!activeProject) return;

    const touch = e.touches[0];
    const wrapper = document.querySelector('.project-wrapper');
    const wrapperRect = wrapper.getBoundingClientRect();

    const headerHeight = activeProject.querySelector('.head').offsetHeight;

    let newX = touch.clientX - wrapperRect.left - initialX;
    let newY = touch.clientY - wrapperRect.top - initialY;

    // Constrain boundaries
    const maxX = wrapperRect.width - activeProject.offsetWidth;
    const maxY = wrapperRect.height - headerHeight;

    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));

    // Disable transitions for smooth dragging
    activeProject.style.transition = 'none';
    activeProject.style.left = `${newX}px`;
    activeProject.style.top = `${newY}px`;

    // Update original position data
    activeProject.dataset.originalX = newX;
    activeProject.dataset.originalY = newY;
  }

  // End drag
  function stopDrag() {
    if (activeProject) {
      // Restore transitions
      activeProject.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
      activeProject.classList.remove('dragging');
      activeProject = null;
    }

    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', stopDrag);
  }

  // End touch drag
  function stopTouchDrag() {
    if (activeProject) {
      // Restore transitions
      activeProject.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
      activeProject.classList.remove('dragging');
      activeProject = null;
    }

    document.removeEventListener('touchmove', handleTouchDrag);
    document.removeEventListener('touchend', stopTouchDrag);
  }

  // Function to position dock at bottom
  function positionDockAtBottom() {
    const wrapper = document.querySelector('.project-wrapper');
    const wrapperRect = wrapper.getBoundingClientRect();
    iconDock.style.bottom = '16px';
    iconDock.style.top = 'auto';
    iconDock.style.left = '50%';
    iconDock.style.transform = 'translateX(-50%)';
  }

  // Update dock position on resize
  window.addEventListener('resize', positionDockAtBottom);



  // Initialize
  positionDockAtBottom();
  randomizeProjectPositions();
});





// Функция для добавления ресайза окон
function addWindowResizeFeature() {
  const projects = document.querySelectorAll('.project');

  projects.forEach(project => {
    // Создаем элементы для ресайза
    const resizeHandles = {
      'e': createResizeHandle('resize-e'),  // правый край
      'w': createResizeHandle('resize-w'),  // левый край
      's': createResizeHandle('resize-s'),  // нижний край
      'se': createResizeHandle('resize-se'), // правый нижний угол
      'sw': createResizeHandle('resize-sw')  // левый нижний угол
    };

    Object.values(resizeHandles).forEach(handle => {
      project.appendChild(handle);
    });

    setupResizeEvents(project, resizeHandles);
  });

  function createResizeHandle(className) {
    const handle = document.createElement('div');
    handle.className = `resize-handle ${className}`;
    return handle;
  }

  function setupResizeEvents(project, handles) {
    let isResizing = false;
    let currentHandle = null;
    let startX, startY, startWidth, startHeight, startLeft, startTop;

    Object.entries(handles).forEach(([direction, handle]) => {
      handle.addEventListener('mousedown', function (e) {
        e.preventDefault();
        e.stopPropagation();
        startResize(e, direction);

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', stopResize);
      });

      handle.addEventListener('touchstart', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const touch = e.touches[0];
        startResize(touch, direction);

        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', stopTouchResize);
      });
    });

    // Инициализация ресайза
    function startResize(e, direction) {
      isResizing = true;
      currentHandle = direction;

      // Сохраняем начальные значения
      startX = e.clientX;
      startY = e.clientY;
      startWidth = project.offsetWidth;
      startHeight = project.offsetHeight;
      startLeft = parseInt(project.style.left) || 0;
      startTop = parseInt(project.style.top) || 0;

      // Отключаем переходы для плавного ресайза
      project.style.transition = 'none';
      project.classList.add('resizing');
    }

    // Обработка перемещения мыши
    function handleMouseMove(e) {
      if (!isResizing) return;
      handleResize(e);
    }

    // Обработка перемещения для сенсорных устройств
    function handleTouchMove(e) {
      if (!isResizing) return;
      const touch = e.touches[0];
      handleResize(touch);
    }

    // Обработка самого ресайза
    function handleResize(e) {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      // Минимальные размеры окна, чтобы его можно было ресайзить
      const minWidth = 200;
      const minHeight = 100;

      // Максимальные размеры (ограничение размеров контейнера)
      const wrapper = project.closest('.project-wrapper');
      const maxWidth = wrapper ? wrapper.clientWidth - startLeft : window.innerWidth;
      const maxHeight = wrapper ? wrapper.clientHeight - startTop : window.innerHeight;

      let newWidth = startWidth;
      let newHeight = startHeight;
      let newLeft = startLeft;
      let newTop = startTop;

      // Расчет новых размеров и позиции в зависимости от направления
      switch (currentHandle) {
        case 'e': // Правый край
          newWidth = Math.min(Math.max(startWidth + deltaX, minWidth), maxWidth);
          break;
        case 'w': // Левый край
          newWidth = Math.min(Math.max(startWidth - deltaX, minWidth), startWidth + startLeft);
          newLeft = startLeft + (startWidth - newWidth);
          break;
        case 's': // Нижний край
          newHeight = Math.min(Math.max(startHeight + deltaY, minHeight), maxHeight);
          break;
        case 'se': // Правый нижний угол
          newWidth = Math.min(Math.max(startWidth + deltaX, minWidth), maxWidth);
          newHeight = Math.min(Math.max(startHeight + deltaY, minHeight), maxHeight);
          break;
        case 'sw': // Левый нижний угол
          newWidth = Math.min(Math.max(startWidth - deltaX, minWidth), startWidth + startLeft);
          newHeight = Math.min(Math.max(startHeight + deltaY, minHeight), maxHeight);
          newLeft = startLeft + (startWidth - newWidth);
          break;
      }

      // Применяем новые размеры и позицию
      project.style.width = `${newWidth}px`;
      project.style.height = `${newHeight}px`;
      project.style.left = `${newLeft}px`;
      project.style.top = `${newTop}px`;
    }

    // Завершение ресайза
    function stopResize() {
      if (isResizing) {
        // Восстанавливаем переходы
        project.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        project.classList.remove('resizing');

        // Сбрасываем флаги
        isResizing = false;
        currentHandle = null;
      }

      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', stopResize);
    }

    // Завершение ресайза для сенсорных устройств
    function stopTouchResize() {
      if (isResizing) {
        // Восстанавливаем переходы
        project.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        project.classList.remove('resizing');

        // Сбрасываем флаги
        isResizing = false;
        currentHandle = null;
      }

      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', stopTouchResize);
    }
  }
}

// CSS для добавления к существующим стилям
const resizeCSS = `
.project {
}

.resize-handle {
position: absolute;
background: transparent;
z-index: 10;
}

.resize-e {
cursor: e-resize;
width: 8px;
top: 0;
right: 0;
bottom: 0;
}

.resize-w {
cursor: w-resize;
width: 8px;
top: 0;
left: 0;
bottom: 0;
}

.resize-s {
cursor: s-resize;
height: 8px;
left: 0;
right: 0;
bottom: 0;
}

.resize-se {
cursor: se-resize;
width: 12px;
height: 12px;
right: 0;
bottom: 0;
}

.resize-sw {
cursor: sw-resize;
width: 12px;
height: 12px;
left: 0;
bottom: 0;
}

.project.resizing {
user-select: none;
pointer-events: none;
}

.project.resizing .resize-handle {
pointer-events: auto;
}
`;

// Добавление стилей в документ
function addResizeStyles() {
  const styleEl = document.createElement('style');
  styleEl.textContent = resizeCSS;
  document.head.appendChild(styleEl);
}

// Инициализация функции ресайза
document.addEventListener('DOMContentLoaded', function () {
  addResizeStyles();
  addWindowResizeFeature();
});


// // Функция для добавления возможности максимизации окон
// function addMaximizeFunctionality() {
//   console.log('Adding maximize functionality...'); // Для отладки

//   // CSS для кнопки максимизации
//   const maximizeCSS = `
//     .maximize-button {
//       background: #28c941;
//       border: none;
//       border-radius: 50%;
//       width: 12px;
//       height: 12px;
//       margin-left: 4px;
//       color: rgba(0, 0, 0, 0);
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       font-size: 8px;
//       transition: color 0.2s;
//       cursor: pointer;
//     }

//     .maximize-button:hover {
//       color: rgba(0, 0, 0, 0.5);
//     }

//     .project.maximized {
//       box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25) !important;
//       z-index: 999 !important;
//     }

//     .project.maximized .resize-handle {
//       display: none !important;
//     }
//   `;

//   // Добавление стилей
//   const styleEl = document.createElement('style');
//   styleEl.textContent = maximizeCSS;
//   document.head.appendChild(styleEl);

//   // Получаем все проекты
//   const projects = document.querySelectorAll('.project');
  
//   projects.forEach((project) => {
//     // Находим заголовок и панель инструментов
//     const header = project.querySelector('.head');
//     const toolbar = project.querySelector('.toolbar');
    
//     if (!toolbar) {
//       console.error('Toolbar not found in project', project);
//       return;
//     }

//     // Создаем кнопку максимизации
//     const maximizeButton = document.createElement('button');
//     maximizeButton.className = 'maximize-button';
//     maximizeButton.innerHTML = '❒';
//     maximizeButton.title = 'Maximize';
//     toolbar.appendChild(maximizeButton);

//     // Функция максимизации/восстановления
//     function toggleMaximize(event) {
//       if (event) {
//         event.stopPropagation();
//       }
      
//       console.log('Toggle maximize called'); // Для отладки
      
//       const wrapper = document.querySelector('.project-wrapper');
//       const wrapperRect = wrapper.getBoundingClientRect();
      
//       if (project.classList.contains('maximized')) {
//         // Восстанавливаем исходное состояние
//         project.style.transition = 'all 0.3s ease';
//         project.style.left = project.dataset.preMaximizeLeft + 'px';
//         project.style.top = project.dataset.preMaximizeTop + 'px';
//         project.style.width = project.dataset.preMaximizeWidth + 'px';
//         project.style.height = project.dataset.preMaximizeHeight + 'px';
//         project.classList.remove('maximized');
//         maximizeButton.innerHTML = '❒';
        
//         console.log('Project restored to:', {
//           left: project.style.left,
//           top: project.style.top,
//           width: project.style.width,
//           height: project.style.height
//         });
//       } else {
//         // Сохраняем текущие размеры перед максимизацией
//         project.dataset.preMaximizeLeft = parseInt(project.style.left) || 0;
//         project.dataset.preMaximizeTop = parseInt(project.style.top) || 0;
//         project.dataset.preMaximizeWidth = project.offsetWidth;
//         project.dataset.preMaximizeHeight = project.offsetHeight;
        
//         console.log('Saved dimensions:', {
//           left: project.dataset.preMaximizeLeft,
//           top: project.dataset.preMaximizeTop,
//           width: project.dataset.preMaximizeWidth,
//           height: project.dataset.preMaximizeHeight
//         });
        
//         // Максимизируем окно
//         project.style.transition = 'all 0.3s ease';
//         project.style.left = '0px';
//         project.style.top = '0px';
//         project.style.width = wrapperRect.width + 'px';
//         project.style.height = wrapperRect.height + 'px';
//         project.classList.add('maximized');
//         maximizeButton.innerHTML = '◱';
        
//         // Поднимаем окно на верхний слой
//         project.style.zIndex = 9999;
//       }
//     }
    
//     // Обработчик клика по кнопке максимизации
//     maximizeButton.addEventListener('click', toggleMaximize);
    
//     // Обработчик двойного клика по заголовку
//     header.addEventListener('dblclick', function(event) {
//       // Игнорируем двойной клик по кнопкам
//       if (!event.target.classList.contains('hide-button') && 
//           !event.target.classList.contains('maximize-button')) {
//         toggleMaximize(event);
//       }
//     });
    
//     // Сохраняем оригинальные обработчики перетаскивания
//     const originalMousedownHandler = header._mousedownHandler;
//     const originalTouchstartHandler = header._touchstartHandler;
    
//     // Новый обработчик нажатия мыши
//     function enhancedMouseDownHandler(event) {
//       // Игнорируем нажатия на кнопки
//       if (event.target.classList.contains('hide-button') || 
//           event.target.classList.contains('maximize-button')) {
//         return;
//       }
      
//       // Если окно максимизировано, восстанавливаем его перед началом перетаскивания
//       if (project.classList.contains('maximized')) {
//         toggleMaximize();
        
//         // Даем время для анимации восстановления
//         setTimeout(() => {
//           // Центрируем окно под курсором
//           const wrapperRect = document.querySelector('.project-wrapper').getBoundingClientRect();
//           const newX = event.clientX - wrapperRect.left - (project.offsetWidth / 2);
//           const newY = event.clientY - wrapperRect.top - 20;
          
//           project.style.transition = 'none';
//           project.style.left = newX + 'px';
//           project.style.top = newY + 'px';
          
//           // Устанавливаем начальные координаты для перетаскивания
//           if (window.activeProject && window.activeProject === project) {
//             window.initialX = event.clientX - newX;
//             window.initialY = event.clientY - newY;
//           }
//         }, 10);
//       }
//     }
    
//     // Новый обработчик для сенсорных устройств
//     function enhancedTouchStartHandler(event) {
//       // Игнорируем нажатия на кнопки
//       if (event.target.classList.contains('hide-button') || 
//           event.target.classList.contains('maximize-button')) {
//         return;
//       }
      
//       // Аналогичная логика восстановления окна при начале перетаскивания
//       if (project.classList.contains('maximized')) {
//         toggleMaximize();
        
//         setTimeout(() => {
//           const touch = event.touches[0];
//           const wrapperRect = document.querySelector('.project-wrapper').getBoundingClientRect();
//           const newX = touch.clientX - wrapperRect.left - (project.offsetWidth / 2);
//           const newY = touch.clientY - wrapperRect.top - 20;
          
//           project.style.transition = 'none';
//           project.style.left = newX + 'px';
//           project.style.top = newY + 'px';
          
//           if (window.activeProject && window.activeProject === project) {
//             window.initialX = touch.clientX - newX;
//             window.initialY = touch.clientY - newY;
//           }
//         }, 10);
//       }
//     }
    
//     // Добавляем улучшенные обработчики
//     header.addEventListener('mousedown', enhancedMouseDownHandler, true);
//     header.addEventListener('touchstart', enhancedTouchStartHandler, true);
//   });
  
//   console.log('Maximize functionality added successfully');
// }

// // Вызываем функцию после полной загрузки DOM
// document.addEventListener('DOMContentLoaded', function() {
//   // Задержка для уверенности, что все другие инициализации завершены
//   setTimeout(addMaximizeFunctionality, 100);
// });

// // Также можно вызвать функцию сразу
// if (document.readyState === 'complete' || document.readyState === 'interactive') {
//   setTimeout(addMaximizeFunctionality, 100);
// }