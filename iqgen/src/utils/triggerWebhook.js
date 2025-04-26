const axios = require('axios');
const Webhook = require('../models/Webhook');

async function triggerWebhook(companyId, eventType, payload) {
  const config = await Webhook.findOne({ companyId });
  if (!config) return;

  const shouldTrigger = (eventType === 'fileUpload' && config.triggers.fileUpload) ||
                        (eventType === 'statusChange' && config.triggers.statusChange);

  if (shouldTrigger) {
    try {
      await axios.post(config.url, {
        type: eventType,
        payload,
      });
    } catch (err) {
      console.error('Webhook trigger failed:', err.message);
    }
  }
}

module.exports = triggerWebhook;
