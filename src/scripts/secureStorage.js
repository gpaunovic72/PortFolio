// Script pour sécuriser Supabase Storage
// À exécuter dans l'éditeur SQL de Supabase

console.log(`
🔒 CONFIGURATION DE SÉCURITÉ SUPABASE STORAGE

1. Va dans ton dashboard Supabase
2. Clique sur "SQL Editor"
3. Exécute ces commandes une par une :

-- 1. Supprimer les anciennes politiques
DROP POLICY IF EXISTS "Public read access" ON storage.objects;
DROP POLICY IF EXISTS "Anonymous upload" ON storage.objects;

-- 2. Politique de lecture publique (pour afficher les images)
CREATE POLICY "Public read access" ON storage.objects
FOR SELECT USING (
  bucket_id = 'portfolio-images'
);

-- 3. Politique d'upload RESTREINTE (optionnel)
-- Décommente si tu veux bloquer les uploads anonymes
/*
CREATE POLICY "Authenticated upload only" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'portfolio-images' AND
  auth.role() = 'authenticated'
);
*/

-- 4. Politique de suppression RESTREINTE
CREATE POLICY "Authenticated delete only" ON storage.objects
FOR DELETE USING (
  bucket_id = 'portfolio-images' AND
  auth.role() = 'authenticated'
);

-- 5. Politique de mise à jour RESTREINTE
CREATE POLICY "Authenticated update only" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'portfolio-images' AND
  auth.role() = 'authenticated'
);

-- 6. Vérifier les politiques
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'objects' AND schemaname = 'storage';
`);

// Instructions pour l'utilisateur
console.log(`
📋 INSTRUCTIONS :

1. Si tu veux garder l'upload anonyme (pour le dashboard) :
   - Laisse la politique "Anonymous upload" active
   - Le dashboard fonctionnera normalement

2. Si tu veux bloquer l'upload anonyme :
   - Décommente la politique "Authenticated upload only"
   - Seuls les utilisateurs connectés pourront uploader

3. Pour une sécurité maximale :
   - Utilise l'authentification Supabase
   - Crée un vrai système de login
   - Limite l'accès au dashboard

4. Pour le moment (développement) :
   - Garde l'upload anonyme
   - Le mot de passe du dashboard suffit
   - Avant production, renforce la sécurité
`);
