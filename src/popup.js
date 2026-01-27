/**
 * Popup script - handles user settings for video services
 */

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

document.addEventListener('DOMContentLoaded', () => {
  const saveBtn = document.getElementById('save-btn');
  const statusDiv = document.getElementById('status');
  const storage = getStorageApi();

  const services = {
    jitsi: {
      checkbox: document.getElementById('enable-jitsi'),
      config: document.getElementById('jitsi-config'),
      fields: {
        domain: document.getElementById('jitsi-domain')
      }
    },
    bbb: {
      checkbox: document.getElementById('enable-bbb'),
      config: document.getElementById('bbb-config'),
      fields: {
        url: document.getElementById('bbb-url'),
        room: document.getElementById('bbb-room')
      }
    },
    whereby: {
      checkbox: document.getElementById('enable-whereby'),
      config: document.getElementById('whereby-config'),
      fields: {
        room: document.getElementById('whereby-room')
      }
    },
    custom: {
      checkbox: document.getElementById('enable-custom'),
      config: document.getElementById('custom-config'),
      fields: {
        name: document.getElementById('custom-name'),
        url: document.getElementById('custom-url')
      }
    }
  };

  // Toggle config visibility when checkbox changes
  Object.keys(services).forEach(key => {
    const service = services[key];
    service.checkbox.addEventListener('change', () => {
      service.config.classList.toggle('hidden', !service.checkbox.checked);
    });
  });

  // Load saved settings
  if (storage) {
    storage.get([
      'enableJitsi', 'jitsiDomain',
      'enableBbb', 'bbbUrl', 'bbbRoom',
      'enableWhereby', 'wherebyRoom',
      'enableCustom', 'customName', 'customUrl'
    ]).then((result) => {
      // Jitsi (default enabled)
      services.jitsi.checkbox.checked = result.enableJitsi !== false;
      if (result.jitsiDomain) {
        services.jitsi.fields.domain.value = result.jitsiDomain;
      }
      services.jitsi.config.classList.toggle('hidden', !services.jitsi.checkbox.checked);

      // BBB
      services.bbb.checkbox.checked = result.enableBbb || false;
      if (result.bbbUrl) services.bbb.fields.url.value = result.bbbUrl;
      if (result.bbbRoom) services.bbb.fields.room.value = result.bbbRoom;
      services.bbb.config.classList.toggle('hidden', !services.bbb.checkbox.checked);

      // Whereby
      services.whereby.checkbox.checked = result.enableWhereby || false;
      if (result.wherebyRoom) services.whereby.fields.room.value = result.wherebyRoom;
      services.whereby.config.classList.toggle('hidden', !services.whereby.checkbox.checked);

      // Custom
      services.custom.checkbox.checked = result.enableCustom || false;
      if (result.customName) services.custom.fields.name.value = result.customName;
      if (result.customUrl) services.custom.fields.url.value = result.customUrl;
      services.custom.config.classList.toggle('hidden', !services.custom.checkbox.checked);
    });
  }

  // Save settings
  saveBtn.addEventListener('click', () => {
    const settings = {
      enableJitsi: services.jitsi.checkbox.checked,
      jitsiDomain: services.jitsi.fields.domain.value || 'meet.jit.si',

      enableBbb: services.bbb.checkbox.checked,
      bbbUrl: services.bbb.fields.url.value,
      bbbRoom: services.bbb.fields.room.value,

      enableWhereby: services.whereby.checkbox.checked,
      wherebyRoom: services.whereby.fields.room.value,

      enableCustom: services.custom.checkbox.checked,
      customName: services.custom.fields.name.value,
      customUrl: services.custom.fields.url.value
    };

    if (storage) {
      storage.set(settings).then(() => {
        statusDiv.textContent = 'Settings saved!';
        statusDiv.style.color = '#27ae60';

        setTimeout(() => {
          statusDiv.textContent = '';
        }, 2000);
      });
    }
  });
});
