/**
 * macOS用の画像クリップボードコピー機能
 * osascriptを使用してPNG画像をクリップボードに設定する
 */

/**
 * PNG画像データをmacOSのクリップボードにコピーする
 * @param pngData PNG画像のUint8Arrayバッファ
 * @throws macOS以外のOSで実行した場合、またはosascript実行に失敗した場合
 */
export const copyPngToClipboard = async (
  pngData: Uint8Array,
): Promise<void> => {
  // macOS以外の場合はエラー
  if (Deno.build.os !== "darwin") {
    throw new Error(
      "画像クリップボードコピー機能はmacOSでのみ利用可能です。",
    );
  }

  // 一時ファイルを作成
  const tempFile = await Deno.makeTempFile({ suffix: ".png" });

  try {
    // PNGデータを一時ファイルに書き込み
    await Deno.writeFile(tempFile, pngData);

    // osascriptでクリップボードに画像を設定
    // POSIXパスをエスケープして使用
    const escapedPath = tempFile.replace(/'/g, "'\\''");
    const script =
      `set the clipboard to (read (POSIX file "${escapedPath}") as «class PNGf»)`;

    const command = new Deno.Command("osascript", {
      args: ["-e", script],
    });

    const { success, stderr } = await command.output();

    if (!success) {
      const errorText = new TextDecoder().decode(stderr);
      throw new Error(`osascript実行に失敗しました: ${errorText}`);
    }
  } finally {
    // 一時ファイルを削除
    try {
      await Deno.remove(tempFile);
    } catch {
      // 削除に失敗してもエラーにしない（既に削除されている可能性がある）
    }
  }
};
