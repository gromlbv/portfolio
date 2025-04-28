const header = document.getElementById('header');
const target = document.getElementById('target');

const observer = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting) {
    header.classList.add('active');
  } else {
    header.classList.remove('active');
  }
}, {
  threshold: 0.1 // можно менять чувствительность
});

observer.observe(target);





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

      // Use header height for proper constraints
      const headerHeight = project.querySelector('.head').offsetHeight;

      const maxX = wrapperWidth - project.offsetWidth;
      const maxY = wrapperHeight - headerHeight;

      const x = Math.random() * maxX;
      const y = Math.random() * maxY;
      const scale = 0.8 + Math.random() * 0.3;

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
    const hideButton = document.createElement('button');
    hideButton.className = 'hide-button';
    hideButton.innerHTML = '—';
    hideButton.title = 'Minimize';
    header.appendChild(hideButton);

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