// controllers/chatbot.js
// Importation du module OpenAI depuis le package 'openai'
import OpenAI from 'openai';
// Création d'une instance de la classe OpenAI avec la clé API fournie
const openai = new OpenAI({
  apiKey: '**************************'//mettez votre apiKey ici
});
// Exportation d'une fonction asynchrone nommée chatbotController
// Cette fonction agit comme un contrôleur pour traiter les requêtes HTTP
export const chatbotController = async (req, res) => {
    // Extraction du message du corps de la requête
  const { message } = req.body;
   // Création d'une complétion en utilisant le modèle GPT-3.5-turbo
    // Envoie une requête à l'API OpenAI avec les messages spécifiés
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Spécification du modèle à utiliser
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },// Message de contexte pour le modèle
        { role: 'user', content: message },// Message de l'utilisateur extrait de la requête
      ],
    });
// Extraction du contenu de la réponse de l'API OpenAI
    const response = completion.choices[0].message.content;
    res.json({ response });
  } catch (error) {
    console.error('Erreur lors de la création de la complétion:', error);
    res.status(500).json({ error: 'Erreur lors de la création de la complétion' });
  }
};
