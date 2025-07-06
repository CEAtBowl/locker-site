export async function handler(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Méthode non autorisée',
    };
  }

  const data = JSON.parse(event.body);

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycby8vpuVMkrQSvuvRXcGtSs8l0e7u9qHOLoqphmvNokpW_W1XtwX-A5h12Vw73_Wzhc/exec', {
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
