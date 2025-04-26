const mongoose = require('mongoose');

const webhookSchema = new mongoose.Schema(
{
  companyId: 
  { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true 
  },
  url:
  { 
    type: String,
    required: true
  },
  triggers:
  {
    fileUpload: 
    { 
        type: Boolean,
        default: false
    },
    statusChange:
    { 
        type: Boolean,
        default: false
    },
  },
}, { timestamps: true });

module.exports = mongoose.model('Webhook', webhookSchema);
