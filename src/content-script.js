/**
 * Proton Calendar Video Links - Content Script
 * Injects video conferencing buttons into the Proton Calendar event creation form
 */

const BUTTON_CONTAINER_ID = 'proton-alt-video-buttons';
const LOG_PREFIX = '[Proton Alt Video]';

// Service configurations with colors
const SERVICE_STYLES = {
  jitsi: { color: '#1d788f', label: 'Add Jitsi' },
  bbb: { color: '#226699', label: 'Add BBB' },
  whereby: { color: '#4a154b', label: 'Add Whereby' },
  custom: { color: '#666666', label: 'Add Meeting' }
};

/**
 * Generate a unique meeting room ID
 */
function generateRoomId() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${random}`;
}

/**
 * Generate meeting URL for each service
 */
function generateMeetingUrl(service, settings) {
  const roomId = generateRoomId();

  switch (service) {
    case 'jitsi': {
      const domain = settings.jitsiDomain || 'meet.jit.si';
      return `https://${domain}/${roomId}`;
    }
    case 'bbb': {
      const baseUrl = settings.bbbUrl?.replace(/\/$/, '') || '';
      const room = settings.bbbRoom || roomId;
      if (!baseUrl) {
        return null;
      }
      return `${baseUrl}/b/${room}`;
    }
    case 'whereby': {
      return settings.wherebyRoom || null;
    }
    case 'custom': {
      const template = settings.customUrl || '';
      if (!template) return null;
      return template.replace('{random}', roomId);
    }
    default:
      return null;
  }
}

/**
 * Find the location input field in the event form
 */
function findLocationField() {
  const selectors = [
    'input[placeholder*="location" i]',
    'input[placeholder*="Add location" i]',
    'input[placeholder*="Location" i]',
    'input[name*="location" i]',
    'input[id*="location" i]',
    'input[aria-label*="location" i]',
    'input[data-testid*="location" i]'
  ];

  for (const selector of selectors) {
    const field = document.querySelector(selector);
    if (field) return field;
  }

  const labels = document.querySelectorAll('label, span, div');
  for (const label of labels) {
    if (label.textContent.trim().toLowerCase() === 'location') {
      const input = label.parentElement?.querySelector('input') ||
                    label.nextElementSibling?.querySelector('input') ||
                    label.closest('div')?.querySelector('input');
      if (input) return input;
    }
  }

  return null;
}

/**
 * Find the description/notes textarea
 */
function findDescriptionField() {
  const selectors = [
    'textarea[placeholder*="description" i]',
    'textarea[placeholder*="notes" i]',
    'textarea[placeholder*="Add description" i]',
    'textarea[name*="description" i]',
    'textarea[id*="description" i]',
    'textarea[aria-label*="description" i]',
    'div[contenteditable="true"]'
  ];

  for (const selector of selectors) {
    const field = document.querySelector(selector);
    if (field) return field;
  }

  return null;
}

/**
 * Set value in an input field and trigger change events
 */
function setFieldValue(field, value) {
  if (!field) return false;

  if (field.contentEditable === 'true') {
    field.innerHTML = value;
    field.dispatchEvent(new Event('input', { bubbles: true }));
    return true;
  }

  field.value = value;
  field.focus();

  field.dispatchEvent(new Event('input', { bubbles: true }));
  field.dispatchEvent(new Event('change', { bubbles: true }));
  field.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true }));

  return true;
}

/**
 * Create a styled button for a video service
 */
function createServiceButton(service, settings, locationField, descriptionField) {
  const style = SERVICE_STYLES[service];
  const label = service === 'custom' && settings.customName
    ? `Add ${settings.customName}`
    : style.label;

  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = label;
  button.dataset.service = service;
  button.style.cssText = `
    padding: 6px 12px;
    background-color: ${style.color};
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
    transition: opacity 0.2s;
  `;

  button.addEventListener('mouseenter', () => {
    button.style.opacity = '0.9';
  });
  button.addEventListener('mouseleave', () => {
    button.style.opacity = '1';
  });

  button.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const url = generateMeetingUrl(service, settings);
    if (!url) {
      showNotification(`Please configure ${label.replace('Add ', '')} in the extension settings.`, 'error');
      return;
    }

    if (locationField) {
      setFieldValue(locationField, url);
      highlightField(locationField);
    }

    if (descriptionField && descriptionField.value === '') {
      const serviceName = service === 'custom' ? settings.customName : service.charAt(0).toUpperCase() + service.slice(1);
      setFieldValue(descriptionField, `Join video call: ${url}`);
    }

    showNotification(`${label.replace('Add ', '')} link added!`, 'success');
    console.log(`${LOG_PREFIX} ${service} link added:`, url);
  });

  return button;
}

