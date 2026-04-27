-- Table des inscrits à la newsletter
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text UNIQUE NOT NULL,
  locale text NOT NULL DEFAULT 'fr' CHECK (locale IN ('fr', 'nl', 'en')),
  subscribed_at timestamptz DEFAULT now() NOT NULL
);

-- Activer Row Level Security
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Tout le monde peut s'inscrire (insert public)
CREATE POLICY "allow_public_insert" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

-- Seuls les utilisateurs authentifiés (admin) peuvent lire
CREATE POLICY "allow_authenticated_select" ON newsletter_subscribers
  FOR SELECT USING (auth.role() = 'authenticated');

-- Seuls les utilisateurs authentifiés peuvent supprimer
CREATE POLICY "allow_authenticated_delete" ON newsletter_subscribers
  FOR DELETE USING (auth.role() = 'authenticated');
