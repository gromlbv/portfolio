
const container = document.querySelector('.scroll-container');
const cards = Array.from(container.children);

function getRandomRotation() {
  return Math.floor(Math.random() * 50) - 12;
}

cards.forEach(card => {
  const rotation = getRandomRotation();
  card.style.transform = `rotate(${rotation}deg)`;

  const clone = card.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  clone.style.transform = `rotate(${getRandomRotation()}deg)`;
  container.appendChild(clone);
});

function updateScrollSpeed() {
  const containerWidth = container.offsetWidth;
  const baseSpeed = 50;
  const duration = containerWidth / baseSpeed;

  const minDuration = 8;
  const maxDuration = 35;
  const finalDuration = Math.min(Math.max(duration, minDuration), maxDuration);

  const adjustmentFactor = window.innerWidth > 1400 ? 0.998 : 0.999;
  container.style.animationDuration = finalDuration * adjustmentFactor + "s";
}

window.addEventListener("load", updateScrollSpeed);
window.addEventListener("resize", updateScrollSpeed);
window.addEventListener("orientationchange", updateScrollSpeed);

function startInfiniteScroll() {
  const maxScroll = container.scrollWidth - container.clientWidth;
  container.style.animation = `scrollLeft infinite ${container.style.animationDuration} linear`;

  container.addEventListener('scroll', () => {
    if (container.scrollLeft >= maxScroll) {
      container.scrollLeft = 0;
    }
  });
}

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

