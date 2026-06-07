#!/bin/bash

# Script de utilidad para generar nuevos secretos seguros
# Uso: ./scripts/rotate-secrets.sh

generate_secret() {
    openssl rand -base64 32
}

echo "--- Generador de Secretos para Nexergy-AI ---"
echo "Fecha actual: $(date)"
echo ""

echo "Nuevo JWT_SECRET sugerido:"
generate_secret
echo ""

echo "Nuevo BUILT_IN_FORGE_API_KEY sugerido (si es autogenerado):"
generate_secret
echo ""

echo "Instrucciones:"
echo "1. Copia los secretos generados arriba."
echo "2. Actualiza las variables de entorno en tu plataforma de hosting (Vercel, AWS, etc.)."
echo "3. Reinicia los servicios para aplicar los cambios."
echo "4. Documenta la rotación en el log de mantenimiento."
