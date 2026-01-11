import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY!;
const ALLOWED_CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function sendTelegramMessage(chatId: number, text: string) {
  await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const message = body.message;

    if (!message) {
      return NextResponse.json({ ok: true });
    }

    const chatId = message.chat.id;

    // Vérifier que c'est bien toi qui envoie (sécurité)
    if (ALLOWED_CHAT_ID && chatId.toString() !== ALLOWED_CHAT_ID) {
      await sendTelegramMessage(chatId, "❌ Vous n'êtes pas autorisé à utiliser ce bot.");
      return NextResponse.json({ ok: true });
    }

    // Si c'est une photo
    if (message.photo && message.photo.length > 0) {
      // Prendre la photo en meilleure qualité (la dernière du tableau)
      const photo = message.photo[message.photo.length - 1];
      const fileId = photo.file_id;

      // Récupérer le chemin du fichier depuis Telegram
      const fileResponse = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getFile?file_id=${fileId}`
      );
      const fileData = await fileResponse.json();

      if (!fileData.ok) {
        await sendTelegramMessage(chatId, "❌ Erreur lors de la récupération de la photo.");
        return NextResponse.json({ ok: true });
      }

      const filePath = fileData.result.file_path;

      // Télécharger la photo depuis Telegram
      const imageResponse = await fetch(
        `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${filePath}`
      );
      const imageBuffer = await imageResponse.arrayBuffer();

      // Supprimer l'ancienne photo si elle existe
      await supabase.storage.from("menu-du-jour").remove(["menu-du-jour.jpg"]);

      // Uploader la nouvelle photo sur Supabase
      const { error } = await supabase.storage
        .from("menu-du-jour")
        .upload("menu-du-jour.jpg", imageBuffer, {
          contentType: "image/jpeg",
          upsert: true,
        });

      if (error) {
        await sendTelegramMessage(chatId, `❌ Erreur lors de l'upload: ${error.message}`);
        return NextResponse.json({ ok: true });
      }

      await sendTelegramMessage(
        chatId,
        "✅ Menu du jour mis à jour avec succès ! Il est maintenant visible sur le site."
      );

      return NextResponse.json({ ok: true });
    }

    // Si c'est un message texte (commande /start par exemple)
    if (message.text) {
      if (message.text === "/start") {
        await sendTelegramMessage(
          chatId,
          `👋 Bienvenue ! \n\nEnvoyez une photo pour mettre à jour le menu du jour sur le site.\n\nVotre Chat ID: ${chatId}`
        );
      } else {
        await sendTelegramMessage(
          chatId,
          "📸 Envoyez une photo du menu du jour pour le mettre à jour sur le site."
        );
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Telegram webhook error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Telegram vérifie parfois avec GET
export async function GET() {
  return NextResponse.json({ status: "Telegram webhook is active" });
}
