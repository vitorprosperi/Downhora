import { supabase } from "../supabaseserver";

export async function SupabaseSinc(db, userId) {
  if (!userId) return;

  console.log("[SYNC] Buscando exames no Supabase...");

  const { data: examesData, error } = await supabase
    .from("exames")
    .select("id,usuario_id,tipo_exame,data_exame,medico_responsavel,obs,imagem_url")
    .eq("usuario_id", userId);

  if (error) {
    console.error("[SYNC] Erro ao buscar exames:", error.message);
    return;
  }

  await db.withTransactionAsync(async () => {
    for (const ex of (examesData || [])) {
      await db.runAsync(
        `INSERT OR REPLACE INTO exames
         (id, usuario_id, tipo_exame, data_exame, medico_responsavel, obs, imagem_url)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          ex.id,
          ex.usuario_id,
          ex.tipo_exame,
          ex.data_exame,
          ex.medico_responsavel ?? null,
          ex.obs ?? null,
          ex.imagem_url ?? null,
        ]
      );
    }
  });

  console.log("[SYNC] SQLite atualizado com dados do Supabase.");
}
