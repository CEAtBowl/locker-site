export async function handler(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Méthode non autorisée',
    };
  }

  const data = JSON.parse(event.body);

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbw1upUhiligwUZ36l9Nk2itJiLuSNbkFsP0-dybwhbKWMlYGd2Mr3b1iXTyTt_XMQ/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.text(); // ou .json() si ton script retourne un JSON

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Commande bien envoyée", response: result }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Erreur", error: error.message }),
    };
  }
}
