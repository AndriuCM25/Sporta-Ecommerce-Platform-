-- ============================================
-- SPORTA E-COMMERCE - CONFIGURACIÓN COMPLETA
-- ============================================
-- Ejecutar este script en un proyecto nuevo de Supabase
-- ============================================

-- ============================================
-- 1. CREAR TABLAS
-- ============================================

-- Tabla: users
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  blocked BOOLEAN DEFAULT FALSE,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla: categories
CREATE TABLE IF NOT EXISTS categories (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla: products
CREATE TABLE IF NOT EXISTS products (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  category_id BIGINT REFERENCES categories(id),
  slug TEXT,
  price NUMERIC(10,2) NOT NULL,
  stock INTEGER DEFAULT 100,
  badge TEXT,
  description TEXT,
  image TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  sizes JSONB DEFAULT '["38","39","40","41","42","43","44"]'::jsonb,
  colors JSONB DEFAULT '["Negro","Blanco","Gris"]'::jsonb,
  features JSONB DEFAULT '[]'::jsonb,
  status TEXT DEFAULT 'active',
  is_featured BOOLEAN DEFAULT FALSE,
  views INTEGER DEFAULT 0,
  sales_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla: addresses
CREATE TABLE IF NOT EXISTS addresses (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  full_address TEXT NOT NULL,
  district TEXT NOT NULL,
  reference TEXT,
  phone TEXT,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla: orders
CREATE TABLE IF NOT EXISTS orders (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  order_number TEXT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  district TEXT NOT NULL,
  reference TEXT,
  delivery_notes TEXT,
  payment_method TEXT NOT NULL,
  subtotal NUMERIC(10,2) NOT NULL,
  shipping NUMERIC(10,2) DEFAULT 0,
  total NUMERIC(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  payment_status TEXT DEFAULT 'pending',
  paid_at TIMESTAMPTZ,
  shipped_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla: order_items
CREATE TABLE IF NOT EXISTS order_items (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  order_id BIGINT REFERENCES orders(id) ON DELETE CASCADE,
  product_id BIGINT,
  name TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  quantity INTEGER NOT NULL,
  image TEXT,
  selected_size TEXT,
  selected_color TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla: cart_items
CREATE TABLE IF NOT EXISTS cart_items (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  selected_size TEXT,
  selected_color TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Tabla: contacts
CREATE TABLE IF NOT EXISTS contacts (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  admin_notes TEXT,
  replied_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. FUNCIONES
-- ============================================

-- Función para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Función para actualizar timestamps de pedidos
CREATE OR REPLACE FUNCTION update_order_timestamps()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'paid' AND (OLD.status IS NULL OR OLD.status != 'paid') THEN
    NEW.paid_at = NOW();
    NEW.payment_status = 'paid';
  END IF;
  IF NEW.status = 'shipped' AND (OLD.status IS NULL OR OLD.status != 'shipped') THEN
    NEW.shipped_at = NOW();
  END IF;
  IF NEW.status = 'delivered' AND (OLD.status IS NULL OR OLD.status != 'delivered') THEN
    NEW.delivered_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 3. TRIGGERS
-- ============================================

CREATE TRIGGER update_users_updated_at 
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at 
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at 
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_order_status_timestamps 
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_order_timestamps();

CREATE TRIGGER update_cart_items_updated_at 
  BEFORE UPDATE ON cart_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 4. HABILITAR ROW LEVEL SECURITY
-- ============================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 5. POLÍTICAS RLS
-- ============================================

-- Users
CREATE POLICY "users_insert_public" ON users FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "users_select_public" ON users FOR SELECT USING (TRUE);
CREATE POLICY "users_update_all" ON users FOR UPDATE USING (TRUE);
CREATE POLICY "users_delete_all" ON users FOR DELETE USING (TRUE);

-- Categories
CREATE POLICY "categories_select_public" ON categories FOR SELECT USING (TRUE);
CREATE POLICY "categories_all_admin" ON categories FOR ALL USING (TRUE);

-- Products
CREATE POLICY "products_select_public" ON products FOR SELECT USING (TRUE);
CREATE POLICY "products_insert_all" ON products FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "products_update_all" ON products FOR UPDATE USING (TRUE);
CREATE POLICY "products_delete_all" ON products FOR DELETE USING (TRUE);

-- Addresses
CREATE POLICY "addresses_all_own" ON addresses FOR ALL USING (TRUE);

-- Orders
CREATE POLICY "orders_insert_all" ON orders FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "orders_select_all" ON orders FOR SELECT USING (TRUE);
CREATE POLICY "orders_update_all" ON orders FOR UPDATE USING (TRUE);
CREATE POLICY "orders_delete_all" ON orders FOR DELETE USING (TRUE);

-- Order Items
CREATE POLICY "order_items_insert_all" ON order_items FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "order_items_select_all" ON order_items FOR SELECT USING (TRUE);
CREATE POLICY "order_items_update_all" ON order_items FOR UPDATE USING (TRUE);
CREATE POLICY "order_items_delete_all" ON order_items FOR DELETE USING (TRUE);

-- Cart Items
CREATE POLICY "cart_items_all" ON cart_items FOR ALL USING (TRUE);

-- Contacts
CREATE POLICY "contacts_insert_public" ON contacts FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "contacts_all_admin" ON contacts FOR ALL USING (TRUE);

-- ============================================
-- 6. ÍNDICES
-- ============================================

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);
CREATE INDEX idx_cart_items_user_id ON cart_items(user_id);
CREATE INDEX idx_cart_items_product_id ON cart_items(product_id);
CREATE INDEX idx_addresses_user_id ON addresses(user_id);
CREATE INDEX idx_contacts_status ON contacts(status);

-- ============================================
-- 7. DATOS INICIALES
-- ============================================

-- Categorías
INSERT INTO categories (name, slug, description) VALUES
  ('Running', 'running', 'Zapatillas diseñadas para correr con máximo rendimiento'),
  ('Lifestyle', 'lifestyle', 'Calzado urbano para el día a día con estilo'),
  ('Basketball', 'basketball', 'Zapatillas de baloncesto con soporte y tracción');

-- Usuario Admin (email: adminSporta@depor.pe, password: admin123)
INSERT INTO users (name, email, password, role, blocked) VALUES
  ('Admin Sporta', 'adminSporta@depor.pe', '$2a$10$7uAEBoMijT3RgALqkS8Nu.dOhwzplupEKOTQBiyJ1I8yCjRFRj7s2', 'admin', FALSE);

-- Productos de ejemplo
INSERT INTO products (name, category, price, stock, badge, description, image) VALUES
  ('Air Sprint Pro', 'running', 299.90, 50, 'Nuevo', 'Zapatillas de running con tecnología de amortiguación avanzada para máximo rendimiento.', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'),
  ('Urban Flex', 'lifestyle', 249.90, 75, 'Popular', 'Calzado urbano versátil con diseño moderno y comodidad todo el día.', 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500'),
  ('Court Master', 'basketball', 349.90, 30, 'Boost', 'Zapatillas de baloncesto con soporte de tobillo y tracción superior.', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500'),
  ('Speed Runner', 'running', 279.90, 60, NULL, 'Diseñadas para velocidad con suela ligera y transpirable.', 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500'),
  ('Classic Street', 'lifestyle', 199.90, 100, NULL, 'Estilo clásico con comodidad moderna para uso diario.', 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500'),
  ('Slam Dunk Pro', 'basketball', 379.90, 25, 'Nuevo', 'Máximo rendimiento en la cancha con tecnología de impacto.', 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500'),
  ('Trail Blazer', 'running', 329.90, 40, 'Boost', 'Para terrenos difíciles con agarre excepcional y durabilidad.', 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500'),
  ('Metro Style', 'lifestyle', 229.90, 80, 'Popular', 'Perfecto equilibrio entre estilo urbano y funcionalidad.', 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=500'),
  ('Jump Elite', 'basketball', 399.90, 20, 'Boost', 'Tecnología de salto mejorada para jugadores profesionales.', 'https://images.unsplash.com/photo-1612902376601-5bc7f0c4b1c6?w=500'),
  ('Marathon Max', 'running', 319.90, 45, NULL, 'Resistencia extrema para largas distancias con máxima comodidad.', 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=500'),
  ('City Walker', 'lifestyle', 189.90, 120, NULL, 'Comodidad suprema para caminar por la ciudad todo el día.', 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500'),
  ('Hoop Legend', 'basketball', 359.90, 35, 'Popular', 'Diseño icónico con rendimiento de élite en la cancha.', 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=500');

-- ============================================
-- 8. STORAGE (Ejecutar después del script principal)
-- ============================================

-- Crear bucket para imágenes
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('product-images', 'product-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Políticas de Storage
CREATE POLICY "Public Access" ON storage.objects 
  FOR SELECT USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated Upload" ON storage.objects 
  FOR INSERT WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Authenticated Update" ON storage.objects 
  FOR UPDATE USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated Delete" ON storage.objects 
  FOR DELETE USING (bucket_id = 'product-images');

-- ============================================
-- CONFIGURACIÓN COMPLETA
-- ============================================
-- Credenciales Admin:
-- Email: adminSporta@depor.pe
-- Password: admin123
-- ============================================
