// Script pour configurer l'authentification Supabase
// À exécuter dans l'éditeur SQL de Supabase

console.log(`
🔐 CONFIGURATION DE L'AUTHENTIFICATION SUPABASE

1. Va dans ton dashboard Supabase
2. Clique sur "Authentication" dans le menu de gauche
3. Configure les paramètres suivants :

=== CONFIGURATION GÉNÉRALE ===

1. Active "Email auth" dans "Providers"
2. Configure "Site URL" : http://localhost:5173
3. Configure "Redirect URLs" : 
   - http://localhost:5173/PortFolio/admin
   - https://ton-domaine.com/PortFolio/admin

=== CRÉATION D'UN UTILISATEUR ADMIN ===

1. Va dans "Users" dans le menu Authentication
2. Clique sur "Add user"
3. Remplis :
   - Email : admin@ton-domaine.com
   - Password : [mot de passe sécurisé 20+ caractères]
   - Email confirm : true

=== POLITIQUES RLS POUR LES PROJETS ===

Exécute dans l'éditeur SQL :

-- Politique pour permettre la lecture publique des projets
CREATE POLICY "Public read projects" ON projects
FOR SELECT USING (true);

-- Politique pour permettre la modification par les utilisateurs authentifiés
CREATE POLICY "Authenticated update projects" ON projects
FOR UPDATE USING (auth.role() = 'authenticated');

-- Politique pour permettre la suppression par les utilisateurs authentifiés
CREATE POLICY "Authenticated delete projects" ON projects
FOR DELETE USING (auth.role() = 'authenticated');

-- Politique pour permettre l'insertion par les utilisateurs authentifiés
CREATE POLICY "Authenticated insert projects" ON projects
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

=== POLITIQUES RLS POUR LE STORAGE ===

-- Politique de lecture publique pour les images
CREATE POLICY "Public read images" ON storage.objects
FOR SELECT USING (bucket_id = 'portfolio-images');

-- Politique d'upload pour les utilisateurs authentifiés
CREATE POLICY "Authenticated upload images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'portfolio-images' AND
  auth.role() = 'authenticated'
);

-- Politique de suppression pour les utilisateurs authentifiés
CREATE POLICY "Authenticated delete images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'portfolio-images' AND
  auth.role() = 'authenticated'
);

=== VÉRIFICATION ===

-- Vérifier les politiques créées
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies 
WHERE tablename IN ('projects', 'objects');
`);

// Instructions pour l'utilisateur
console.log(`
📋 ÉTAPES À SUIVRE :

1. Configure l'authentification dans Supabase Dashboard
2. Crée un utilisateur admin avec email/mot de passe
3. Exécute les politiques RLS dans l'éditeur SQL
4. Teste la connexion avec les identifiants créés

🔒 SÉCURITÉ :

- JWT stocké automatiquement dans les cookies (httpOnly)
- Pas de données sensibles dans localStorage
- Politiques RLS pour contrôler l'accès
- Authentification côté serveur

⚠️ IMPORTANT :

- Garde tes identifiants admin en sécurité
- Change le mot de passe régulièrement
- Utilise un mot de passe fort (20+ caractères)
- Active l'authentification à deux facteurs si possible
`);
