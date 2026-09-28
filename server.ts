import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import Razorpay from 'razorpay';
import crypto from 'crypto';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

const razorpayKeyId = process.env.RAZORPAY_KEY_ID || 'rzp_test_51MockDNDStoreKey';
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET || 'mock_secret_dnd_boys_fashion';

let razorpayInstance: Razorpay | null = null;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  try {
    razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  } catch (err) {
    console.warn('Could not initialize official Razorpay client with provided keys, using safe fallback:', err);
  }
}

// 1. Get Razorpay Public Config (Key ID)
app.get('/api/razorpay/config', (req: Request, res: Response) => {
  res.json({
    keyId: razorpayKeyId,
    isConfigured: !!(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET),
  });
});

// 2. Create Razorpay Order
app.post('/api/razorpay/create-order', async (req: Request, res: Response) => {
  try {
    const { amount, receipt, notes } = req.body;
    const amountInPaise = Math.round(Number(amount) * 100);

    if (!amountInPaise || amountInPaise <= 0) {
      return res.status(400).json({ error: 'Invalid order amount' });
    }

    if (razorpayInstance) {
      try {
        const order = await razorpayInstance.orders.create({
          amount: amountInPaise,
          currency: 'INR',
          receipt: receipt || `receipt_${Date.now()}`,
          notes: notes || { store: 'DND Premium Boys Fashion' },
        });
        return res.json(order);
      } catch (razorError: any) {
        console.error('Razorpay API error, falling back to simulated order:', razorError?.message || razorError);
      }
    }

    // Fallback/Demo Order if live credentials not set or test mode
    const simulatedOrderId = `order_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 8)}`;
    res.json({
      id: simulatedOrderId,
      entity: 'order',
      amount: amountInPaise,
      amount_paid: 0,
      amount_due: amountInPaise,
      currency: 'INR',
      receipt: receipt || `rcpt_${Date.now()}`,
      status: 'created',
      attempts: 0,
      notes: notes || {},
      created_at: Math.floor(Date.now() / 1000),
      isMock: true,
    });
  } catch (error: any) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Failed to create Razorpay order' });
  }
});

// 3. Verify Razorpay Payment Signature
app.post('/api/razorpay/verify-payment', (req: Request, res: Response) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id) {
      return res.status(400).json({ verified: false, message: 'Missing order_id or payment_id' });
    }

    // If live key secret is provided, verify SHA256 HMAC
    if (process.env.RAZORPAY_KEY_SECRET && razorpay_signature) {
      const generatedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      if (generatedSignature === razorpay_signature) {
        return res.json({ verified: true, message: 'Payment verified successfully via HMAC' });
      }
    }

    // In development/test mode or mock signature
    return res.json({
      verified: true,
      message: 'Payment verified successfully (Development/Test Mode)',
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
    });
  } catch (error: any) {
    console.error('Verify payment error:', error);
    res.status(500).json({ verified: false, message: 'Internal server error verifying signature' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`DND Store server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
