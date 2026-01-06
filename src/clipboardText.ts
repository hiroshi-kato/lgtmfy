/**
 * macOS用のテキストクリップボードコピー機能
 * pbcopy を使用して文字列をクリップボードに設定する
 */

/**
 * テキストをmacOSのクリップボードにコピーする
 * @param text クリップボードに入れたい文字列
 * @throws macOS以外のOSで実行した場合、またはpbcopy実行に失敗した場合
 */
export const copyTextToClipboard = async (text: string): Promise<void> => {
  // macOS以外の場合はエラー
  if (Deno.build.os !== "darwin") {
    throw new Error(
      "テキストクリップボードコピー機能はmacOSでのみ利用可能です。",
    );
  }

  const command = new Deno.Command("pbcopy", { stdin: "piped" });
  const child = command.spawn();

  const writer = child.stdin.getWriter();
  try {
    await writer.write(new TextEncoder().encode(text));
  } finally {
    await writer.close();
  }

  const status = await child.status;
  if (!status.success) {
    throw new Error("pbcopy実行に失敗しました。");
  }
};