/**
 * Briefly highlight a field to show it was updated
 */
function highlightField(field) {
  const originalBorder = field.style.border;
  const originalBoxShadow = field.style.boxShadow;

  field.style.border = '2px solid #27ae60';
  field.style.boxShadow = '0 0 0 3px rgba(39, 174, 96, 0.2)';

  setTimeout(() => {
    field.style.border = originalBorder;
    field.style.boxShadow = originalBoxShadow;
  }, 1500);
}

/**
 * Show a notification toast
 */
function showNotification(message, type = 'success') {
  const existing = document.getElementById('proton-alt-video-notification');
  if (existing) existing.remove();

  const notification = document.createElement('div');
  notification.id = 'proton-alt-video-notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 12px 20px;
    background-color: ${type === 'success' ? '#27ae60' : '#e74c3c'};
    color: white;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    z-index: 10000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    animation: slideIn 0.3s ease;
  `;

  if (!document.getElementById('proton-alt-video-styles')) {
    const styles = document.createElement('style');
    styles.id = 'proton-alt-video-styles';
    styles.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(styles);
  }

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

/**
 * Get browser storage API (works for both Chrome and Firefox)
 */
function getStorageApi() {
  if (typeof browser !== 'undefined' && browser.storage) {
    return browser.storage.sync;
  }
  if (typeof chrome !== 'undefined' && chrome.storage) {
    return chrome.storage.sync;
  }
  return null;
}

/**
 * Inject video service buttons into the event form
 */
async function injectVideoButtons() {
  if (document.getElementById(BUTTON_CONTAINER_ID)) {
    return;
  }

  const locationField = findLocationField();
  if (!locationField) {
    return;
  }

  const descriptionField = findDescriptionField();

  let settings;
  try {
    const storage = getStorageApi();
    if (storage) {
      settings = await storage.get([
        'enableJitsi', 'jitsiDomain',
        'enableBbb', 'bbbUrl', 'bbbRoom',
        'enableWhereby', 'wherebyRoom',
        'enableCustom', 'customName', 'customUrl'
      ]);
    } else {
      settings = { enableJitsi: true, jitsiDomain: 'meet.jit.si' };
    }
  } catch (e) {
    console.error(`${LOG_PREFIX} Failed to load settings:`, e);
    settings = { enableJitsi: true, jitsiDomain: 'meet.jit.si' };
  }

  const container = document.createElement('div');
  container.id = BUTTON_CONTAINER_ID;
  container.style.cssText = `
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 8px;
    padding: 8px 0;
  `;

  const servicesToAdd = [];

  if (settings.enableJitsi !== false) {
    servicesToAdd.push('jitsi');
  }
  if (settings.enableBbb && settings.bbbUrl) {
    servicesToAdd.push('bbb');
  }
  if (settings.enableWhereby && settings.wherebyRoom) {
    servicesToAdd.push('whereby');
  }
  if (settings.enableCustom && settings.customUrl) {
    servicesToAdd.push('custom');
  }

  if (servicesToAdd.length === 0) {
    servicesToAdd.push('jitsi');
  }

  servicesToAdd.forEach(service => {
    const button = createServiceButton(service, settings, locationField, descriptionField);
    container.appendChild(button);
  });

  const insertionPoint = locationField.closest('div[class]') || locationField.parentElement;
  if (insertionPoint && insertionPoint.parentElement) {
    insertionPoint.parentElement.insertBefore(container, insertionPoint.nextSibling);
    console.log(`${LOG_PREFIX} Buttons injected successfully`);
  } else {
    locationField.parentElement.appendChild(container);
    console.log(`${LOG_PREFIX} Buttons injected (fallback location)`);
  }
}

/**
 * Watch for DOM changes to detect when event form opens
 */
function setupObserver() {
  let debounceTimer = null;

  const observer = new MutationObserver(() => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (!document.getElementById(BUTTON_CONTAINER_ID)) {
        injectVideoButtons();
      }
    }, 200);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  console.log(`${LOG_PREFIX} Observer started`);
}

// Initialize
console.log(`${LOG_PREFIX} Content script loaded`);
setupObserver();
setTimeout(injectVideoButtons, 500);
