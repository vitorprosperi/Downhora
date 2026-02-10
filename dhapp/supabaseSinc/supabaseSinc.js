import { supabase } from "../supabaseserver";

export async function SupabaseSinc(db, userId) {
  if (!userId) return;

  console.log("[SYNC] Buscando exames no Supabase...");

  // Sincroniza os exames, mas antes verifica a fila_sinc para excluir exames
  const deletarDaFila = async () => {
    const filaExclusao = await db.getAllAsync("SELECT * FROM fila_sinc WHERE acao = ?", ["delete"]);

    if (filaExclusao.length > 0) {
      for (const item of filaExclusao) {
        try {
          const { id } = JSON.parse(item.payload);
          // Exclui o exame no Supabase
          const { error: deleteError } = await supabase
            .from("exames")
            .delete()
            .eq("id", id);

          if (deleteError) {
            console.error("[SYNC] Erro ao deletar exame no Supabase:", deleteError);
          } else {
            // Se a exclusão for bem-sucedida, remove da fila
            await db.runAsync("DELETE FROM fila_sinc WHERE id = ?", [item.id]);
            console.log("[SYNC] Exame excluído no Supabase:", id);
          }
        } catch (err) {
          console.error("[SYNC] Erro ao processar exclusão na fila_sinc:", err);
        }
      }
    }
  };

  // Chama a função para deletar exames da fila
  await deletarDaFila();

  // Carrega os exames do Supabase
  const { data: examesData, error: examesError } = await supabase
    .from("exames")
    .select("id,usuario_id,tipo_exame,data_exame,medico_responsavel,obs,imagem_url")
    .eq("usuario_id", userId);

  if (examesError) {
    console.error("[SYNC] Erro ao buscar exames:", examesError.message);
    return;
  }

  // Sincroniza os exames no SQLite
  await db.withTransactionAsync(async () => {
    for (const ex of examesData || []) {
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
