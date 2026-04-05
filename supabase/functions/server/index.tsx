import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-eb0bde5e/health", (c) => {
  return c.json({ status: "ok" });
});

// KV Store Endpoints
app.post("/make-server-eb0bde5e/kv-store", async (c) => {
  try {
    const { key, value } = await c.req.json();
    if (!key || value === undefined) {
      return c.json({ error: "Missing key or value" }, 400);
    }
    await kv.set(key, value);
    return c.json({ success: true });
  } catch (error) {
    console.error("KV Store Set Error:", error);
    return c.json({ error: error.message }, 500);
  }
});

app.get("/make-server-eb0bde5e/kv-store/:key", async (c) => {
  try {
    const key = c.req.param("key");
    const value = await kv.get(key);
    return c.json({ value });
  } catch (error) {
    console.error("KV Store Get Error:", error);
    return c.json({ error: error.message }, 500);
  }
});

app.get("/make-server-eb0bde5e/orders", async (c) => {
  try {
    const orders = await kv.getByPrefix("order:");
    return c.json({ orders });
  } catch (error) {
    console.error("Orders Get Error:", error);
    return c.json({ error: error.message }, 500);
  }
});

// Virtual View for N8N Integration
app.get("/make-server-eb0bde5e/view-orders", async (c) => {
  try {
    const orders = await kv.getByPrefix("order:");
    
    // Transform orders into a flat format suitable for N8N/Excel
    const flatOrders = orders.map((order: any) => ({
      id: order.id,
      created_at: order.createdAt,
      client_name: order.customerName,
      client_email: order.customerEmail,
      client_phone: order.customerPhone || '',
      pickup_date: order.pickupDate,
      payment_method: order.paymentMethod,
      total: order.total,
      deposit: order.deposit || 0,
      remaining_balance: order.remainingBalance || 0,
      status: order.status,
      is_prepared: order.isPrepared ? 'Oui' : 'Non',
      products_summary: Array.isArray(order.items) 
        ? order.items.map((i: any) => `${i.quantity}x ${i.name}`).join(', ') 
        : '',
      // Include structured items if N8N wants to iterate them
      items: order.items 
    }));
    
    return c.json(flatOrders);
  } catch (error) {
    console.error("View Orders Error:", error);
    return c.json({ error: error.message }, 500);
  }
});

// Admin Password Reset Utility
app.post("/make-server-eb0bde5e/admin/reset-password", async (c) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    );
    
    const emails = ['cedricfeyants@gmail.com', 'francoisderidder1995@gmail.com'];
    const newPassword = '123456'; // As requested by user
    
    // Check if user exists
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
    if (listError) throw listError;
    
    const results = [];

    for (const email of emails) {
      const user = users.find(u => u.email === email);
      
      if (!user) {
        // Create user if not exists
        const { error: createError } = await supabase.auth.admin.createUser({
            email,
            password: newPassword,
            email_confirm: true,
            user_metadata: { name: 'Admin' }
        });
        if (createError) {
          console.error(`Error creating ${email}:`, createError);
          results.push(`Error creating ${email}`);
        } else {
          results.push(`Created ${email}`);
        }
      } else {
        // Update password
        const { error: updateError } = await supabase.auth.admin.updateUserById(
          user.id,
          { password: newPassword }
        );
        if (updateError) {
           console.error(`Error updating ${email}:`, updateError);
           results.push(`Error updating ${email}`);
        } else {
           results.push(`Reset ${email}`);
        }
      }
    }
    
    return c.json({ success: true, message: results.join(', ') });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return c.json({ error: error.message }, 500);
  }
});

Deno.serve(app.fetch);
