function capturarLocalizacao() {
    const linkLocalizacao = document.getElementById('link-localizacao');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (posicao) => {
                const latitude = posicao.coords.latitude;
                const longitude = posicao.coords.longitude;

                // Monta o link do Google Maps
                const urlGoogleMaps = `https://www.google.com/maps?q=${latitude},${longitude}`;

                // Atualiza o link da localização
                linkLocalizacao.href = urlGoogleMaps;
                linkLocalizacao.textContent = `Abrir localização: ${latitude}, ${longitude}`;
                linkLocalizacao.style.display = 'inline'; // Exibe o link
                alert("Localização capturada com sucesso!");
            },
            (erro) => {
                alert("Erro ao capturar localização. Verifique as permissões do navegador.");
            }
        );
    } else {
        alert("Seu navegador não suporta geolocalização.");
    }
}

function enviarParaWhatsApp() {
    const protocolo = document.getElementById('protocolo').value;
    const linkLocalizacao = document.getElementById('link-localizacao').href;

    if (!protocolo) {
        alert("Por favor, preencha o número do protocolo.");
        return;
    }

    if (!linkLocalizacao || linkLocalizacao === '#') {
        alert("Por favor, capture a localização antes de enviar.");
        return;
    }

    // Monta a mensagem
    const mensagem = `Olá! Seguem os dados capturados:\n\nProtocolo: ${protocolo}\nLocalização: ${linkLocalizacao}`;
    
    // Número de WhatsApp com o código do país e DDD
    const numeroWhatsApp = "555193152514";
    
    // Link para envio da mensagem no WhatsApp
    const linkWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensagem)}`;

    // Abre o WhatsApp em uma nova aba
    window.open(linkWhatsApp, '_blank');
}