document.addEventListener('DOMContentLoaded', function () {
  const projects = document.querySelectorAll('.project');
  let activeProject = null;
  let initialX, initialY;
  let zIndexCounter = 10;

  const iconDock = document.createElement('div');
  iconDock.className = 'app-dock';
  document.querySelector('.project-wrapper').appendChild(iconDock);

  const resetButton = document.createElement('button');
  resetButton.className = 'reset-button';
  resetButton.innerHTML = '↻';
  resetButton.title = 'Reset all projects';
  iconDock.appendChild(resetButton);

  function randomizeProjectPositions() {
    projects.forEach((project) => {
      const wrapper = document.querySelector('.project-wrapper');
      const wrapperWidth = wrapper.clientWidth;
      const wrapperHeight = wrapper.clientHeight;

      const randomWidth = 350 + Math.floor(Math.random() * 1);

      project.style.width = `${randomWidth}px`;

      const headerHeight = project.querySelector('.head').offsetHeight;

      const maxX = wrapperWidth - project.offsetWidth;
      const maxY = wrapperHeight - headerHeight;

      const x = Math.random() * maxX;
      const y = Math.random() * maxY;
      const scale = 1;

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

        const icon = document.querySelector(`.app-icon[data-target="${project.id}"]`);
        if (icon) {
          icon.style.display = 'none';
        }
      }, Math.random() * 300);
    });
  }

  resetButton.addEventListener('click', function () {
    const hiddenProjects = document.querySelectorAll('.project.hidden');
    hiddenProjects.forEach(project => {
      project.classList.remove('hidden', 'minimizing');
      project.style.display = 'flex';
      project.style.opacity = '1';

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

      const headerHeight = project.querySelector('.head').offsetHeight;

      const maxX = wrapperWidth - project.offsetWidth;
      const maxY = wrapperHeight - headerHeight;

      const x = Math.random() * maxX;
      const y = Math.random() * maxY;
      const scale = 0.8 + Math.random() * 0.3;

      project.style.transition = 'left 0.5s, top 0.5s, transform 0.5s';

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

    const dockIcons = document.querySelectorAll('.app-icon');
    dockIcons.forEach(icon => {
      icon.style.display = 'none';
    });
  });

  projects.forEach((project, index) => {
    project.id = 'project-' + index;

    const header = project.querySelector('.head');
    const toolbar = project.querySelector('.toolbar')
    const hideButton = document.createElement('button');
    hideButton.className = 'hide-button';
    hideButton.innerHTML = '—';
    hideButton.title = 'Minimize';
    toolbar.appendChild(hideButton);

    const projectIcon = document.createElement('div');
    projectIcon.className = 'app-icon';
    projectIcon.dataset.target = 'project-' + index;

    const projectImg = project.querySelector('img[src^="static/screenshots/"]');
    const faviconSrc = projectImg.src.replace('.png', '-fav.png');

    const faviconImage = document.createElement('img');
    faviconImage.src = faviconSrc;
    projectIcon.appendChild(faviconImage);

    projectIcon.style.display = 'none';
    iconDock.appendChild(projectIcon);

    hideButton.addEventListener('click', function (e) {
      e.stopPropagation();

      const rect = project.getBoundingClientRect();
      const wrapperRect = document.querySelector('.project-wrapper').getBoundingClientRect();

      const targetIcon = document.querySelector(`.app-icon[data-target="${project.id}"]`);
      const iconRect = targetIcon.getBoundingClientRect();

      const currentX = parseInt(project.style.left) || 0;
      const currentY = parseInt(project.style.top) || 0;

      const targetX = (iconRect.left + iconRect.width / 2) - wrapperRect.left - (project.offsetWidth / 2);
      const targetY = wrapperRect.height - iconDock.offsetHeight;

      project.style.transition = 'transform 0.4s ease, opacity 0.4s ease, left 0.4s ease, top 0.4s ease';
      project.style.transformOrigin = 'center center';

      project.classList.add('minimizing');
      project.style.left = `${targetX}px`;
      project.style.top = `${targetY}px`;
      project.style.transform = 'scale(0.1)';
      project.style.opacity = '0';

      setTimeout(() => {
        project.classList.add('hidden');
        targetIcon.style.display = 'flex';
        targetIcon.classList.add('bounce');
        setTimeout(() => targetIcon.classList.remove('bounce'), 500);

        setTimeout(() => {
          project.style.display = 'none';
        }, 100);
      }, 400);
    });

    projectIcon.addEventListener('click', function () {
      const targetProject = document.getElementById(this.dataset.target);

      const iconRect = this.getBoundingClientRect();
      const wrapperRect = document.querySelector('.project-wrapper').getBoundingClientRect();

      const originalX = parseFloat(targetProject.dataset.originalX) || 100;
      const originalY = parseFloat(targetProject.dataset.originalY) || 100;
      const originalScale = parseFloat(targetProject.dataset.originalScale) || 1;

      targetProject.style.left = `${iconRect.left - wrapperRect.left}px`;
      targetProject.style.top = `${iconRect.top - wrapperRect.top}px`;
      targetProject.style.transform = 'scale(0.1)';
      targetProject.style.opacity = '0';
      targetProject.style.display = 'flex';

      requestAnimationFrame(() => {
        targetProject.style.transition = 'transform 0.4s ease, opacity 0.4s ease, left 0.4s ease, top 0.4s ease';
        targetProject.style.transform = `scale(${originalScale})`;
        targetProject.style.left = `${originalX}px`;
        targetProject.style.top = `${originalY}px`;
        targetProject.style.opacity = '1';

        setTimeout(() => {
          targetProject.classList.remove('hidden', 'minimizing');
        }, 50);
      });

      targetProject.style.zIndex = zIndexCounter++;

      this.style.display = 'none';
    });

    header.addEventListener('mousedown', function (e) {
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

    header.addEventListener('touchstart', function (e) {
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

  function handleDrag(e) {
    if (!activeProject) return;

    const wrapper = document.querySelector('.project-wrapper');
    const wrapperRect = wrapper.getBoundingClientRect();

    const headerHeight = activeProject.querySelector('.head').offsetHeight;

    let newX = e.clientX - wrapperRect.left - initialX;
    let newY = e.clientY - wrapperRect.top - initialY;

    const maxX = wrapperRect.width - activeProject.offsetWidth;
    const maxY = wrapperRect.height - headerHeight;

    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));

    activeProject.style.transition = 'none';
    activeProject.style.left = `${newX}px`;
    activeProject.style.top = `${newY}px`;

    activeProject.dataset.originalX = newX;
    activeProject.dataset.originalY = newY;
  }

  function handleTouchDrag(e) {
    if (!activeProject) return;

    const touch = e.touches[0];
    const wrapper = document.querySelector('.project-wrapper');
    const wrapperRect = wrapper.getBoundingClientRect();

    const headerHeight = activeProject.querySelector('.head').offsetHeight;

    let newX = touch.clientX - wrapperRect.left - initialX;
    let newY = touch.clientY - wrapperRect.top - initialY;

    const maxX = wrapperRect.width - activeProject.offsetWidth;
    const maxY = wrapperRect.height - headerHeight;

    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));

    activeProject.style.transition = 'none';
    activeProject.style.left = `${newX}px`;
    activeProject.style.top = `${newY}px`;

    activeProject.dataset.originalX = newX;
    activeProject.dataset.originalY = newY;
  }

  function stopDrag() {
    if (activeProject) {
      activeProject.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
      activeProject.classList.remove('dragging');
      activeProject = null;
    }

    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', stopDrag);
  }

  function stopTouchDrag() {
    if (activeProject) {
      activeProject.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
      activeProject.classList.remove('dragging');
      activeProject = null;
    }

    document.removeEventListener('touchmove', handleTouchDrag);
    document.removeEventListener('touchend', stopTouchDrag);
  }

  function positionDockAtBottom() {
    const wrapper = document.querySelector('.project-wrapper');
    const wrapperRect = wrapper.getBoundingClientRect();
    iconDock.style.bottom = '16px';
    iconDock.style.top = 'auto';
    iconDock.style.left = '50%';
    iconDock.style.transform = 'translateX(-50%)';
  }

  window.addEventListener('resize', positionDockAtBottom);

  positionDockAtBottom();
  randomizeProjectPositions();
});

function addWindowResizeFeature() {
  const projects = document.querySelectorAll('.project');

  projects.forEach(project => {
    const resizeHandles = {
      'e': createResizeHandle('resize-e'),
      'w': createResizeHandle('resize-w'),
      's': createResizeHandle('resize-s'),
      'se': createResizeHandle('resize-se'),
      'sw': createResizeHandle('resize-sw')
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

    function startResize(e, direction) {
      isResizing = true;
      currentHandle = direction;

      startX = e.clientX;
      startY = e.clientY;
      startWidth = project.offsetWidth;
      startHeight = project.offsetHeight;
      startLeft = parseInt(project.style.left) || 0;
      startTop = parseInt(project.style.top) || 0;

      project.style.transition = 'none';
      project.classList.add('resizing');
    }

    function handleMouseMove(e) {
      if (!isResizing) return;
      handleResize(e);
    }

    function handleTouchMove(e) {
      if (!isResizing) return;
      const touch = e.touches[0];
      handleResize(touch);
    }

    function handleResize(e) {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      const minWidth = 200;
      const minHeight = 100;

      const wrapper = project.closest('.project-wrapper');
      const maxWidth = wrapper ? wrapper.clientWidth - startLeft : window.innerWidth;
      const maxHeight = wrapper ? wrapper.clientHeight - startTop : window.innerHeight;

      let newWidth = startWidth;
      let newHeight = startHeight;
      let newLeft = startLeft;
      let newTop = startTop;

      switch (currentHandle) {
        case 'e':
          newWidth = Math.min(Math.max(startWidth + deltaX, minWidth), maxWidth);
          break;
        case 'w':
          newWidth = Math.min(Math.max(startWidth - deltaX, minWidth), startWidth + startLeft);
          newLeft = startLeft + (startWidth - newWidth);
          break;
        case 's':
          newHeight = Math.min(Math.max(startHeight + deltaY, minHeight), maxHeight);
          break;
        case 'se':
          newWidth = Math.min(Math.max(startWidth + deltaX, minWidth), maxWidth);
          newHeight = Math.min(Math.max(startHeight + deltaY, minHeight), maxHeight);
          break;
        case 'sw':
          newWidth = Math.min(Math.max(startWidth - deltaX, minWidth), startWidth + startLeft);
          newHeight = Math.min(Math.max(startHeight + deltaY, minHeight), maxHeight);
          newLeft = startLeft + (startWidth - newWidth);
          break;
      }

      project.style.width = `${newWidth}px`;
      project.style.height = `${newHeight}px`;
      project.style.left = `${newLeft}px`;
      project.style.top = `${newTop}px`;
    }

    function stopResize() {
      if (isResizing) {
        project.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        project.classList.remove('resizing');
        isResizing = false;
        currentHandle = null;
      }

      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', stopResize);
    }

    function stopTouchResize() {
      if (isResizing) {
        project.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        project.classList.remove('resizing');
        isResizing = false;
        currentHandle = null;
      }

      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', stopTouchResize);
    }
  }
}

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

function addResizeStyles() {
  const styleEl = document.createElement('style');
  styleEl.textContent = resizeCSS;
  document.head.appendChild(styleEl);
}

document.addEventListener('DOMContentLoaded', function () {
  addResizeStyles();
  addWindowResizeFeature();
});