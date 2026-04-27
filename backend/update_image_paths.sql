-- Actualizar las rutas de las imágenes de los productos
-- Ejecuta este script en Supabase SQL Editor

UPDATE products 
SET image = REPLACE(image, '/src/assets/', '/')
WHERE image LIKE '/src/assets/%';

-- Verificar los cambios
SELECT id, name, image FROM products;
